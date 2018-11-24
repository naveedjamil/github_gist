import React, { Component } from 'react'
import PropTypes from 'prop-types'
import User from './User'
import './ItemForks.css'

export default class ItemForks extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        fork_url: PropTypes.string.isRequired,
        users: PropTypes.array,
        expanded: PropTypes.bool.isRequired,
        loadingData: PropTypes.bool.isRequired,
        expandDiv: PropTypes.func.isRequired
    }

    onButtonClick = () => {
        this.props.expandDiv(this.props.id, this.props.fork_url);
    }

    getButton = () => { 
        return <button className="plusButton" onClick={this.onButtonClick}> {this.props.expanded ? '-' : '+' } </button>;
    }

    render() {
        const { expanded, loadingData, users } = this.props;
        if (!expanded) {
            return <div> {this.getButton()} </div>
        }
        if (loadingData) {
            return <div>{this.getButton()} loading data ... </div>
        }

        return (
            <div>{this.getButton()}
                {users.map((item, index) => {
                    return <span key={index}><User username={item.user.username}
                        avatar={item.user.avatar} userurl={item.user.userurl}/></span>
                })}
            </div>
        )
    }
}