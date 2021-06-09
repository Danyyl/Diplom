import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {get_company, login, setToken, takeUser, takeUsers} from '../redux/reducers/auth/authActions'
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


export default function ServiceExample() {
  const classes = useStyles();
  const token = useSelector(({authReducer}) => authReducer.token)
  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const company = useSelector(({authReducer}) => authReducer.company)
  const service = useSelector(({authReducer}) => authReducer.service)
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
  const [inputs, setInputs] = useState()
    if (inputs == null){
        get_inputs();
    }
  const [outputs, setOutputs] = useState()
    if (outputs == null){
        get_outputs();
    }
  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

  let reviews_list = "";
  try {
        reviews_list = service.reviews.map((review) => (
            <ServiceReview
                text={review.text}
                rate={review.rate}
            />
        ));
    } catch (e){
        console.log(e);
    }

    function save_obj() {
      let requestBody = {};
    requestBody.method = 'POST';
    requestBody = {
        status: "Done"
    };

    const request = axios.put(`http://0.0.0.0:8080/api/service/` + service.id + "/", requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            dispatch(get_company(token, company.id, history));
        })
        .catch(error => {
            console.log(error);
        });
    }

  function get_inputs() {
      try {
            console.log(service.inputs)
          setInputs(service.inputs.map((input) => (
              <InputList
                  id = {input.id}
                  name={input.name}
                  data={input.data}
                  info={input.info}
                  status = "Processed"
                  form = {input.form}
                  callback = {() => {
                      const index = service.inputs.indexOf(input);
                      service.inputs.splice(index,1);
                      get_inputs();}}
                  callback_ = {(input_) => {
                      const index = service.inputs.indexOf(input);
                      service.inputs[index] = input_;
                      get_inputs();}}
              />
          )));
      } catch (e) {
          console.log(e);
      }
  }

  function add_output() {
      let requestBody = {};
    requestBody.method = 'POST';
    requestBody = {
        service: service.id,
        name: "default",
        data: "default",
        info: "default",
        type: "Filled"
    };

    const request = axios.post(`http://0.0.0.0:8080/api/output_data/`, requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            service.outputs.push(response.data)
            get_outputs()
        })
        .catch(error => {
            console.log(error);
        });
  }

  function get_outputs() {
      try {
            console.log(service.outputs)
          setOutputs(service.outputs.map((output) => (
              <OutputList
                  id = {output.id}
                  name={output.name}
                  data={output.data}
                  info={output.info}
                  status = "Processed"
                  service = {output.service}
                  callback = {() => {
                      const index = service.outputs.indexOf(output);
                      service.outputs.splice(index,1);
                      get_outputs();}}
                  callback_ = {(input_) => {
                      const index = service.outputs.indexOf(output);
                      service.outputs[index] = input_;
                      get_outputs();}}
              />
          )));
      } catch (e) {
          console.log(e);
      }
  }


  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
          <div className={classes.top}>
              <div className={classes.info}>
                  <TextField disabled InputProps={{classes:{input: classes.text_f},}} className={classes.input} label="Name" value={form.name.value||''} name="name" onChange={changFormField}/>
                  <br/> <br/>
                 <TextField disabled multiline InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" label="Description" value={form.description.value||''} name="description" onChange={changFormField}/>
                   <br/> <br/>
                  <TextField disabled select  SelectProps={{native: true,}} InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" helperText="Please choose type" value={type||''} name="type" onChange={handleTypeChange}>
                      {types.map((option) => (
                          <option key={option.value} value={option.value}>
                              {option.label}
                          </option>
                      ))}
                  </TextField>
                  <TextField disabled InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" label="Rate" value={(service.rate)||''}/>
                  <button className={classes.edit_button} onClick={()=>{save_obj()}}>Process</button>
              </div>
              <div className={classes.container}>
                  <Typography className={classes.description}>Inputs</Typography>
                    {inputs}
                </div>
                <div className={classes.container}>
                    <Typography className={classes.description}>Outputs</Typography>
                    {outputs}
                    <button className={classes.edit_button} onClick={() => {add_output()}}>Add</button>
                </div>
          </div>
      </div>
    </Container>
  );
}