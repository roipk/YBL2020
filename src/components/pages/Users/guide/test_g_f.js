import React, { Component } from "react";

class test_g_f extends Component {

    constructor() {
        super();


        this.state = {
                isLoaded:false,
            }
    }


    render() {
        return(
            <div id="guideFeeadback" class="sec-design1">
                <form id="guide_form" class="form-design" name="guide_form">
                    <div id="name-group" class="form-group">
                        <label id="insert-date" class="title-input">הכנס את התאריך בו התקיים המפגש:</label>
                        <input type="date" class="form-control" name="insert-student" id="insert-student" required/>
                    </div>
                    <div id="name-group" class="form-group">
                        <label id="Q1" class="title-input"> נושא המפגש:</label>
                        <input type="text" class="form-control" name="Q1" id="Q1" placeholder="Your Answer" minlength="5" required/>
                    </div>
                    <div id="name-group" class="form-group">
                        <label id="Q2" class="title-input"> מה היה במפגש:</label>
                        <input type="text" class="form-control" name="Q2" id="Q2" placeholder="Your Answer" minlength="5" required/>
                    </div>
                    <div id="name-group" class="form-group">
                        <label id="Q3" class="title-input">עם אילו הצלחות/דילמות נפגשתי בפגש:</label>
                        <input type="text" class="form-control" name="Q3" id="Q3" placeholder="Your Answer" minlength="10" required/>
                    </div>
                    <div id="name-group" class="form-group">
                        <label id="Q4" class="title-input" for="name"> נקודות חשובות למפגש הבא:</label>
                        <input type="text" class="form-control" name="Q4" id="Q4" placeholder="Your Answer" minlength="10" required/>
                    </div>
                    <div id ="box" class="chekbox" onSubmit="return checkRadio()">
                        <label id="insert-name" class="title-input">באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות:</label><br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <input type="radio" name="time" value="1"/>במידה מועטה<br/>
                            <input type="radio" name="time" value="2"/>במידה בינונית<br/>
                            <input type="radio" name="time" value="3"/>במידה רבה<br/>
                        </form>
                    </div>
                    <div id="name-group" class="form-group">
                        <label id="insert-name" class="title-input" for="name">שאלות ומחשבות לשיחת הדרכה הבאה:</label>
                        <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Your Answer" minlength="10" required/>
                    </div>
                    <button type="submit" id="confirm-form" class="btn btn-info" onClick="fBConfirmation()">שלח משוב</button>
                    <button id="go-back" class="btn btn-info" onClick="guideLoadMenu()">חזור לתפריט</button>
                </form>
            </div>
        )
    }
}





export default test_g_f;
