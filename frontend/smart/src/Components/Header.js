import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import {Link} from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {

  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    marginLeft: 20,
  },
  login: {
    marginLeft: 1500
  },
}));

export default function Header() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar >
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Link to="/">
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
            </Link>
          <Link to="/companies">
          <Typography variant="h6" className={classes.title}>
            Companies
          </Typography>
            </Link>
          <Link to="/recognition">
          <Typography variant="h6" className={classes.title}>
            Recognition
          </Typography>
            </Link>
          <Button color="inherit" className={classes.login}>Login</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}