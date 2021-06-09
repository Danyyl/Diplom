import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {get_company, login, takeUser} from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import HeaderSimple from "./HeaderSimple";
import axios from "axios";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: "40%",
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    text_f: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Red Hat Text",
    paddingBottom: "20px",
    width: "800px",
    marginBottom: "20px"
    },
    button:{
        backgroundColor: "#2C4081",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "40px",
        fontFamily: "Red Hat Text",
        marginTop: "20%",
        width: "400px"
  },
    rate_: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Red Hat Text",
  },
 info_container: {
      display: "grid",
      gridTemplateColumns: "40% 40%",
      columnGap: "20%",
      marginTop: "40px",
     width: "600px"
},
    rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Red Hat Text",
  },
    buttons: {
      display: "grid",
        gridTemplateColumns: "40% 40%",
        columnGap: "10%",
    },
    field: {
      marginTop: "20px"
    }

}));


export default function ProfileSimple() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const token = useSelector(({authReducer}) => authReducer.token)
  const user = useSelector(({authReducer}) => authReducer.user)
  const [form, setForm] = useState({
    first_name: {
      value: user.first_name,
    },
    last_name: {
      value: user.last_name,
    },
    email: {
      value: user.email,
    },
  });



  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

  const save_obj = () => {
    let requestBody = {};
    requestBody.method = 'POST';
    requestBody = {
        first_name: form.first_name.value,
        last_name: form.last_name.value,
        email: form.email.value,
    };
    console.log(requestBody)

    const request = axios.put(`http://0.0.0.0:8080/api/profile/` + user.id + "/", requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            dispatch(takeUser(token));
        })
        .catch(error => {
            console.log(error);
        });
  }

  return (
    <Container component="main" maxWidth="xs">
            <HeaderSimple></HeaderSimple>
      <div className={classes.paper}>
          <div className={classes.field}>
          <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} label="First name" value={form.first_name.value} name="first_name" onChange={changFormField}/>
           </div>
          <div className={classes.field}>
           <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} label="Last name" value={form.last_name.value} name="last_name" onChange={changFormField}/>
           </div>
          <div className={classes.field}>
         <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} label="Email" value={form.email.value} name="email" onChange={changFormField}/>
          </div>
              <div className={classes.info_container}>
                      <Typography className={classes.rate}>
                        Role
                    </Typography>
                    <Typography className={classes.rate_}>
                        {(user === null)?" ":user.role}
                    </Typography>
          </div>
          <div className={classes.info_container}>
                      <Typography className={classes.rate}>
                        Rate
                    </Typography>
                    <Typography className={classes.rate_}>
                          {(user === null)?" ":user.rate}
                    </Typography>
          </div>
        <button className={classes.button} onClick={() => {save_obj()}}>Save</button>

      </div>
    </Container>
  );
}