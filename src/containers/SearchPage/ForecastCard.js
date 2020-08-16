import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar'
import Card from './ForecastCard/Card'

class SearchPage extends Component {
    state = {
        APIkey: 'GU2OTPQUz1mECqPOZOVdshtwt64h4pD5'
    }
    style = {
        display: 'flex',
        flexDirection: 'row'
    }
    render() {
        return (
            <Card style={this.style}></Card>
        )
    }
}

export default SearchPage;