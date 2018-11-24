import React, { Component } from 'react'
import PropTypes from 'prop-types'


export default class User extends Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }

    render() {
        const { username, avatar } = this.props;
        return (
            <span> 
                <img src={avatar} alt="Smiley face" height="42" width="42" /> {username}
            </span>
        )
    }
}