import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { get_user_page } from '../redux/reducers/auth/authActions'
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const useStyles = makeStyles({
  root: {
    minWidth: 575,
    backgroundColor: "#C0CEFC",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    columnGap: "20px",
    boxShadow: "0 0 10px",
  },
  name: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "36px",
    fontFamily: "Pridi"
  },
  description: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "28px",
    fontFamily: "Red Hat Text"
  },
  type: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text"
  },
  image: {
    height: "30px",
    width: "30px",
  },
  button:{
    backgroundColor: "#2C4081",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Red Hat Text",
    marginRight: "50px",
    marginTop: "50%",
    height: "30px",
  },
  rating: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    marginTop: "50px",
  },
  rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
  },
  column: {
    display: "grid",
    gridTemplateRows: "50% 20% 20%",
    rowGap: "5px",
  },
});


export default function User_list(props) {
  const classes = useStyles();

  const history = useHistory()
  const dispatch = useDispatch();
  const token = useSelector(({authReducer}) => authReducer.token)
  const [form, setForm] = useState({
    first_name: {
      value: 'first_name',
    },
    last_name: {
      value: 'last_name',
    },
    email: {
      value: 'email',
    },
  });

  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

  const get_detail = (out_user) => {
    console.log("get_detail" + out_user.id);
     return dispatch(get_user_page(token, out_user, history));
  }

const bull = <span className={classes.bullet}>•</span>;

  return (
      <Card className={classes.root} variant="outlined">
      <div>
        <CardContent>
          <Typography className={classes.name}>
            {props.user.first_name}
          </Typography>
          <Typography className={classes.description}>
            {props.user.last_name}
          </Typography>
          <Typography className={classes.type}>
            {props.user.email}
          </Typography>
          <div className={classes.rating}>
              <img className={classes.image} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png"/>
          <Typography className={classes.rate}>
            {props.user.rate}
          </Typography>
        </div>
        </CardContent>
      </div>
      <div className={classes.column}>
        <Button className={classes.button} size="small" onClick={(() => {get_detail(props.user)})}>Learn More</Button>
      </div>
    </Card>
  );
}