import React from 'react';
import { Component } from 'react';
import { Route } from 'react-router-dom';
import FavCard from './FavCard'
import { connect } from 'react-redux';
import * as actionType from '../../store/action.js'
import './favorites.css'

class Favorites extends Component {
  state = {

  }

  render() {
    const cards = (this.props.favorites === null) ? '' : this.props.favorites.map(card =>

      <FavCard
        id={card.id}
        name={card.name}
        locationKey={card.locationKey}

      />


    );
    return (
      <div className="favContainer">
        <Route path="/favorites">
          {cards}
        </Route>

      </div>
    )
  }
}

const mapstateToProps = state => {
  return {
    city: state.srch.city,
    lat: state.location.lat,
    lan: state.location.lan,
    favorites: state.srch.favorites
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCity: (city) => dispatch({ type: actionType.SET_CITY, value: city }),
    setForecast: (obj) => dispatch({ type: actionType.SET_FORECAST, value: obj }),
    setCoor: (lat, lan) => dispatch({ type: actionType.SET_COOR, lat: lat, lan: lan }),
    setCurrent: (obj) => dispatch({ type: actionType.SET_CURRENT, value: obj }),
    addTempObj: (obj) => dispatch({ type: actionType.ADD_TEMP_OBJ, value: obj })
  }
}

export default connect(mapstateToProps, mapDispatchToProps)(Favorites);