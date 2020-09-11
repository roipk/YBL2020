import React from "react";
import firebase, {auth} from '../../../../firebase/firebase'



class Guide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            user: props.location,
            error:false,
            loading: true,
            rule:"Manager",
        };
    }


    loadPage(event){
        this.setState({loading:event})
        //    this.render()
    }

    async componentDidMount() {
        console.log("work")
        auth.onAuthStateChanged(user=>{
            if(user)
            {
                this.setState({
                    isLoad:true,
                    user:user,
                })

            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';
                return;

            }
            this.render()
        })

    }


    async  logout() {
        //מסך טעינה
        await auth.signOut();
        window.location.href = '/';
        //סיום מסך טעינה
    }

    render() {

        if(this.state.user.email)
            console.log("this is email : "+this.state.user.email)
        return (
            <div id="instructor" className="sec-design">
                <h2>Hello Guide {this.state.user.email} </h2>
                <form id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info" >אישור דו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" >מילוי משוב<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="go-back" className="btn btn-info" >התנתק</button>
                </form>
            </div>
        );
    }



    GuideAttendReport(){
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
                    <button id="go-back" class="btn btn-info" >חזור</button>
                </form>
            </div>
        )
    }


    GuideFeedback()
    {
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
                    <button type="submit" id="confirm-form" class="btn btn-info" >שלח משוב</button>
                    <button id="go-back" class="btn btn-info" >חזור לתפריט</button>
                </form>
            </div>
        )
    }

}


export  default  Guide;