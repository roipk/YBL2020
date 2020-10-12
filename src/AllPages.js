import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import HomePage from './components/pages/HomePage/HomePage';
import SignUp from './components/pages/SignUp/signUp';
import Login from './components/pages/Login/Login';

import UserPage from "./components/pages/Users/UserPage";
import Students from './components/pages/Users/Student/Students';
import Guides from "./components/pages/Users/Guide/Guide";
import Managers from './components/pages/Users/Manager/Manager';
import test_g_a_r from "./components/pages/Users/Guide/test_g_a_r";
import test_g_f from "./components/pages/Users/Guide/test_g_f";


import TempStudent from "./components/pages/Users/Student/TempStudent";
import TempGuide from "./components/pages/Users/Guide/TempGuide";
import TempManager from './components/pages/Users/Manager/TempManager';


import UserApproval from "./components/pages/Users/Manager/UserApproval";
import notFound from "./404";
import AttendReport from "./components/pages/Users/Manager/mngAttendReport";
import FeedbackStudents from "./components/pages/Users/Manager/mngStudFeedback";
import FeedbackGuides from "./components/pages/Users/Manager/mngGuideFeedback";
import UpdatesFirebase from "./components/pages/Users/Manager/UpdatesFirebase";
import StudentFeedback from "./components/pages/Users/Student/stud_feedback";
import Profile from "./components/pages/Users/profile";
import GuideReports from "./components/pages/Users/Guide/guide_attend_report";
import GuideFeedback from "./components/pages/Users/Guide/guide_feedback";

function LoadPage() {
    return (
        <div>
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

                    {/*Student pages*/}
                    <Route exact path="/TempStudent" component={TempStudent} />
                    <Route exact path="/TempStudent/Feedback" component={StudentFeedback} />
                    <Route exact path="/TempStudent/Profile" component={Profile} />


                    {/*guide pages*/}
                    <Route exact path="/TempGuide" component={TempGuide} />
                    <Route exact path="/TempGuide/Reports" component={GuideReports} />
                    <Route exact path="/TempGuide/Feedback" component={GuideFeedback} />


                    {/*managers pages*/}
                    <Route exact path="/TempManager" component={TempManager} />
                    <Route exact path="/TempManager/UserApproval" component={UserApproval} />
                    <Route exact path="/TempManager/Updates" component={UpdatesFirebase} />
                    <Route exact path="/TempManager/Reports" component={AttendReport} />
                    <Route exact path="/TempManager/Feedbacks/Guide" component={FeedbackGuides} />
                    <Route exact path="/TempManager/Feedbacks/Student" component={FeedbackStudents} />



                    <Route exact path="/test_g_a_r" component={test_g_a_r} />
                    <Route exact path="/test_g_f" component={test_g_f} />
                    <Route exact path="/:404" component={notFound} />
                </Switch>
            </Router>
        </div>
    );
}

export default LoadPage;


// {<Route exact path='/home' exact component={HomePage}/>}
// {<Route exact path="/login/:id" component={Home} />}