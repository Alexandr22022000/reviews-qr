import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import Navbar from './core/containers/Navbar';
import CompanyPage from './companies/containers/CompanyPage';
import Login from './login/containers/Login'; //FIXME add container
import SignUp from './login/containers/SignUp';
import SignUpConfirm from './login/containers/SignUpConfirm';
import RestorePassword from './login/containers/RestorePassword';
import RestorePasswordRequest from './login/containers/RestorePasswordRequest';
import TempCompanent from './TempCompanent';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" children={<CompanyPage/>}/>
        <Route exact path="/login" children={<Login/>}/>
        <Route exact path="/signup" children={<SignUp/>}/>
        <Route exact path="/signup_confirm" children={<SignUpConfirm/>}/>
        <Route exact path="/restore_password" children={<RestorePassword/>}/>
        <Route exact path="/restore_password_request" children={<RestorePasswordRequest/>}/>
        <Route exact path="/temp" children={<TempCompanent/>}/>
      </Switch>
    </div>
  );
}

export default App;
