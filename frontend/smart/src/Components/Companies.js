import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {get_company, login, takeUser} from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Company_list from "./Company_list";
import {io} from "socket.io-client";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  container: {
    marginTop:"50px",
    marginBottom:"50px",
    display: 'grid',
    gridTemplateColumns: "40% 40%",
    columnGap: "200px",
    rowGap: "50px",
  },
  main:{
  },
  button:{
    backgroundColor: "#2C4081",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "30px",
    fontFamily: "Red Hat Text",
    marginRight: "50px",
    marginTop: "5%",
    marginLeft: "1000px",
    width: "300px"
  }
}));


export default function Companies() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const history = useHistory();
  const token = useSelector(({authReducer}) => authReducer.token)
  const user = useSelector(({authReducer}) => authReducer.user)
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

  const submitLogin = () => {
    console.log(123);
    let params = {
      email: form.email.value,
      password: form.password.value,
    };
     return dispatch(login(params));
  }

  function add_company() {
    let requestBody = {};
    requestBody.method = 'POST';
    requestBody = {
        name: "default",
        description: "default",
        contact_info: "default",
        address: "default",
    };

    const request = axios.post(`http://0.0.0.0:8080/api/company/`, requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            dispatch(get_company(token, response.data.id, history));
        })
        .catch(error => {
            console.log(error);
        });
  }

  let companies_list = "";

    try {
        companies_list = user.companies.map((company) => (
            <Company_list
                id={company.id}
                name={company.name}
                description={company.description}
                address={company.address.address_line}
                contact_info={company.contact_info}
                rate={company.rate}
                callback={() => {dispatch(takeUser(token));}}
            />
        ));
    } catch (e){
        console.log(e);
    }

  return (
    <Container className={classes.main} component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
        <div className={classes.container}>
           {companies_list}
          </div>
        <button className={classes.button} onClick={() => {add_company()}}>Add</button>

      </div>
    </Container>
  );
}