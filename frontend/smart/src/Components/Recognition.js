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
import User_list from "./User_list";

import {io} from "socket.io-client";
import Company_list from "./Company_list";

const useStyles = makeStyles({
   main: {
        display: 'grid',
        gridTemplateColumns: "50% 50%",
   },
    canvasOutput: {
       width: 400,
        height: 275,
        display: "none",
    },
    videoElement: {
       display: "none",
    },
    Button: {
        marginTop: 200
    },
    Info: {
       marginTop: 150
    },
    container: {
        marginTop: "10%",
        marginLeft: "100px",
        border: "thick double #2C4081",
        width: "700px",
    },
    users: {
       marginLeft: "20%",
        borderLeft: "thick double #2C4081",
        marginTop: "10%",
    }
});


export default function Recognition(props) {
  const cv_load = useOpenCv();
  while(!cv_load){
    console.log("Wait")
  }
  console.log(cv_load)
  const cv = window.cv
  const classes = useStyles();
  const history = useHistory()
  const dispatch = useDispatch();
  const users = useSelector(({authReducer}) => authReducer.users)
  const token = useSelector(({authReducer}) => authReducer.token)
  const [text, setText] = useState('text');
  const [users_block, setUsersBlock] = useState('')

  function set_users_block(face_id_list){
      let result = []
      for (var i = 0; i < face_id_list.length; i++){
          for (var j = 0; j < users.length; j++){
              console.log("face_id", face_id_list[i])
              console.log("user_face_id", users[j].face_id)
              if (face_id_list[i] == users[j].face_id){
                  result.push(users[j])
                  console.log("result", result)
              }
          }
      }
      setUsersBlock(result.map((component) => (
          <User_list
                user={component}
            />
      )));
  }
  useEffect(() => {
      const socket = io.connect('http://127.0.0.1:5000/');
      let stream = activate_recognition(socket);
      console.log("start")
      return function clean() {
          console.log("finish")
        deactivate_recognition(socket, stream);
      }

  })

  function deactivate_recognition(socket, stream){
      clearInterval(stream);
      socket.disconnect();
      window.LocalVideo.pause();
      window.LocalVideo.srcObjects=null;
      window.LocalStream.getTracks().forEach( (track) => {
        track.stop();
        });
  }

  function activate_recognition(socket){
            socket.on('connect', function(){
                console.log("Connected...!", socket.connected)
            });
            const video = document.getElementById("videoElement")
            video.width = 300;
            video.height = 200;
            let ret_stream = null;
            if (navigator.mediaDevices.getUserMedia) {
                navigator.mediaDevices.getUserMedia({ video: true })
                .then(function (stream) {
                    ret_stream = stream;
                    window.LocalStream = stream;
                    video.srcObject = stream;
                    video.play();
                    window.LocalVideo = video;
                })
                .catch(function (err0r) {
                    console.log(err0r)
                });}
				const FPS = 1;
				const canvas = document.getElementById("canvasOutput");
				const context = canvas.getContext("2d");
                  const interval =  setInterval(() => {
                        try{
                        let src = new cv.Mat(video.height, video.width, cv.CV_8UC4);
                        let cap = new cv.VideoCapture(video);
                        cap.read(src);
                        context.drawImage(video, 0, 0, 300, 200);
                        var type = "image/png"
                        var data = document.getElementById("canvasOutput").toDataURL(type);
                        data = data.replace('data:' + type + ';base64,', '');
                        socket.emit('image', {'image': data, 'method': '0'});
                    }
                    catch (e) {
                            console.log("Something wrong" + e)
                        }}, 10000 / FPS);
				socket.on('response_back', function(image, input_text){
					const image_id = document.getElementById('image');
					image_id.src = image;
					console.log(input_text.split(" "))
					set_users_block(input_text.split(" "))
				});
            return interval;
			function onOpenCvReady() {console.log('OpenCV.js is ready.');}
  }


  return (
      <div>
          <script async src="https://docs.opencv.org/master/opencv.js" type="text/javascript" onLoad="onOpenCvReady()"></script>
          <Header></Header>
            <div class = {classes.main}>
                <div>
                    <div id="container">
                        <canvas id = "canvasOutput" class={classes.canvasOutput}></canvas>
                        <video autoPlay="true" id = "videoElement" class={classes.videoElement} ></video>
                     </div>
                    <div className={'video ' + classes.container}>
                        <img id="image"/>
                    </div>
                    <div>

                    </div>
                </div>
                <div className={classes.users}>
                    {users_block}
                </div>
          </div>
      </div>
  );
}