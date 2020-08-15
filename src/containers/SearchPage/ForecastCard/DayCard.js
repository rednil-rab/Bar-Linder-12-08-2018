import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import * as utils from '../../../utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import * as actionType from '../../../store/action.js'
const useStyles = makeStyles({
  root: {
    minWidth: 275,
    width: '100%',
    height: '100%',

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

  const dispatch = useDispatch()
  const classes = useStyles();
  const bull = <span className={classes.bullet}>•</span>;
  const weekDay = new Date(props.weekday).getDay();
  return (
    <Card className={classes.root} variant="outlined">

      <CardContent>
      <Typography variant="h4" component="h2">
         {utils.weekDayConvertor[weekDay]}
        </Typography>
      <Typography variant="h5" component="h2">
         {props.temp} {props.unit === 'C' ? 'C' : 'F'}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.forecast.replace('w/', 'with')}
        </Typography>
      </CardContent>
    </Card>
  );
}