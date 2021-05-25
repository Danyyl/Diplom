import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import Service_list from "./Service_list";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    container: {
    display: 'grid',
    gridTemplateColumns: "500px 500px",
  }
}));


export default function Company() {
  const classes = useStyles();

  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const company = useSelector(({authReducer}) => authReducer.company)
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

  let services_list = "";
    console.log("Hello")
    try {
        services_list = company.services.map((service) => (
            <Service_list
                id={service.id}
                name={service.name}
                description={service.description}
                address={service.type}
                contact_info={service.status}
                rate={service.rate}
            />
        ));
    } catch (e){
        console.log(e);
    }

  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
          <div>
               <Typography variant="h1" component="h2">
            {company.name}
          </Typography>
           <Typography variant="h1" component="h2">
             {company.description}
          </Typography>
         <Typography variant="h1" component="h2">
           {company.address}
          </Typography>
          <Typography variant="h1" component="h2">
           {company.contact_info}
          </Typography>
          <Typography variant="h1" component="h2">
           {company.rate}
          </Typography>
          </div>
          <div className={classes.container}>
           {services_list}
          </div>
        <button onClick={() => {console.log(user)}}>Click me</button>

      </div>
    </Container>
  );
}