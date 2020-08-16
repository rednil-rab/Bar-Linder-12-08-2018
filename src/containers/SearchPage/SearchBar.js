
import React, { Component } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import { connect } from 'react-redux';
import * as actionType from '../../store/action.js'
import * as utils from '../../utils';
import axios from 'axios';
import Geocode from "react-geocode";

Geocode.setApiKey("AIzaSyDI_cZNKbdlEDqkcwzQysW24VMkcIv50NI");

class SearchBar extends Component {
  state = {
    query: '',
    countries: [],
    tempParts: {
      name: 'not found',
      key: 'not found'
    }
  }
  componentDidMount = utils.debounce(() => {
    fetch(`${utils.ACCU_WEATHER_HOST}/locations/v1/cities/autocomplete?apikey=${utils.API_KEY}&q=${this.state.query}&language=en`)
      .then(res => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ countries: data })
      })
      .catch(console.log)
  },
    500, false)

  citySelect = async (string) => {
    const result = this.state.countries.filter(country => country.LocalizedName === string);
    if (result[0] === undefined) {
      return;
    }
    const locationKey = result[0].Key;

    this.setState({
      tempParts: {
        name: result[0].LocalizedName,
        key: locationKey,
      }
    })
    this.props.setCity(result[0].LocalizedName);
    const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${result[0].Key}?apikey=${utils.API_KEY}&language=en&details=true`);
    this.props.setCurrent(response.data[0]);
    const response2 = await axios.get(`${utils.ACCU_WEATHER_HOST}/forecasts/v1/daily/5day/${result[0].Key}?apikey=${utils.API_KEY}&language=en&details=true&metric=true`);
    this.props.setForecast(response2.data);


  }
  render() {
    return (
      <Autocomplete
        onInput={(e) => {
          console.log(e.target.value);
          this.setState({ query: e.target.value });
          this.componentDidMount();

        }}
        onChange={(e) => {
          console.log(e.target.value);
          this.citySelect(e.target.innerText);
          Geocode.fromAddress(e.target.innerText).then(
            response => {
              const { lat, lng } = response.results[0].geometry.location;
              this.props.setCoor(lat, lng);
              const temp = {
                id: utils.ID(),
                name: this.state.tempParts.name,
                locationKey: this.state.tempParts.key,
                lat: this.props.lat,
                lng: this.props.lan
              }

              this.props.addTempObj(temp);
            },
            error => {
              console.error(error);
            }
          );
        }}
        id="combo-box-demo"
        options={this.state.countries}
        getOptionLabel={(option) => option.LocalizedName}
        style={{
          width: '300px',
          position: 'relative',
          right: 0,
          left: 0,
          margin: '0 auto'
        }}
        renderInput={(params) => <TextField  {...params} label="" variant="outlined" />}
      />
    );
  }

}

const mapstateToProps = state => {
  return {
    city: state.srch.city,
    lat: state.location.lat,
    lan: state.location.lan,
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

export default connect(mapstateToProps, mapDispatchToProps)(SearchBar);