import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import CloudIcon from '@material-ui/icons/Cloud';
import FavoriteIcon from '@material-ui/icons/Favorite';
import { connect } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux'
import Button from '@material-ui/core/Button';
import * as actionType from '../store/action.js'
import * as utils from '../utils';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

 function ButtonAppBar() {
  const classes = useStyles();
  const celsius = useSelector(state => state.srch.celsius);
  const dispatch = useDispatch()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Button onClick={() => dispatch({ type: actionType.TOGGLE_DEGREE })}>
            Toggle {(!celsius) ? 'Celsius' : 'Fahrenheit'}
          </Button>
          <Typography variant="h6" className={classes.title}>
            Assignment
          </Typography>
          <IconButton href="/new-search" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CloudIcon />
          </IconButton>
          <IconButton href="/favorites"edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <FavoriteIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}

const mapstateToProps = state => {
  return {
    celsius: state.srch.celsius,

  };
}

const mapDispatchToProps = dispatch => {
  return {


  }
}

export default connect(mapstateToProps, mapDispatchToProps)(ButtonAppBar)