import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {get_company, get_service, login, takeUser} from '../redux/reducers/auth/authActions'
import { useHistory } from 'react-router-dom';
import Typography from "@material-ui/core/Typography";
import HeaderSimple from "./HeaderSimple";
import ServiceSimpleList from "./ServiceSimpleList";
import CompanyReview from "./CompanyReview";
import axios from 'axios';


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  content: {
      display: "grid",
      gridTemplateRows: "20% 80%"
  },
  filter_block: {
      display: "grid",
      gridTemplateColumns: "15% 15% 70%"
  },
  services: {
      display: "grid",
      gridTemplateColumns: "25% 25% 25%",
      columnGap: "5%",
      rowGap: "5%",
  },
  text_f: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "40px",
    fontFamily: "Red Hat Text",
    paddingTop: "20px",
    width: "200px"
},
}));


export default function ServicesSimple() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const token = useSelector(({authReducer}) => authReducer.token)
  const companies = useSelector(({authReducer}) => authReducer.companies)
  const services = useSelector(({authReducer}) => authReducer.services)
  const history = useHistory()
  const [choose_company, setCompany] = useState("All")
  const [choose_type, setType] = useState("All")
  const [services_list, setServicesList] = useState()
  let check_type = choose_type;
  let check_company = choose_company;


  function check(service){
      if (check_type == "All" && check_company == "All"){
          return true;
      }
      if (check_type == "All"){
          return service.company == check_company
      }
      if (check_company == "All"){
          return service.type == check_type
      }
      else {
          return (service.company == check_company && service.type == check_type)
      }
  }
  const [select_companies, setSelectCompanies] = useState()
  if (select_companies == null) {
        setSelectCompanies(
            companies.map(option => (
                <option key={option.name} value={option.name}>
                                  {option.name}
                </option>
            )));
    }
  function get_services() {
      console.log(check_company, check_type)
      try {
          setServicesList(services.filter(
              (service) => {
                  return (check(service))
              }
          ).sort((a,b) => {return a.rate-b.rate}).map((service) => (
              <ServiceSimpleList
                  id={service.id}
                  name={service.name}
                  description={service.description}
                  type={service.type}
                  status = {service.status}
                  tags={service.tags}
                  rate={service.rate}
                  callback = {()=>{
                  }}
              />
          )));
      } catch (e) {
          console.log(e);
      }
  }

  if (services_list == null){
      get_services();
  }

  const handleTypeChange = (event) => {
      check_type = event.target.value
      setType(event.target.value)
      get_services();
    }

  const handleCompanyChange = (event) => {
      check_company = event.target.value;
      setCompany(event.target.value)
      get_services();
    }


  return (
    <Container component="main" maxWidth="xs">
            <HeaderSimple></HeaderSimple>
      <div className={classes.paper}>
          <div className={classes.content}>
              <div className={classes.filter_block}>
                  <div>
                      <TextField select  SelectProps={{native: true,}} InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" helperText="Please choose type" value={choose_type} name="type" onChange={handleTypeChange}>
                        <option key={"All"} value={"All"}>
                                  {"All"}
                        </option>
                        <option key={"Health"} value={"Health"}>
                                  {"Health"}
                        </option>
                        <option key={"Transport"} value={"Transport"}>
                                  {"Transport"}
                        </option>
                        <option key={"Food"} value={"Food"}>
                                  {"Food"}
                        </option>
                        <option key={"Entertainment"} value={"Entertainment"}>
                                  {"Entertainment"}
                        </option>
                        <option key={"Government"} value={"Government"}>
                                  {"Government"}
                        </option>
                      </TextField>
                  </div>
                  <div>
                      <TextField select  SelectProps={{native: true,}} InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" helperText="Please choose company" value={choose_company} name="company" onChange={handleCompanyChange}>
                          <option key={"All"} value={"All"}>
                                  {"All"}
                        </option>
                          {select_companies}
                      </TextField>
                  </div>
                  <div></div>
              </div>
              <div className={classes.services}>
                  {services_list}
              </div>
          </div>
      </div>
    </Container>
  );
}