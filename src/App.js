import React from 'react'
import HomePage from './components/pages/HomePage/HomePage';
import SignUp from './components/pages/SignUp/signUp';
import LoginPage from './components/pages/Login/Login';
import Users from './components/pages/Users/student/Users';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';




function App() {
  return (
      <Router>
        <Switch>
            {/*<Route exact path="/">*/}
            {/*    <Login />*/}
            {/*</Route>*/}
            <Route exact path="/" component={LoginPage} />
            <Route exact path="/Users/:id" component={Users} />
          <Route exact path="/signUp">
              <SignUp/>
          </Route>
          
        </Switch>
      </Router>
  );
}

export default App;


// {<Route exact path='/home' exact component={HomePage}/>}
// {<Route exact path="/login/:id" component={Home} />}