import './App.css';
import { Provider, useSelector } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import configureStore from './redux';
import Auth from './Components/Auth'
import Profile from './Components/Profile'
import Companies from './Components/Companies'
import Services from './Components/Services'
import Company from './Components/Company'
import Recognition from './Components/Recognition'
import TempUser from './Components/TempUser'
import Service from './Components/Service'
import ServiceExample from "./Components/ServiceExample";
import ServiceRequest from "./Components/ServiceRequest";
import ServiceDone from "./Components/ServiceDone";
import AddService from "./Components/AddService";
import { OpenCvProvider, useOpenCv } from 'opencv-react'
import PrivateRouter from "./Components/PrivateRouter";
import ServiceUserB from "./Components/ServiceUseB";
import ProfileSimple from "./Components/ProfileSimple";
import ServicesSimple from "./Components/ServicesSimple";
import ServiceSimple from "./Components/ServiceSimple";



function App() {
  const token = useSelector(({authReducer}) => authReducer.token);
  const isLoggedIn = (token == null)? false: true;
  return (
      <OpenCvProvider>
          <Switch>
              <PrivateRouter exact path='/' isLoggedIn={isLoggedIn} component={Profile}/>
              <Route path='/auth' component={Auth}/>
              <PrivateRouter path='/companies' isLoggedIn={isLoggedIn} component={Companies}/>
              <PrivateRouter path='/services' isLoggedIn={isLoggedIn} component={Services}/>
              <PrivateRouter path='/company' isLoggedIn={isLoggedIn} component={Company}/>
              <PrivateRouter path='/recognition' isLoggedIn={isLoggedIn} component={Recognition}/>
              <PrivateRouter path='/temp_user' isLoggedIn={isLoggedIn} component={TempUser}/>
              <PrivateRouter path='/service' isLoggedIn={isLoggedIn} component={Service}/>
              <PrivateRouter path='/service_example' isLoggedIn={isLoggedIn} component={ServiceExample}/>
              <PrivateRouter path='/service_requested' isLoggedIn={isLoggedIn} component={ServiceRequest}/>
              <PrivateRouter path='/service_done' isLoggedIn={isLoggedIn} component={ServiceDone}/>
              <PrivateRouter path='/add_service_b' isLoggedIn={isLoggedIn} component={AddService}/>
              <PrivateRouter path='/service_useb' isLoggedIn={isLoggedIn} component={ServiceUserB}/>
              <PrivateRouter path='/profile_simple' isLoggedIn={isLoggedIn} component={ProfileSimple}/>
              <PrivateRouter path='/services_simple' isLoggedIn={isLoggedIn} component={ServicesSimple}/>
              <PrivateRouter path='/service_simple' isLoggedIn={isLoggedIn} component={ServiceSimple}/>
          </Switch>
      </OpenCvProvider>
  );
}

export default App;