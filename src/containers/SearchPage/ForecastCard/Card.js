import React, { Component } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import DayCard from './DayCard'
import Geolocation from './Geolocation/Geolocation'
import * as actionType from '../../../store/action.js'
import * as utils from '../../../utils';
import { connect } from 'react-redux';
import Current from './Current'
import './searchpage.css';

class OutlinedCard extends Component {

  render() {
    console.log(this.props.current)
    const cards = (this.props.forecastArray !== null) ? this.props.forecastArray.DailyForecasts.map(date => {
      return (
        <DayCard
          weekday={date.Date}
          forecast={date.Day.IconPhrase}
          temp={date.Temperature.Maximum.Value}
          unit={date.Temperature.Maximum.Unit} />
      )

    }) : '';

    return (
      <Card className="containerCard" variant="outlined">
        <CardActions>

        </CardActions>
        <Geolocation></Geolocation>
        <Current></Current>
        <CardContent className="cardContainer" style={{ display: 'flex', gridArea: 'c' }}>
          {cards}
        </CardContent>
        <CardActions>
        </CardActions>
      </Card>
    );
  }

}

const mapstateToProps = state => {
  return {
    city: state.srch.city,
    forecastArray: state.srch.forecastArray,
    current: state.srch.current
  };
}

const mapDispatchToProps = dispatch => {
  return {
    setCity: (city) => dispatch({ type: actionType.SET_CITY, value: city })

  }
}

export default connect(mapstateToProps, mapDispatchToProps)(OutlinedCard);