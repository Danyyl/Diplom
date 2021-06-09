import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector } from 'react-redux';
import {get_company, get_service, get_user_page, login, setUser} from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import axios from 'axios';
import Service_list from "./Service_list";
import Service_list_user from "./Service_list_user";
import UserReview from "./UserReview";
import { useHistory } from 'react-router-dom';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
    content: {
        display: 'grid',
        gridTemplateColumns: "20% 50% 20%",
        columnGap: "20px",
        width: "1550px"
  },
    info: {
        height: "100%",
    },
    text: {
        color: "#2C4081",
        fontWeight: "bold",
        fontSize: "36px",
        fontFamily: "Pridi",
        marginTop: "20px"
    },
    services: {
      overflowY: "scroll",
        height: "850px",
        width: "750px",
        overflowX: "hidden",
    },
    add_service: {
        display: "grid",
        gridTemplateColumns: "60% 30%",
        columnGap: "10%"
    },
    service_block: {

    },
    comments: {
      overflowY: "scroll",
        height: "850px",
        width: "600px",
        overflowX: "hidden",
    },
    comment_block: {

    },
    add_comment: {
        display: "grid",
        gridTemplateColumns: "40% 30%",
        columnGap: "10%",
        marginTop: "20px"
    },
    image: {
    height: "30px",
    width: "30px",
  },
    rate: {
    color: "#2C4081",
    fontWeight: "bold",
    fontSize: "20px",
    fontFamily: "Red Hat Text",
  },
  rating: {
    display: "grid",
    gridTemplateColumns: "30% 70%",
    marginTop: "50px",
  },
    text_f: {
        color: "#2C4081",
        fontWeight: "bold",
        fontSize: "40px",
        fontFamily: "Red Hat Text",
        paddingTop: "20px",
        width: "200px"
    },
    text_p: {
        color: "#2C4081",
        fontWeight: "bold",
        fontSize: "25px",
        fontFamily: "Red Hat Text",
        paddingTop: "20px",
        width: "600px"
    },
    button: {
        backgroundColor: "#2C4081",
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: "20px",
        fontFamily: "Red Hat Text",
        height: "50px",
        width: "200px",
        marginTop: "20px"
    },
}));


export default function TempUser() {
    const classes = useStyles();

    const dispatch = useDispatch();
    const user = useSelector(({authReducer}) => authReducer.temp_user)
    const token = useSelector(({authReducer}) => authReducer.token)
    const history = useHistory()
    const temp_user = useSelector(({authReducer}) => authReducer.user)
    const [form, setForm] = useState({
        text: {
            value: '',
        },
        rate: {
            value: 0,
        }
    });
    const [choose_services, setChooseServices] = useState()
    if (choose_services == null) {
        const request_ = axios.get(
            "http://0.0.0.0:8080/api/service/?status=vip",
            {
                headers: {Authorization: `Bearer ${token}`}
            }
        );
        request_.then((response) => {
            setChooseServices(response.data.map(option => (
                <option key={option.name} value={option.name}>
                                  {option.name}
                              </option>
            )));
        })
            .catch(error => {
                console.log(error);
            });
    }
    const [services, setServices] = useState("")
    if (services === "") {
    const request = axios.get(
        "http://0.0.0.0:8080/api/service/?status=custom&email=" + user.email,
        {
            headers: {Authorization: `Bearer ${token}`}
        }
    );
    request.then((response) => {
        setServices(response.data.map((service_) => (
            <Service_list_user
                id={service_.id}
                name={service_.name}
                description={service_.description}
                type={service_.type}
                status={service_.status}
                tags={service_.tags}
                rate={service_.rate}
                company={service_.company}
            />
        )));
    })
        .catch(error => {
            console.log(error);
        });
}

    const [service, setService] = useState()
    const handleTypeChange = (event) => {
      setService(event.target.value)
    }
  const changFormField = (event) => {
    const {name, value} = event.target;
    setForm({
      ...form,
      [name]: { ...form[name], value }
    });
  };

    const [comments, setComments] = useState()
    if (comments==null){
        get_comments();
    }

    function get_comments() {
        setComments(user.reviews.map((review) => (
            <UserReview
                text={review.text}
                rate={review.rate}
                />
        )))
    }

    function add_service(){
        console.log(service);
        let requestBody = {};
        requestBody.method = 'POST';
        requestBody = {
        name: service,
        status: "Processed",
        user: user.id,
    };

    const request = axios.post(`http://0.0.0.0:8080/api/service/`, requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            dispatch(get_service(token, response.data.id, history, "UseB"));
        })
        .catch(error => {
            console.log(error);
        });
    }

    function add_comment(){
        let requestBody = {};
        requestBody.method = 'POST';
        requestBody = {
        text: form.text.value,
        rate: form.rate.value,
        user: user.email,
    };

    const request = axios.post(`http://0.0.0.0:8080/api/person_review/`, requestBody, {
                        headers: { Authorization: `Bearer ${token}` }
                    });

        request.then((response) => {
            user.reviews.push(response.data);
            get_comments();
            dispatch(get_user_page(token, user, history));
            setService(service);
        })
        .catch(error => {
            console.log(error);
        });
    }

  return (
    <Container component="main" maxWidth="xs">
            <Header></Header>
      <div className={classes.paper}>
          <div className={classes.content}>
              <div className={classes.info}>
                  <Typography className={classes.text}>{user.first_name}</Typography>
                  <Typography className={classes.text}>{user.last_name}</Typography>
                  <Typography className={classes.text}>{user.email}</Typography>
                  <div className={classes.rating}>
                  <img className={classes.image} src = "https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Gold_Star.svg/1200px-Gold_Star.svg.png"/>
                    <Typography className={classes.rate}>
                        {user.rate}
                    </Typography>
                    </div>
              </div>
              <div className={classes.services}>
                  <div className={classes.add_service}>
                    <TextField select  SelectProps={{native: true,}} InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" helperText="Please choose service" value={service||''} name="service" onChange={handleTypeChange}>
                          {choose_services}
                      </TextField>
                      <button className={classes.button} onClick={()=>{add_service()}}>Use Service</button>
                  </div>
                  <div className={classes.service_block}>
                      {services}
                  </div>
              </div>
              <div className={classes.comments}>
                  <div className={classes.comment_block}>
                      {comments}
                  </div>
                  <div className={classes.add_comment}>
                          <TextField type="number" InputLabelProps={{shrink: true,}} InputProps={{classes:{input: classes.text_f},}} className={classes.input} id="standard-basic" label="Rate" value={form.rate.value||''} name="rate" onChange={changFormField}/>
                        <button className={classes.button} onClick={() => {add_comment()}}>Add</button>
                  </div>
                   <TextField multiline InputProps={{classes:{input: classes.text_p},}} className={classes.input} id="standard-basic" label="Text" value={form.text.value||''} name="text" onChange={changFormField}/>
              </div>
          </div>
      </div>
    </Container>
  );
}