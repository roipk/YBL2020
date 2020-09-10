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
            <div id="instactorReport" class="sec-design">
                <form id="InstactorStudentReport" class="form-design" name="student_form" method="POST">
                    <div id="name-group" class="form-group">
                        <label id="insert-student" class="title-input" for="name">שלום מנהל,
                        על מנת לצפות בדוח נוכחות מאושר בחר תאריך:
                        </label>
                        <input type="date" class="form-control" name="insert-date" id="insert-date" value="${selectDate}"/>
                        <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
                        <input type="text" class="form-control" name="instName" id="instName" minlength="2" value="${guide}" required/>
                        <button id="viewReport" class="btn btn-info" onClick="">הצג<span
                        class="fa fa-arrow-right"></span></button>
                    </div>
                    <div id="name-group" class="form-group" dir="rtl">
                        <label id="insert-message" class="title-input">החניכים שנכחו במפגש:</label><br/>
                        <div  id="report" class="report">
                        </div>
                    </div>
                    <button id="go-back" class="btn btn-info" onClick="mngLoadMenu()">חזור</button>
                </form>
            </div>

        )
    }
}



export default Users;
