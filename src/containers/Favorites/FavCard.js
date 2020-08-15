import React, {useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as utils from '../../utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import * as actionType from '../../store/action.js'
import './favorites.css'
import axios from 'axios';

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: 200,
    height: 'fit-content',
    marginTop: '25%'

  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function OutlinedCard(props) {
  const celsius = useSelector(state => state.srch.celsius);
  const [weatherObj, setWeatherObj] = useState(null);
  const dispatch = useDispatch()
  const classes = useStyles();
  const weekDay = new Date(props.weekday).getDay();

  const getCurrentWeather = async (props) => {
    debugger;
    const response = await axios.get(`${utils.ACCU_WEATHER_HOST}/currentconditions/v1/${props.locationKey}?apikey=${utils.API_KEY}&language=en&details=true`);
    setWeatherObj(response.data);
  }
  // getCurrentWeather(props);
  return (
    <Card id={props.id} className={classes.root} className="favCard" variant="outlined">
      <CardContent>
      <Typography variant="h4" component="h2">
        {props.name}
        </Typography>
      <Typography variant="h5" component="h2">
      {weatherObj != null ? weatherObj.WeatherText : ''}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
        
        </Typography>
      </CardContent>
    </Card>
  );
}