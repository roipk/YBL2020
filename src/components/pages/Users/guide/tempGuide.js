import React, { Component } from "react";
import firebase, {auth} from "../../../../firebase/firebase";
import {Button} from "@material-ui/core";

class TestGuide extends Component {

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
            <div id="instructor" class="sec-design">
                <form id="instructor_menu" class="form-design" name="student_form" method="POST">
                    <button  id="feedback-button" class="btn btn-info" onClick="">אישור דו"ח נוכחות<span
                        class="fa fa-arrow-right"></span></button>
                    <button id="report-button" class="btn btn-info" onClick="">מילוי משוב<span
                        class="fa fa-arrow-right"></span></button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.logout}>
                        Logout
                    </Button>
                </form>
            </div>
        )
    }
}




export default TestGuide;
