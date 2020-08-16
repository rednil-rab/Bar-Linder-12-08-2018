import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import SearchBar from './SearchBar'
import ForeCastCard from './ForecastCard';


class SearchPage extends Component {
    state = {
        APIkey: 'GU2OTPQUz1mECqPOZOVdshtwt64h4pD5'
    }
    render() {
        return (
            <div>
                <Route exec path="/new-search" >
                    <SearchBar></SearchBar>
                    <ForeCastCard></ForeCastCard>
                </Route>
            </div>
        )
    }
}

export default SearchPage;