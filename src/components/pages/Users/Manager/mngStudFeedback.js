import React, { Component } from "react";
import {BackPage} from "../UserPage";
class FeedbackStudents extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,

            }
    }




    render() {
        return(
            <div id="studentFeedback" className="sec-design">
                <div id="studentFeedback" className="form-design" name="student_form" method="POST">
                    <div id="name-group" className="form-group">
                        <label id="insert-student" className="title-input" for="name">שלום מנהל,
                        על מנת לצפות במשוב בחר תאריך:          
                        </label>
                        <input type="date" className="form-control" name="insert-date" id="insert-date" required/>
                        <label id="insert-name" className="title-input" for="name"> הזן את שם המדריך:</label>
                        <input type="text" className="form-control" name="instName" id="instName" placeholder="Name" minlength="2" required/>
                        <button id="viewReport" className="btn btn-info" onClick="">הצג<span
                            className="fa fa-arrow-right"></span></button>
                        </div>
                    <div id="name-group" className="form-group" dir="rtl">
                    <div  className="report" id="report">
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
                    <button id="go-back" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזור</button>
                </div>
            </div>
        )
    }
}



export default FeedbackStudents;
