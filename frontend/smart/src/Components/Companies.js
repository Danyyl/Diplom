import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import Company_list from "./Company_list";


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


export default function Companies() {
  const classes = useStyles();

  const dispatch = useDispatch();
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
            />
        ));
    } catch (e){
        console.log(e);
    }

  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
        <div className={classes.container}>
           {companies_list}
          </div>
        <button onClick={() => {console.log(user)}}>Click me</button>

      </div>
    </Container>
  );
}