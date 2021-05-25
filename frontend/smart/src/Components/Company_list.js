import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { get_company } from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles({
  root: {
    minWidth: 275,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});


export default function Company_list(props) {
  const classes = useStyles();

  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const token = useSelector(({authReducer}) => authReducer.token)
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

  const get_detail = (id) => {
    console.log("get_detail" + id);
     return dispatch(get_company(token, id, history));
  }

 const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.description}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
         {props.address}
        </Typography>
        <Typography variant="body2" component="p">
          {props.contact_info}
          <br />
          {props.rate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(() => {get_detail(props.id)})}>Learn More</Button>
      </CardActions>
    </Card>
  );
}