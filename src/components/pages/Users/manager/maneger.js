import React, { Component } from "react";
import firebase from "../../../../firebase/firebase";

class Users extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,

            }
    }




    render() {
        return(
            <div id="Manager" class="sec-design"> 
                <form id="Manager" class="form-design" name="student_form">
                    <button  id="report-button" class="btn btn-info" onClick="viewReport()">צפייה בדו"ח נוכחות<span
                    class="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" class="btn btn-info" onClick="viewStudentFeedback()">צפייה במשובי חניכים<span
                    class="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" class="btn btn-info" onClick="viewInstructorFeedback()">צפייה במשובי מדריכים<span
                    class="fa fa-arrow-right"></span></button>
                    <button id="go-back" class="btn btn-info" onClick="homepage()">התנתק</button>
                </form>
            </div>

        )
    }
}



export default Users;
