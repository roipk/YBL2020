import React, { Component } from "react";
import firebase, {auth} from "../../../../firebase/firebase";

class test_g_a_r extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,

            }
    }


    async  logout() {
        auth.signOut();
        window.location.href = '/';
    }

    render() {

        return(
            <div id="guideAttendReport" class="sec-design">
                <form id="guideAttendReport" class="form-design" name="guideAttendReport">
                    <div id="name-group" class="form-group">
                        <label id="date" class="title-input">הכנס את תאריך המפגש:</label>
                        <input type="date" class="form-control" name="insert-date" id="insert-date"/>
                        <button id="viewReport" class="btn btn-info" onClick="">הצג</button>
                    </div>
                    <div id="name-group" class="form-group" dir="rtl">
                        <label id="insert-message" class="title-input">אשר את נוכחות החניכים במפגש:</label><br/>
                        <div id="stList" class="checkboxes"></div>
                    </div>
                    <button type="submit" id="confirm-form" class="btn btn-info" onClick="repConfirmation()">אשר</button>
                    <button id="go-back" class="btn btn-info" onClick="loadMenu()">חזור</button>
                </form>
            </div>
        )
    }
}





export default test_g_a_r;
