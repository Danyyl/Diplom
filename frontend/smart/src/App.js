import './App.css';
import { Provider } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import configureStore from './redux';
import Auth from './Components/Auth'
import Profile from './Components/Profile'
import Companies from './Components/Companies'
import Services from './Components/Services'
import Company from './Components/Company'
import Recognition from './Components/Recognition'
import { OpenCvProvider, useOpenCv } from 'opencv-react'

const store = configureStore();

function App() {
  return (
      <OpenCvProvider>
      <Provider store={store}>
          <Switch>
              <Route exact path='/' component={Profile}/>
              <Route path='/auth' component={Auth}/>
              <Route path='/companies' component={Companies}/>
              <Route path='/services' component={Services}/>
              <Route path='/company' component={Company}/>
              <Route path='/recognition' component={Recognition}/>
          </Switch>
      </Provider>
      </OpenCvProvider>
  );
}

export default App;