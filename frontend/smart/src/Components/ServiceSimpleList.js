import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { get_service } from '../redux/reducers/auth/authActions'
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from "axios";


const useStyles = makeStyles({
  root: {
    minWidth: 575,
    backgroundColor: "#C0CEFC",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    columnGap: "20px",
    boxShadow: "0 0 10px",
  },
  title: {
    fontSize: 14,
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
  pos: {
    marginBottom: 12,
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
    marginTop: "5%",
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
  tags: {

  },
  tag: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "Red Hat Text",
    marginLeft: "50px",
  },
});


export default function ServiceSimpleList(props) {
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

  const get_detail = (id, path) => {
    console.log("get_detail" + id);
     return dispatch(get_service(token, id, history, path));
  }

  const delete_obj = (id) => {
    let requestBody = {};
    requestBody.method = 'DELETE';

    const request = axios.delete(`http://0.0.0.0:8080/api/service/`+ id+ "/", {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
          props.callback();
        })
        .catch(error => {
            console.log(error);
        });
  }
  let tags_arr = "" ;
  try {
        tags_arr = props.tags.map((tag) => (
            <Typography className={classes.tag}>{"#" + tag.name}</Typography>
        ));
    } catch (e){
        console.log(e);
    }

    let buttons = ""
    switch (props.status){
      case "Example":
        buttons = (
            <div className={classes.column}>
        <div className={classes.tags}>
          {tags_arr}
        </div>
        <Button className={classes.button} size="small" onClick={(() => {get_detail(props.id, "Simple")})}>Learn More</Button>
      </div>
        )
        break;
      case "Processed":
        buttons = (
            <div className={classes.column}>
        <div className={classes.tags}>
          {tags_arr}
        </div>
              <div></div>
        <Button className={classes.button} size="small" onClick={(() => {get_detail(props.id, "Requested")})}>Process</Button>
      </div>
        )
        break;
      case "Done":
        buttons = (
            <div className={classes.column}>
        <div className={classes.tags}>
          {tags_arr}
        </div>
              <div></div>
        <Button className={classes.button} size="small" onClick={(() => {get_detail(props.id, "Done")})}>More</Button>
      </div>
        )
        break;
    }

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
          <Typography className={classes.type}>
            {props.type}
          </Typography>
          <div className={classes.rating}>
              <img className={classes.image} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png"/>
          <Typography className={classes.rate}>
            {props.rate}
          </Typography>
        </div>
        </CardContent>
      </div>
     {buttons}
    </Card>
  );
}