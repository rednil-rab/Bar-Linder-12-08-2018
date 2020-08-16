import React, { Component } from 'react';
import { Map, GoogleApiWrapper } from 'google-maps-react';
import * as actionType from '../../../../store/action.js'
import * as utils from '../../../../utils';
import { connect } from 'react-redux';
import Geocode from "react-geocode";
import axios from 'axios';

const mapStyles = {
    width: '45vw',
    height: '50%',
    position: 'relative',
    top: 0,
    left: 0
};

export class MapContainer extends Component {
    state = {
        valve: false,

    }
    location = {
        getPosition: () => {
            if (!navigator.geolocation) {
                alert("HTML5 Geolocation is not supported in your browser.");
                return;
            }
            navigator.geolocation.getCurrentPosition(this.location.showLocation, this.location.showError);
        },
        showError: (error) => {
            switch (error.code) {
                case error.PERMISSION_DENIED:
                    return "User denied the request for Geolocation.";
                case error.POSITION_UNAVAILABLE:
                    return "Location information is unavailable.";
                case error.TIMEOUT:
                    return "The request to get user location timed out.";
                case error.UNKNOWN_ERROR:
                    return "An unknown error occurred.";
            }
        },
        showLocation: (position) => {
            console.log(position);
            if (!this.state.valve) {

                this.setState({
                    valve: true
                })
                Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                    async response => {
                        const address = response.results[0].formatted_address;
                        const result = encodeURIComponent(address.split(',')[1].trim());
                        const address2 = address.split(',')[1];
                        this.props.setCity(address2);
                        const responseCity = await axios.get(`${utils.ACCU_WEATHER_HOST}/locations/v1/cities/search?apikey=${utils.API_KEY}&q=${result}&language=en&details=true`);
                        console.log(responseCity.data[0]);
                        const locationKey = responseCity.data[0].Key
                        const responseCurrent = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${locationKey}?apikey=${utils.API_KEY}&language=en&details=true`);
                        this.props.setCurrent(responseCurrent.data[0]);
                        const responseForecast = await axios.get(`${utils.ACCU_WEATHER_HOST}/forecasts/v1/daily/5day/${locationKey}?apikey=${utils.API_KEY}&language=en&details=true&metric=true`);
                        this.props.setForecast(responseForecast.data);
                        const temp = {
                            id: utils.ID(),
                            name: address2,
                            locationKey: locationKey,
                            lat: position.coords.latitude,
                            lng: position.coords.longitude
                        }
                        this.props.addTempObj(temp);
                    },
                    error => {
                        console.error(error);
                    }
                );
                this.props.setCoor(position.coords.latitude, position.coords.longitude);

            }

        }
    }


    render() {
        this.location.getPosition()
        const map = (this.state.lat === null) ? <h1>loading</h1> : <Map
            className="srchMap"
            google={this.props.google}
            zoom={14}
            style={mapStyles}
            lat={this.props.lat}
            lng={this.props.lan}
            center={{
                lat: this.props.lat,
                lng: this.props.lan
            }}

        />
            ;
        return (
            map
        );
    }
}



const mapstateToProps = state => {
    return {
        lat: state.location.lat,
        lan: state.location.lan

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

export default connect(mapstateToProps, mapDispatchToProps)(GoogleApiWrapper({
    apiKey: 'AIzaSyDI_cZNKbdlEDqkcwzQysW24VMkcIv50NI'
})(MapContainer))