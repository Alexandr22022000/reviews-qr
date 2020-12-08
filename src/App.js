import React from 'react';
import {Switch, Route} from 'react-router-dom';
import './App.css';
import CompanyPage from './companies/components/CompanyPage';
import Login from './login/components/Login'; //FIXME add container
import SignUp from './login/components/SignUp';
import SignUpConfirm from './login/components/SignUpConfirm';
import RestorePassword from './login/components/RestorePassword';
import RestorePasswordRequest from './login/components/RestorePasswordRequest';
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
