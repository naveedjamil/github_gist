import React, { Component } from 'react'
import PropTypes from 'prop-types'
import User from './User'
import Chip from '@material-ui/core/Chip';
import './ListItem.css'

export default class ListItem extends Component {
    static propTypes = {
        id: PropTypes.string.isRequired,
        tags: PropTypes.array.isRequired,
        url: PropTypes.string.isRequired,
        description: PropTypes.string,
        user: PropTypes.object.isRequired
    }

    render() {
        const { id, tags, url, description, user } = this.props;
        return (
            <div>
                <User username={user.username} avatar={user.avatar} userurl={user.userurl} />
                <div className="listItem">
                    <span className="individualItem"><a href={url} rel="noopener noreferrer" target="_blank">{id}</a></span>
                    <span className="individualItem">{description}</span>
                    {tags.map((item, index) => 
                         <Chip key={index} label={item} className="chip" />
                    )}

                </div>

            </div>
        )
    }
}