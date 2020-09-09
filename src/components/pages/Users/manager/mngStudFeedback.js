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
                        <input type="date" class="form-control" name="insert-date" id="insert-date" required/> 
                        <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
                        <input type="text" class="form-control" name="instName" id="instName" placeholder="Name" minlength="2" required/>
                        <button id="viewReport" class="btn btn-info" onClick="">הצג<span
                        class="fa fa-arrow-right"></span></button>
                        </div>
                    <div id="name-group" class="form-group" dir="rtl">
                    <div  class="report" id="report">
                        <table id="feedList">
                            <tr>
                            <th>נושא המפגש</th>
                            <th>באיזה מידה המפגש היום חידש לך/למדת דברים חדשים:</th>
                            <th>באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד:</th>
                            <th>באיזה מידה נושא המפגש היה רלוונטי עבורך:</th>
                            <th>שאלות ומחשבות לשיחת הדרכה הבאה</th>
                            </tr>
            
                        </table>
                        </div>
                    </div>
                    <button id="go-back" class="btn btn-info" onClick="mngLoadMenu()">חזור</button>
                </form>
            </div>
        )
    }
}



export default Users;
