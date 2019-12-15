import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './core/containers/Navbar';
import Login from './login/containers/Login';
import SignUp from './login/containers/SignUp';
import SignUpConfirm from './login/containers/SignUpConfirm';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" children={<Navbar></Navbar>}/>
        <Route exact path="/login" children={<Login/>}/>
        <Route exact path="/signup" children={<SignUp/>}/>
        <Route exact path="/signup_confirm" children={<SignUpConfirm/>}/>
      </Switch>
    </div>
  );
}

export default App;
