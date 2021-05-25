import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";


const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));


export default function Profile() {
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

  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
          <Typography variant="h1" component="h2">
            {(user == null) ? "default":user.first_name}
          </Typography>
           <Typography variant="h1" component="h2">
             {(user == null) ? "default":user.last_name}
          </Typography>
         <Typography variant="h1" component="h2">
           {(user == null) ? "default":user.email}
          </Typography>
        <button onClick={() => {console.log(user)}}>Click me</button>

      </div>
    </Container>
  );
}