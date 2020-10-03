import React, { Component } from "react";
import {BackPage} from "../UserPage";
class FeedbackGuides extends Component {

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
                <input type="date" className="form-control" name="insert-student" id="insert-student" />
                <button id="viewReport" className="btn btn-info">הצג<span
                className="fa fa-arrow-right"></span></button>
                </div>
            <div id="name-group" className="form-group" dir="rtl">
                <div  className="report">
                </div>
            </div>
            <button id="go-back" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזור</button>
            </div>
        </div>
        )
    }
}



export default FeedbackGuides;
