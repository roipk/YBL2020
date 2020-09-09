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
                <div id="instructor" class="sec-design"> 
                    <form id="instructor_menu" class="form-design" name="student_form" method="POST">
                        <button  id="feedback-button" class="btn btn-info" onClick="">אישור דו"ח נוכחות<span
                        class="fa fa-arrow-right"></span></button>
                        <button id="report-button" class="btn btn-info" onClick="">מילוי משוב<span
                        class="fa fa-arrow-right"></span></button>
                        <button id="go-back" class="btn btn-info" onClick="homepage()">התנתק</button>
                    </form>
                </div>
        )
    }
}




export default Users;
