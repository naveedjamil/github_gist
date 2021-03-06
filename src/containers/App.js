import React, { Component } from 'react';
import PropTypes from 'prop-types'
import Search from '../components/Search';
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import './App.css';

class App extends Component {

  static propTypes = {
    inputValue: PropTypes.string.isRequired,
  }

  onSearchChange = (searchValue) => {
    this.props.history.push('/' + searchValue);
  }

  render() {
    const { inputValue } = this.props;
    return (
      <div className="container">
          <Search searchValue={inputValue}
            onStringChange={this.onSearchChange} />
      </div>
    );
  }
}

const mapStateToProps = (state, ownProps) => ({
  // errorMessage: state.errorMessage,
  inputValue: ownProps.location.pathname.substring(1)
})


export default withRouter(connect(mapStateToProps, {})(App))
