import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Button from '@material-ui/core/Button';


export default class Search extends Component {
    static propTypes = {
        searchValue: PropTypes.string.isRequired,
        onStringChange: PropTypes.func.isRequired
    }

    getSearchValue = () => {
        return this.input.value;
    }

    //Usually we dont do this. 
    setSearchValue = (val) => {
        this.input.value = val;
    }

    componentDidUpdate(prevProps) {
        if (prevProps.searchValue !== this.props.searchValue) {
            this.setSearchValue(this.props.searchValue)
        }
    }

    onKeyUp = (e) => {
        if (e.keyCode === 13) {
            this.onButtonClick()
        }
    }

    onButtonClick = () => {
        this.props.onStringChange(this.getSearchValue())
    }

    render() {
        return (
            <div>
                <input type="text" ref={(input) => this.input = input}
                     defaultValue={this.props.searchValue}
                    onKeyUp={this.onKeyUp} placeholder="Enter github username" >
                </input>
                <Button onClick={this.onButtonClick}>
                    Search
                </Button>
            </div>
        )
    }
}    