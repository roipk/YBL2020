import React, { Component } from "react";
import firebase from "../../../firebase/firebase";

class Users extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,

            }
    }

    render() {
        
        return(<div id="student_feedback" class="sec-design1">
                <form id="student_feed" class="form-design" name="student_feed">
                    <div id="topic" class="form-group">
                        <label id="insert-topic" class="title-input" for="name"> באיזה נושא המפגש עסק:</label>
                        <input type="text" class="form-control" name="subject" id="subject" placeholder="Your Answer" minlength="5" required/>
                    </div>
                    <div id ="box" class="chekbox" onSubmit="return checkRadio()">
                        <label id="checkbox" class="title-input" for="name"> באיזה מידה המפגש היום חידש לך/למדת דברים חדשים:</label>
                        <br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <input type="radio" name="Q1" value="0"/>במידה מועטה<br/>
                            <input type="radio" name="Q1" value="5"/>במידה בינונית<br/>
                            <input type="radio" name="Q1" value="10"/>במידה רבה<br/>
                        </form>
                        <label id="checkbox" class="title-input" for="name"> באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד:</label>
                        <br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <input type="radio" name="Q2" value="0"/>במידה מועטה<br/>
                            <input type="radio" name="Q2" value="5"/>במידה בינונית<br/>
                            <input type="radio" name="Q2" value="10"/>במידה רבה<br/>
                        </form>
                        <label id="checkbox" class="title-input" for="name"> באיזה מידה נושא המפגש היה רלוונטי עבורך:</label>
                        <br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <input type="radio" name="Q3" value="0"/>במידה מועטה<br/>
                            <input type="radio" name="Q3" value="5"/>במידה בינונית<br/>
                            <input type="radio" name="Q3" value="10"/>במידה רבה<br/>
                        </form>
                        <div id="name-group" class="form-group">
                            <label id="feedback" class="title-input" for="name"> מה את/ה לוקח/ת מהמפגש היום:</label>
                            <input type="text" class="form-control" name="Q4" id="Q4" placeholder="Your Answer" minlength="10" required/>
                        </div>
                    </div>
                    <button type="submit" id="confirm-form" class="btn btn-info" onClick="fBConfirmation()">דווח נוכחות ושלח משוב</button>
                    <button id="go-back" class="btn btn-info" onClick="studLoadMenu()">חזור</button>
                </form>
            </div>)
    }
}





export default Users;
