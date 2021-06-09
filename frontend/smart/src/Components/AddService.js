import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {login, setToken, takeUser, takeUsers} from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import { useHistory } from 'react-router-dom';
import Header from "./Header";
import InputList from "./InputList";
import OutputList from "./OutputList";
import ServiceReview from "./ServiceReview";
import axios from 'axios';
import { get_service } from '../redux/reducers/auth/authActions'
import {MenuItem} from "@material-ui/core";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    container: {
        marginTop: "50px",
        overflow: "scroll",
        overflowX: "hidden"
  },
    top: {
        display: "grid",
        gridTemplateColumns: "30% 32% 32%",
        columnGap: "50px",
        backgroundColor: "#e2e7f7",
        width: "1900px",
        height: "650px",
    },
    name: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "36px",
    fontFamily: "Pridi",
    marginLeft: "30px",
  },
  description: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "28px",
    fontFamily: "Red Hat Text",
    marginLeft: "30px",
  },
  address: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
    marginLeft: "30px",
  },
  contact: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Red Hat Text",
    marginLeft: "30px",
  },
  rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
    marginLeft: "30px",
  },
    name_: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "36px",
    fontFamily: "Pridi"
  },
  description_: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "28px",
    fontFamily: "Red Hat Text"
  },
  address_: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text"
  },
  contact_: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "24px",
    fontFamily: "Red Hat Text"
  },
  rate_: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
  },
  info_container: {
      display: "grid",
      gridTemplateColumns: "40% 40%",
      columnGap: "10%",
      marginTop: "20px",
},
    rating: {
      display: "grid",
        gridTemplateColumns: "25% 25% 25%",
        columnGap: "200px",
        overflowX: "hidden",
        width: "1700px",
        marginTop: "20px"
    },
    button:{
        backgroundColor: "#2C4081",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "20px",
        fontFamily: "Red Hat Text",
        marginTop: "10px"
  },
    add_button:{
    backgroundColor: "#2C4081",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Red Hat Text",
        marginTop: "40px",
        marginLeft: "300%"
  },
    edit_button:{
        backgroundColor: "#2C4081",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "40px",
        fontFamily: "Red Hat Text",
        height: "10%",
        width: "40%",
        marginTop: "50px"
  },
    menu:{
      display: "grid",
      gridTemplateColumns: "50% 50% 50%",
        columnGap: "20px",
    },
    info: {
      marginTop: "20px",
      marginLeft: "50px"
    },
    text_f: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Red Hat Text",
        paddingTop: "20px",
    }
}));


export default function AddService() {
  const classes = useStyles();
  const token = useSelector(({authReducer}) => authReducer.token)
  const history = useHistory()
  const dispatch = useDispatch();
  const company = useSelector(({authReducer}) => authReducer.company)
  const user = useSelector(({authReducer}) => authReducer.user)
  const [service, SetService] = useState({
      id: 0,
      company: company.id,
      name: "Name",
      description: "Description",
      type: "Health",
      status: "Example",
      rate: 0,
  })

  const types = [
      {
          value: "Health",
          label: "Health",
      },
      {
          value: "Transport",
          label: "Transport",
      },
      {
          value: "Food",
          label: "Food",
      },
      {
          value: "Entertainment",
          label: "Entertainment",
      },
      {
          value: "Government",
          label: "Government",
      },
  ]
  const [type, setType] = useState("Health")
  const handleTypeChange = (event) => {
      setType(event.target.value)
  }
  const [form, setForm] = useState({
    name: {
      value: service.name,
    },
    description: {
      value: service.description,
    },
    type: {
      value: service.type,
    },
  });
  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

    function save_obj() {
      let requestBody = {};
    requestBody.method = 'POST';
    requestBody = {
        name: form.name.value,
        description: form.description.value,
        type: form.type.value,
        status: "Example",
        company: service.company,
    };

    const request = axios.post(`http://0.0.0.0:8080/api/service/`, requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            dispatch(get_service(token, response.data.id, history, "Example"));
        })
        .catch(error => {
            console.log(error);
        });
    }


  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
          <div className={classes.top}>
              <div className={classes.info}>
                  <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} label="Name" value={form.name.value||''} name="name" onChange={changFormField}/>
                  <br/> <br/>
                 <TextField multiline InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" label="Description" value={form.description.value||''} name="description" onChange={changFormField}/>
                   <br/> <br/>
                  <TextField select  SelectProps={{native: true,}} InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" helperText="Please choose type" value={type||''} name="type" onChange={handleTypeChange}>
                      {types.map((option) => (
                          <option key={option.value} value={option.value}>
                              {option.label}
                          </option>
                      ))}
                  </TextField>
                  <TextField disabled InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" label="Rate" value={(service.rate)||''}/>
                  <button className={classes.edit_button} onClick={()=>{save_obj()}}>Save</button>
              </div>
              <div className={classes.container}>
                  <Typography className={classes.description}>Inputs</Typography>
                </div>
                <div className={classes.container}>
                    <Typography className={classes.description}>Outputs</Typography>
                </div>
          </div>
      </div>
    </Container>
  );
}