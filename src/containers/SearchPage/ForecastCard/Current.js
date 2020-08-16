import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import * as utils from '../../../utils';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import * as actionType from '../../../store/action.js'
import FavoriteIcon from '@material-ui/icons/Favorite';
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
    const [checked, setChecked] = useState(null);
    const favorites = useSelector(state => state.srch.favorites);
    const celsius = useSelector(state => state.srch.celsius);
    const currentTemp = useSelector(state => state.srch.current);
    const currentCity = useSelector(state => state.srch.city);
    const dispatch = useDispatch()
    const classes = useStyles();



    return (
        <Card className='currentCard' variant="outlined">
            <CardActions>
                <IconButton edge="start" className={classes.menuButton} color="red" style={{ color: 'red' }} aria-label="menu">
                    <FavoriteIcon onClick={() => dispatch({ type: actionType.UPDATE_FAVORITES })} />
                </IconButton>
            </CardActions>
            <CardContent>
                {(currentTemp === null) ? '' :
                    <div>
                        <Typography variant="h3" component="h2">
                            {currentCity} temp
                        </Typography>
                        <Typography variant="h4" component="h2">
                            {celsius ? `${currentTemp.Temperature.Metric.Value} C` : `${currentTemp.Temperature.Imperial.Value} F`}
                            temp
                        </Typography>
                        <Typography variant="h5" component="h2">
                            {currentTemp.WeatherText}
                            temp
                        </Typography>
                        <Typography className={classes.pos} color="textSecondary">

                        </Typography>
                    </div>

                }
            </CardContent>

        </Card>
    );
}