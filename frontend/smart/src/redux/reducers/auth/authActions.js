import axios from 'axios';
import {LOGIN, SET_TOKEN, SET_USER, SET_COMPANY, SET_USERS} from "./authConstants";
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
            dispatch(takeUser(response.data.token));
            dispatch(takeUsers(response.data.token))
            history.push("/")

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



export function takeUser(token){
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
        })
        .catch(error => {
            console.log(error);
        });
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


export const setCompany = (company) => (dispatch) => {
    console.log("SetCompany")
    dispatch({
        type: SET_COMPANY,
        payload: company
    })
}

export function get_detail_user(token, id, history){
    console.log("Get deatail user info = " + id)
}