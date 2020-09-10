import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import SignUp from './components/pages/SignUp/signUp';
import Login from './components/pages/Login/Login';

import UserPage from "./components/pages/Users/UserPage";
import Students from './components/pages/Users/Student/Students';
import Guides from "./components/pages/Users/Guide/Guide";
import Managers from './components/pages/Users/Manager/Manager';
import test_g_a_r from "./components/pages/Users/guide/test_g_a_r";
import test_g_f from "./components/pages/Users/guide/test_g_f";


import TempStudent from "./components/pages/Users/Student/TempStudent";
import TempGuide from "./components/pages/Users/Guide/TempGuide";
import TempManager from './components/pages/Users/Manager/TempManager';


import './App.css';
//
// class App extends React.Component{
//     constructor(props) {
//         super(props);
//         this.state = {
//             user : {}
//         }
//     }
//
//
//     componentDidMount()
//     {
//         this.authListener();
//     }
//
//     authListener()
//     {
//         firebase.auth().onAuthStateChanged(user=>{
//             if(user)
//             {
//                 this.setState({user})
//             }
//             else
//             {
//                 this.setState({user:null})
//             }
//         })
//     }
//
//
//
//     render()
//     {
//         return(
    //             <div className="App">
    //
    //                 {this.state.user? (<HomePage/>):(<LoginPage/>)}
    //             </div>
//         )
//     }
// }


function App() {
  return (
      <div>
          <img src={require('../src/layout/images/title.png')} />
      <Router>
        <Switch>
            {/*<Route exact path="/">*/}
            {/*    <Login />*/}
            {/*</Route>*/}
            <Route exact path="/" component={HomePage} />

            <Route exact path="/Login" component={Login} />
            <Route exact path="/SignUp" component={SignUp} />
            <Route exact path="/User" component={UserPage} />

            <Route exact path="/Student/:id" component={Students} />
            <Route exact path="/Guide/:id" component={Guides} />
            <Route exact path="/Manager/:id" component={Managers} />

            <Route exact path="/TempStudent" component={TempStudent} />
            <Route exact path="/TempGuide" component={TempGuide} />
            <Route exact path="/TempManager" component={TempManager} />
            <Route exact path="/test_g_a_r" component={test_g_a_r} />
            <Route exact path="/test_g_f" component={test_g_f} />
        </Switch>
      </Router>
      </div>
  );
}

export default App;


// {<Route exact path='/home' exact component={HomePage}/>}
// {<Route exact path="/login/:id" component={Home} />}