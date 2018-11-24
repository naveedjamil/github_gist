import React, { Component } from 'react'
import PropTypes from 'prop-types'
import User from './User'


export default class ListItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        description: PropTypes.string,
        user: PropTypes.object.isRequired
    }

    render() {
        const { id,tags, url, description , user } = this.props;
        return (
            <div>
                <User username={user.username} avatar={user.avatar}/>
                {id}
                {tags}
                {url}
                {description}
            </div>
        )
    }
}