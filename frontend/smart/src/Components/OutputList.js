import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import { get_service } from '../redux/reducers/auth/authActions'
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import axios from 'axios';


const useStyles = makeStyles({
  root: {
    minWidth: 575,
    backgroundColor: "#C0CEFC",
    display: "grid",
    gridTemplateColumns: "50% 50%",
    columnGap: "20px",
    boxShadow: "0 0 10px",
    marginTop: "20px",
  },
  title: {
    fontSize: 14,
  },
  name: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "36px",
    fontFamily: "Pridi"
  },
  description: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "28px",
    fontFamily: "Red Hat Text"
  },
  type: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text"
  },
  pos: {
    marginBottom: 12,
  },
  image: {
    height: "30px",
    width: "30px",
  },
  button:{
    backgroundColor: "#2C4081",
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "15px",
    fontFamily: "Red Hat Text",
    marginRight: "50px",
    marginTop: "10%",
    height: "100%"
  },
  rating: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    marginTop: "50px",
  },
  rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
  },
  column: {
    display: "grid",
    gridTemplateRows: "50% 50%",
    rowGap: "5px",
  },
  tags: {

  },
  tag: {
    color: "#FFFFFF",
    fontWeight: "bold",
    fontSize: "18px",
    fontFamily: "Red Hat Text",
    marginLeft: "50px",
  },
  button_block: {
    display: "grid",
    gridTemplateRows: "20% 20%",
    rowGap: "20px",
    marginBottom: "30px"
  }
});


export default function OutputList(props) {
  const classes = useStyles();

  const history = useHistory()
  const dispatch = useDispatch();
  const user = useSelector(({authReducer}) => authReducer.user)
  const token = useSelector(({authReducer}) => authReducer.token)
  const [form, setForm] = useState({
    name: {
      value: props.name,
    },
    data: {
      value: props.data,
    },
    info: {
      value: props.info,
    },
  });

  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

  const get_detail = (id, path) => {
    console.log("get_detail" + id);
     return dispatch(get_service(token, id, history, path));
  }

  const save_obj = (id) => {
    let requestBody = {};
    requestBody.method = 'POST';
    let type = props.status;
    if (type === "Processed"){
      type = "Required";
    }
    requestBody = {
        name: form.name.value,
        data: form.data.value,
        info: form.info.value,
        type: type,
        service: props.service
    };

    const request = axios.put(`http://0.0.0.0:8080/api/output_data/`+ id + "/", requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
          props.callback_(response.data)
        })
        .catch(error => {
            console.log(error);
        });
  }

  const delete_obj = (id) => {
    let requestBody = {};
    requestBody.method = 'DELETE';

    const request = axios.delete(`http://0.0.0.0:8080/api/output_data/`+ id+ "/", {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
          props.callback();
        })
        .catch(error => {
            console.log(error);
        });
  }

    let cards = ""
    let buttons = ""
    switch (props.status){
      case "Example":
        cards = (
            <CardContent>
          <TextField id="standard-basic" label="Name" value={form.name.value||''} name="name" onChange={changFormField}/>
          <TextField multiline id="standard-basic" label="Data" value={form.data.value||''} name="data" onChange={changFormField}/>
          <TextField multiline id="standard-basic" label="Info" value={form.info.value||''} name="info" onChange={changFormField}/>
        </CardContent>
        )
        buttons = (<div className={classes.button_block}>
            <Button className={classes.button} size="small" onClick={(() => {delete_obj(props.id)})}>Delete</Button>
        <Button className={classes.button} size="small" onClick={(() => {save_obj(props.id)})}>Save</Button>
          </div>
        )
        break;
      case "Processed":
        cards = (
            <CardContent>
          <TextField id="standard-basic" label="Name" value={form.name.value||''} name="name" onChange={changFormField}/>
          <TextField multiline id="standard-basic" label="Data" value={form.data.value||''} name="data" onChange={changFormField} />
          <TextField multiline id="standard-basic" label="Info" value={form.info.value||''} name="info" onChange={changFormField} />
        </CardContent>
        )
        buttons = (
            <div className={classes.button_block}>
            <Button className={classes.button} size="small" onClick={(() => {delete_obj(props.id)})}>Delete</Button>
        <Button className={classes.button} size="small" onClick={(() => {save_obj(props.id)})}>Save</Button>
          </div>
        )
        break;
      case "Done":
        cards = (
            <CardContent>
          <TextField id="standard-basic" label="Name" value={form.name.value||''} name="name" onChange={changFormField} disabled />
          <TextField multiline id="standard-basic" label="Data" value={form.data.value||''} name="data" onChange={changFormField} disabled />
          <TextField multiline id="standard-basic" label="Info" value={form.info.value||''} name="info" onChange={changFormField} disabled />
        </CardContent>
        )
        buttons = ""
        break;
    }

  return (
   <Card className={classes.root} variant="outlined">
      <div>
        {cards}
      </div>
     {buttons}
    </Card>
  );
}