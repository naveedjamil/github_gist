import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { loadData, loadForkData, toggleFork, clearSearch } from '../actions'
import ListItem from '../components/ListItem';
import ItemForks from '../components/ItemForks';

class GistPage extends Component {

    static propTypes = {
        load: PropTypes.func.isRequired,
        username: PropTypes.string.isRequired,
        isDataLoading: PropTypes.bool,
        gistData: PropTypes.array
    }

    componentDidMount() {
        this.props.clearSearch();
        this.props.load(this.props.username);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.username !== this.props.username) {
            this.props.clearSearch();
            this.props.load(this.props.username);
        }
    }

    forkExpand = (id, fork_url) => {
        this.props.toggleFork(id);
        this.props.loadFork(id, fork_url);
    }

    loadMore = () => {
        this.props.load(this.props.username, this.props.moreRecordsUrl);
    }

    renderLoadMoreButton = () => {
        if (this.props.moreRecordsUrl) {
            return (
                <button onClick={this.loadMore} >Load More</button>
            )
        }
        return (
            <span></span>
        )

    }

    render() {
        const { isDataLoading, gistData } = this.props;
        if (isDataLoading && gistData.length === 0) {
            return <p>loading data ...</p>
        }
        else {
            return (
                <div>
                    {gistData.map((item, index) => {
                        return (
                            <div key={item.id}>
                                <ListItem id={item.id} tags={item.tags} url={item.url}
                                    description={item.description} user={item.user} />
                                <ItemForks id={item.id} fork_url={item.fork_url}
                                    expanded={item.expanded} users={item.forks}
                                    loadingData={item.loadingForkData} expandDiv={this.forkExpand} />
                            </div>);
                    })}
                    {this.renderLoadMoreButton()}
                </div>
            )
        }

    }


}

const mapStateToProps = (state, ownProps) => {
    const username = ownProps.match.params.username
    const isDataLoading = state.loading;
    const gistData = state.data;
    const change = state.change;
    const moreRecordsUrl = state.moreRecordsUrl;
    return { username, isDataLoading, gistData, change, moreRecordsUrl};
}

const mapDispatchToProps = dispatch => bindActionCreators({
    load: (username, moreRecordsUrl) => loadData(username, moreRecordsUrl),
    loadFork: (id, fork_url) => loadForkData(id, fork_url),
    toggleFork: (id) => toggleFork(id),
    clearSearch: () => clearSearch()
}, dispatch);


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(GistPage))
