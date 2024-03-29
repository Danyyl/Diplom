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
import axios from "axios";


const useStyles = makeStyles({
  root: {
    minWidth: 575,
    backgroundColor: "#C0CEFC",
    display: "grid",
    gridTemplateColumns: "65% 35%",
    columnGap: "20px",
    boxShadow: "0 0 10px",
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
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
  address: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text"
  },
  contact: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Red Hat Text"
  },
  rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
  },
  pos: {
    marginBottom: 12,
  },
  rating: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    marginTop: "50px",
  },
  button:{
    backgroundColor: "#2C4081",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Red Hat Text",
    marginRight: "50px",
    marginTop: "5%",
  },
  image: {
    height: "30px",
    width: "30px",
  }
});


export default function Company_list(props) {
  const classes = useStyles();

  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
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

  const get_detail = (id) => {
    console.log("get_detail" + id);
     return dispatch(get_company(token, id, history));
  }

  const delete_obj = (id) => {
    let requestBody = {};
    requestBody.method = 'DELETE';
    requestBody = {
    };

    const request = axios.delete(`http://0.0.0.0:8080/api/company/` + id + "/", requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            props.callback();
        })
        .catch(error => {
            console.log(error);
        });
  }

 const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <div>
        <CardContent>
          <Typography className={classes.name}>
            {props.name}
          </Typography>
          <Typography className={classes.description}>
            {props.description}
          </Typography>
          <Typography className={classes.address}>
            {props.address}
          </Typography>
          <Typography className={classes.contact}>
            {props.contact_info}
          </Typography>
        </CardContent>
      </div>
      <div>
        <div className={classes.rating}>
              <img className={classes.image} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png"/>
          <Typography className={classes.rate}>
            {props.rate}
          </Typography>
        </div>
        <br/>
        <Button className={classes.button} size="small" onClick={(() => {delete_obj(props.id)})}>Delete</Button>
        <Button className={classes.button} size="small" onClick={(() => {get_detail(props.id)})}>Learn More</Button>
      </div>
    </Card>
  );
}