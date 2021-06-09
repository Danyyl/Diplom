import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { get_company } from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    minWidth: 575,
    backgroundColor: "#C0CEFC",
    display: "grid",
    gridTemplateColumns: "65% 35%",
    columnGap: "20px",
    boxShadow: "0 0 10px",
    height: "100px",
    marginTop: "20px"
  },
  text: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Pridi",
  },
  rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Red Hat Text",
  },
  rating: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    marginTop: "10px",
    alignItems: "start",
  },
  image: {
    height: "20px",
    width: "20px",
  }
});


export default function UserReview(props) {
  const classes = useStyles();


  return (
    <Card className={classes.root} variant="outlined">
        <CardContent>
            <div className={classes.rating}>
              <img className={classes.image} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png"/>
          <Typography className={classes.rate}>
            {props.rate}
          </Typography>
        </div>
          <Typography className={classes.text}>
            {props.text}
          </Typography>
        </CardContent>
    </Card>
  );
}