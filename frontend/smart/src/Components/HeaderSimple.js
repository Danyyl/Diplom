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
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "25px",
    fontWeight: "bold",
  },
  login: {
    marginLeft: 1300,
    color: "#FFFFFF",
    textDecoration: "none",
    fontSize: "20px",
    fontWeight: "bold",
  },
  link: {
    textDecoration: "none",
  }
}));

export default function HeaderSimple() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <AppBar >
        <Toolbar>
          <Link className={classes.link} to="/profile_simple">
          <Typography variant="h6" className={classes.title}>
            Profile
          </Typography>
            </Link>
          <Link className={classes.link} to="/services_simple">
          <Typography variant="h6" className={classes.title}>
            Services
          </Typography>
            </Link>
          <Link className={classes.link} to="/activity">
          <Typography variant="h6" className={classes.title}>
            Activity
          </Typography>
            </Link>
          <Button color="inherit" className={classes.login} onClick={()=>{window.location.reload()}}>Log Out</Button>
        </Toolbar>
      </AppBar>
    </div>
  );
}