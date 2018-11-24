import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './User.css'

export default class User extends Component {
    static propTypes = {
        username: PropTypes.string.isRequired,
        userurl: PropTypes.string.isRequired,
        avatar: PropTypes.string,
    }

    render() {
        const { username, avatar, userurl } = this.props;
        console.log(avatar);
        return (
            <span className="user"> 
                <img src={avatar} alt="loading" /> 
                <a href={userurl} className="username">{username}</a>
            </span>
        )
    }
}