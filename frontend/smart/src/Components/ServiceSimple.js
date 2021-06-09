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
import CompanyReview from "./CompanyReview";
import {io} from "socket.io-client";


const useStyles = makeStyles((theme) => ({

    content: {
        display: "grid",
        gridTemplateColumns: "30% 30% 30%",
        marginTop: "200px"
    },
    info_block: {
        display: "grid",
        gridTemplateColumns: "20% 75%",
        columnGap: "10%"
    },
    form: {

    },
    last_block: {
        display: "grid",
        gridTemplateRows: "45% 45%",
    },
    outputs: {

    },
    review_block: {

    },
    title: {
      color: "#2C4081",
    fontSize: "20px",
    fontFamily: "Pridi"
    },
    text: {
      color: "#2C4081",
    fontWeight: "bold",
    fontSize: "25px",
    fontFamily: "Pridi"
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
    text_f: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
    paddingTop: "20px",
    },
}));


export default function ServiceSimple() {
  const classes = useStyles();
  const token = useSelector(({authReducer}) => authReducer.token)
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const service = useSelector(({authReducer}) => authReducer.service)
  const company = useSelector(({authReducer}) => authReducer.company)
  const [form, setForm] = useState(null);
    useEffect(() => {
    let result = {}
      for (let i = 0; i< service.inputs.length; i++){
          result[service.inputs[i].id] = {name: service.inputs[i].name, value: service.inputs[i].data, info: service.inputs[i].info}
      }
      setForm(result);
  }, [])
  // if (form == null){
  //     let result = {}
  //     for (let i = 0; i< service.inputs.length; i++){
  //         result[service.inputs[i].id] = {name: service.inputs[i].name, value: service.inputs[i].data, info: service.inputs[i].info}
  //     }
  //     console.log(result)
  //     setForm(result)
  //     console.log(form);
  // }
  const changFormField = (event) => {
    const {name, value} = event.target;
    console.log(name);
      setForm({...form, [name]: {...form[name], value}});
  };
  const [form_block, setFormBlock] = useState()
  function get_inputs() {
      setFormBlock(service.inputs.map((input) => (
         <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} value={form[input.id].value} label={input.name} helperText={input.info} name={input.id} onChange={changFormField}/>
      )))
  }

  if (form_block == null && form != null){
      get_inputs();
  }
  const [outputs, setOutputs] = useState();
  function get_outputs() {
      try {
          setOutputs(service.outputs.map((output) => (
              <OutputList
                  id = {output.id}
                  name={output.name}
                  data={output.data}
                  info={output.info}
                  status = "Done"
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

  let reviews_list = service.reviews.map((review) => (
            <CompanyReview
                text={review.text}
                rate={review.rate}
            />
        ));

  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
          <div className={classes.content}>
              <div className={classes.info_block}>
                  <div>
                        <Typography className={classes.title}>
                            Company
                        </Typography>
                      <Typography className={classes.title}>
                            Name
                        </Typography>
                      <Typography className={classes.title}>
                            Description
                        </Typography>
                      <Typography className={classes.title}>
                            Type
                        </Typography>
                      <Typography className={classes.title}>
                            Rate
                        </Typography>
                  </div>
                  <div>
                      <Typography className={classes.text}>
                          {service.company}
                        </Typography>
                      <Typography className={classes.text}>
                          {service.name}
                        </Typography>
                      <Typography className={classes.text}>
                            {service.description}
                        </Typography>
                      <Typography className={classes.text}>
                            {service.type}
                        </Typography>
                      <Typography className={classes.text}>
                            {service.rate}
                        </Typography>
                  </div>
              </div>
              <div className={classes.form}>
                  {form_block}
                  <button className={classes.button} onClick={()=>{console.log(form)}}> Send </button>
              </div>
              <div className={classes.last_block}>
                  <div className={classes.outputs}>
                      {outputs}
                  </div>
                  <div className={classes.review_block}>

                  </div>
              </div>
          </div>
      </div>
    </Container>
  );
}