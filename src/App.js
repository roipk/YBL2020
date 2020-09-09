import React from 'react'
import HomePage from './components/pages/HomePage/HomePage';
import SignUp from './components/pages/SignUp/signUp';
import Login from './components/pages/Login/Login';
import Users from './components/pages/Users/Users';
import TempPage from "./components/pages/temp";
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';


import firebase  from "./firebase/firebase";
import './App.css';
import test from "./components/pages/Users/test";
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
            <Route exact path="/User" component={test} />
            {/*<Route exact path="/Users/:id" component={Users} />*/}
          <Route exact path="/SignUp" component={SignUp} />
        </Switch>
      </Router>
      </div>
  );
}

export default App;


// {<Route exact path='/home' exact component={HomePage}/>}
// {<Route exact path="/login/:id" component={Home} />}