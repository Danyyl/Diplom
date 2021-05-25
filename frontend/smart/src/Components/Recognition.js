import React, {useState, useEffect} from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useDispatch, useSelector} from 'react-redux';
import { get_company } from '../redux/reducers/auth/authActions'
import Typography from "@material-ui/core/Typography";
import Header from "./Header";
import { useHistory } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import { OpenCvProvider, useOpenCv,} from 'opencv-react'

import {io} from "socket.io-client";

const useStyles = makeStyles({
   main: {
   display: 'grid',
   gridTemplateColumns: "500px 500px",
   },
    canvasOutput: {
       width: 400,
        height: 275,
        display: "none"
    },
    videoElement: {
       display: "none"
    },
    Button: {
        marginTop: 200
    },
    Info: {
       marginTop: 150
    }
});


export default function Recognition(props) {
  const cv_load = useOpenCv();
  while(!cv_load){
    console.log("Wait")
  }
  console.log(cv_load)
    const cv = window.cv
    const text_value = "text"
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch();
  const users = useSelector(({authReducer}) => authReducer.users)
  const token = useSelector(({authReducer}) => authReducer.token)
  const [text, setText] = useState('text');

  function activate_recognition(){
      const socket = io.connect('http://127.0.0.1:5000/');

            socket.on('connect', function(){
                console.log("Connected...!", socket.connected)
            });
			//const text = document.getElementById("text")
            const video = document.getElementById("videoElement")
            video.width = 400;
            video.height = 275;

            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    video.srcObject = stream;
                    video.play();
                })
                .catch(function (err0r) {
                    console.log(err0r)
                    console.log("Something went wrong!");
                });}

				const FPS = 1;
				const canvas = document.getElementById("canvasOutput");
				const context = canvas.getContext("2d");


                    setInterval(() => {
                        try{
                        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                        let cap = new cv.VideoCapture(video);
                        cap.read(src);
                        context.drawImage(video, 0, 0, 400, 275);
                        var type = "image/png"
                        var data = document.getElementById("canvasOutput").toDataURL(type);
                        data = data.replace('data:' + type + ';base64,', ''); //split off junkat the beginning
                        socket.emit('image', {'image': data, 'method': '0'});
                    }
                    catch (e) {
                            console.log("Something wrong" + e)
                        }}, 10000 / FPS);

				socket.on('response_back', function(image, input_text){
				    console.log(input_text)
					const image_id = document.getElementById('image');
					image_id.src = image;
					setText(input_text)
				});

			function onOpenCvReady() {console.log('OpenCV.js is ready.');}
  }

  const get_detail = (id) => {
    console.log("get_detail" + id);
     return dispatch(get_company(token, id, history));
  }


  return (
      <div>
          <script async src="https://docs.opencv.org/master/opencv.js" type="text/javascript" onLoad="onOpenCvReady()"></script>
          <Header></Header>
          <div id = "main">
            <div>
              <div id="container">
                <canvas id = "canvasOutput" class={classes.canvasOutput}></canvas>
                <video autoPlay="true" id = "videoElement" class={classes.videoElement} ></video>
              </div>
              <h3 className={classes.Info} id="text">{text}</h3>
              <div className='video'>
                <img id="image"/>
              </div>
            </div>
            <div>
                <button class = {classes.Button} onClick={() => {activate_recognition()}}>Click to start</button>
            </div>
          </div>
      </div>
  );
}