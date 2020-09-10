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
        <div id="studentFeedback" class="sec-design">
            <form id="studentFeedback" class="form-design" name="student_form" method="POST">
            <div id="name-group" class="form-group">
                <label id="insert-student" class="title-input" for="name">שלום מנהל,
                על מנת לצפות במשוב בחר תאריך:          
                </label>
                <input type="date" class="form-control" name="insert-student" id="insert-student" />
                <button id="viewReport" class="btn btn-info">הצג<span
                class="fa fa-arrow-right"></span></button>
                </div>
            <div id="name-group" class="form-group" dir="rtl">
                <div  class="report">
                </div>
            </div>
            <button id="go-back" class="btn btn-info" onClick="loadMenu()">חזור</button>
            </form>
        </div>
        )
    }
}



export default Users;
