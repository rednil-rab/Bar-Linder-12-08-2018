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
import * as actionType from '../store/action.js'
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';

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
  const [state, setState] = React.useState({
    checkedA: true,
    checkedB: true,
  });
  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.checked });
    dispatch({ type: actionType.TOGGLE_DEGREE })
  };
  const dispatch = useDispatch()
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <FormControlLabel
            control={<Switch checked={state.checkedA} onChange={handleChange} name="checkedA" />}
            label="Toggle Unit"
          />
          <Typography variant="h6" className={classes.title}>
            Assignment
          </Typography>
          <IconButton href="/new-search" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <CloudIcon />
          </IconButton>
          <IconButton href="/favorites" edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
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