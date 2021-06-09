import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {get_company, get_service, login, takeUser} from '../redux/reducers/auth/authActions'
import { useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import Service_list from "./Service_list";
import CompanyReview from "./CompanyReview";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    container: {
        display: 'grid',
        gridTemplateColumns: "50% 50%",
        columnGap: "100px",
        rowGap: "50px",
        marginTop: "50px",
  },
    top: {
        display: "grid",
        gridTemplateColumns: "50% 10% 40%",
        backgroundColor: "#e2e7f7",
        width: "1940px",
        height: "350px",
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
        overflow: "scroll",
        height: "350px",
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
        height: "15%",
        width: "60%",
        marginTop: "250px"
  },
    menu:{
      display: "grid",
      gridTemplateColumns: "50% 50% 50%",
        columnGap: "20px",
    },
    text_f: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
    paddingTop: "20px",
    }
}));


export default function Company() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const token = useSelector(({authReducer}) => authReducer.token)
  const company = useSelector(({authReducer}) => authReducer.company)
  const history = useHistory()
  const [disabled_butt, setDisabled] = useState("block")
  const [form, setForm] = useState({
    name: {
      value: (company.name === "default")?" ":company.name,
    },
    description: {
      value: (company.description === "default")?" ":company.description,
    },
    contact_info: {
      value: (company.contact_info === "default")?" ":company.contact_info,
    },
    address: {
      value: (company.address.address_line === "default")?" ":company.address.address_line,
    },
  });
  const [services_list, setServicesList] = useState()

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
  let reviews_list = "";
  try {
        reviews_list = company.reviews.map((review) => (
            <CompanyReview
                text={review.text}
                rate={review.rate}
            />
        ));
    } catch (e){
        console.log(e);
    }
  function get_services(status) {
      try {

          setServicesList(company.services.filter(
              (service) => {
                  return (service.status === status)
              }
          ).map((service) => (
              <Service_list
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  type={service.type}
                  status = {service.status}
                  tags={service.tags}
                  rate={service.rate}
                  callback = {()=>{
                      const index = company.services.indexOf(service);
                      console.log(index);
                      company.services.splice(index,1);
                      get_services(status);
                  }}
              />
          )));
      } catch (e) {
          console.log(e);
      }
  }

  function add_service(){
        history.push("/add_service_b");
  }

  if (services_list == null){
      get_services("Example");
  }

  function save_obj(){
      let requestBody = {};
    requestBody.method = 'POST';
    requestBody = {
        name: form.name.value,
        description: form.description.value,
        contact_info: form.contact_info.value,
        address: form.address.value
    };

    const request = axios.put(`http://0.0.0.0:8080/api/company/` + company.id + "/", requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            dispatch(takeUser(token));
            dispatch(get_company(token, company.id, history));
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
                  <div className={classes.info_container}>
                      <Typography className={classes.name}>
                        Name
                    </Typography>
                    <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} value={form.name.value||''} name="name" onChange={changFormField}/>
                  </div>
                 <div className={classes.info_container}>
                      <Typography className={classes.description}>
                        Description
                    </Typography>
                    <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} value={form.description.value||''} name="description" onChange={changFormField}/>
                  </div>
                <div className={classes.info_container}>
                      <Typography className={classes.address}>
                        Address
                    </Typography>
                    <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} value={form.address.value||''} name="address" onChange={changFormField}/>
                  </div>
                <div className={classes.info_container}>
                      <Typography className={classes.contact}>
                        Contact Information
                    </Typography>
                   <TextField InputProps={{classes:{input: classes.text_f},}} className={classes.input} value={form.contact_info.value||''} name="contact_info" onChange={changFormField}/>
                  </div>
                <div className={classes.info_container}>
                      <Typography className={classes.rate}>
                        Rate
                    </Typography>
                    <Typography className={classes.rate_}>
                        {company.rate}
                    </Typography>
                  </div>
              </div>
              <div>
                   <button className={classes.edit_button} onClick={()=>{save_obj()}}>Save</button>
              </div>
              <div className={classes.rating}>
                  {reviews_list}
              </div>
          </div>
          <div className={classes.menu}>
            <button className={classes.button} onClick={() => {get_services("Example"); setDisabled("block")}}>Template</button>
              <button className={classes.button} onClick={() => {get_services("Processed"); setDisabled("none")}}>Request</button>
              <button className={classes.button} onClick={() => {get_services("Done"); setDisabled("none")}}>Done</button>
          </div>
          <div className={classes.container}>
           {services_list}
          </div>
        <button style={{display: disabled_butt}} className={classes.add_button} onClick={() => {add_service()}}>Add</button>
      </div>
    </Container>
  );
}