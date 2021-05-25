import React, {useState, useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch, useSelector } from 'react-redux';
import { get_detail_user } from '../redux/reducers/auth/authActions'
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';


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


export default function ShortProfile(props) {
  const classes = useStyles();

  const history = useHistory()
  const dispatch = useDispatch();
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
     return dispatch(get_detail_user(token, id, history));
  }

const bull = <span className={classes.bullet}>•</span>;

  return (
    <Card className={classes.root} variant="outlined">
      <CardContent>
        <Typography className={classes.title} color="textSecondary" gutterBottom>
            {props.first_name}
        </Typography>
        <Typography variant="h5" component="h2">
          {props.last_name}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          {props.email}
        </Typography>
        <Typography variant="body2" component="p">
          {props.role}
          <br />
          {props.rate}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={(() => {get_detail(props.id)})}>More</Button>
      </CardActions>
    </Card>
  );
}