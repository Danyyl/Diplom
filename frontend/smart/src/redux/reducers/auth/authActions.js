import axios from 'axios';
import {LOGIN, SET_TOKEN, SET_USER, SET_COMPANY, SET_USERS, SET_TEMP_USER, SET_SERVICE, SET_ALL_COMPANIES, SET_ALL_SERVICES} from "./authConstants";
import store from "../index.js"



const URL_PATH = "http://0.0.0.0:8080/api";

export function login(params, history){
    let requestBody = {};
    requestBody.method = 'POST';
    requestBody = params;

    const request = axios.post(`http://0.0.0.0:8080/api-token-auth/`, requestBody);
    return (dispatch) =>
        request.then((response) => {
            console.log("Login");
            localStorage.token = response.data.token;
            dispatch(setToken(response.data.token));
            dispatch(takeUser(response.data.token, history));
            dispatch(takeUsers(response.data.token))

        })
        .catch(error => {
            console.log(error);
        });
}


export const setToken = (token) => (dispatch) => {
    console.log("Set Token");
    dispatch({
        type: SET_TOKEN,
        payload: token
    })
}



export function takeUser(token, history=" "){
    const request = axios.get(
                    URL_PATH + '/profile/',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) =>
        request.then((response) => {
            console.log("TakeUser");
            dispatch(setUser(response.data))
            console.log(response.data)
            if (history != " " && response.data[0].role == "Business") {
                history.push("/")
            }
            else if(history != " " && response.data[0].role == "Simple") {
                dispatch(get_all_services(token))
                dispatch(get_all_companies(token))
                history.push("/profile_simple")
            }
        })
        .catch(error => {
            console.log(error);
        });
}

export function get_all_services(token){
    const request = axios.get(
                    URL_PATH + '/service/?all=true',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) =>
        request.then((response) => {
            dispatch(setAllServices(response.data))
        })
        .catch(error => {
            console.log(error);
        });
}

export const setAllServices = (data) => (dispatch) => {
    console.log("Set All Services");
    dispatch({
        type: SET_ALL_SERVICES,
        payload: data
    })
}

export function get_all_companies(token){
    const request = axios.get(
                    URL_PATH + '/company/',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) =>
        request.then((response) => {
            dispatch(setAllCompanies(response.data))
        })
        .catch(error => {
            console.log(error);
        });
}

export const setAllCompanies = (data) => (dispatch) => {
    console.log("Set All Companies");
    dispatch({
        type: SET_ALL_COMPANIES,
        payload: data
    })
}


export const setUser = (user) => (dispatch) => {
    console.log("SetUser")
    dispatch({
        type: SET_USER,
        payload: user[0]
    })
}


export function takeUsers(token){
    const request = axios.get(
                    URL_PATH + '/users/',
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) =>
        request.then((response) => {
            console.log("TakeUser");
            dispatch(setUsers(response.data))
        })
        .catch(error => {
            console.log(error);
        });
}


export const setUsers = (users) => (dispatch) => {
    console.log("SetUser")
    dispatch({
        type: SET_USERS,
        payload: users
    })
}


export function get_company(token, id, history){
    const request = axios.get(
                    URL_PATH + '/company/' + id + "/",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) =>
        request.then((response) => {
            console.log("Get Company");
            dispatch(setCompany(response.data))
            history.push("/company")
        })
        .catch(error => {
            console.log(error);
        });
}

export function get_service(token, id, history, path){
    const request = axios.get(
                    URL_PATH + '/service/' + id + "/",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) =>
        request.then((response) => {
            dispatch(setService(response.data))
            switch (path){
                case "Example":
                    history.push("/service_example");
                    break;
                case "Requested":
                    history.push("/service_requested");
                    break;
                case "Processed":
                    history.push("/service_requested");
                    break;
                case "Done":
                    history.push("/service_done");
                    break;
                case "UseB":
                    history.push("/service_useb");
                    break;
                case "Simple":
                    history.push("/service_simple");
                    break;
            }
        })
        .catch(error => {
            console.log(error);
        });
}


export const setCompany = (company) => (dispatch) => {
    console.log("SetCompany")
    dispatch({
        type: SET_COMPANY,
        payload: company
    })
}

export const setService = (service) => (dispatch) => {
    console.log("SetService")
    dispatch({
        type: SET_SERVICE,
        payload: service
    })
}

export function get_detail_user(token, id, history){
    console.log("Get deatail user info = " + id)
}

export const set_user_page = (user) => (dispatch) => {
    console.log("SetTempUser")
    dispatch({
        type: SET_TEMP_USER,
        payload: user
    })
}

export function get_user_page(token, user, history){
    let res_user = null;
     const request = axios.get(
                    "http://0.0.0.0:8080/api/users/" + user.id + "/",
                    {
                        headers: { Authorization: `Bearer ${token}` }
                    }
                );
    return (dispatch) => {
        request.then((response) => {
            user = response.data
            console.log(res_user)
            dispatch(set_user_page(user))
            history.push("/temp_user")
        })
        .catch(error => {
            console.log(error);
        });

    }
}

