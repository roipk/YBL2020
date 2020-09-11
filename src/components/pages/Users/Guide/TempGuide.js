import React from "react";
import firebase, {auth} from '../../../../firebase/firebase'



class TestGuide extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            page:'menu',
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

    chooseLayout(page)
    {
        this.setState({
            page:page,
        })
        this.render()
    }


    render() {
        if(this.state.user.email)
            console.log("this is email : "+this.state.user.email)
        if(this.state.page ==='feedback')
            return(this.GuideFeedback())
        else if(this.state.page === 'report')
            return(this.GuideAttendReport())
        else
            return(this.menu())
    }

    menu()
    {
        return (
            <div id="instructor" className="sec-design">
                <h2>Hello Guide {this.state.user.email} </h2>
                <form id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("report")}}>אישור דו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{this.chooseLayout('feedback')}} >מילוי משוב<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="logout" className="btn btn-info" >התנתק</button>
                </form>
            </div>
        )
    }


    GuideAttendReport(){
        return(
            <div id="guideAttendReport" className="sec-design">
                <form id="guideAttendReport" className="form-design" name="guideAttendReport">
                    <div id="name-group" className="form-group">
                        <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                        <input type="date" className="form-control" name="insert-date" id="insert-date" required/>
                        <button id="viewReport" className="btn btn-info" >הצג</button>
                    </div>
                    <div id="name-group" className="form-group" dir="rtl">
                        <label id="insert-message" className="title-input">אשר את נוכחות החניכים במפגש:</label><br/>
                        <div id="stList" className="checkboxes"></div>
                    </div>
                    <button type="submit" id="confirm-form" className="btn btn-info" >אשר</button>
                    <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור</button>
                </form>
            </div>
        )
    }


    GuideFeedback()
    {
        return(
            <div id="guideFeeadback" className="sec-design">
                <form id="guide_form" className="form-design" name="guide_form">
                    <div id="name-group" className="form-group">
                        <label id="insert-date" className="title-input">הכנס את התאריך בו התקיים המפגש</label>
                        <input type="date" className="form-control" name="insert-student" id="insert-student" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q1" className="title-input"> נושא המפגש</label>
                        <input type="text" className="form-control" name="Q1" id="Q1" placeholder="Your Answer" minLength="5" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q2" className="title-input"> מה היה במפגש</label>
                        <input type="text" className="form-control" name="Q2" id="Q2" placeholder="Your Answer" minLength="5" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q3" className="title-input">עם אילו הצלחות/דילמות נפגשתי בפגש</label>
                        <input type="text" className="form-control" name="Q3" id="Q3" placeholder="Your Answer" minLength="10" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q4" className="title-input" htmlFor="name"> נקודות חשובות למפגש הבא</label>
                        <input type="text" className="form-control" name="Q4" id="Q4" placeholder="Your Answer" minLength="10" required/>
                    </div>
                    <div id ="box" className="chekbox">
                        <label id="insert-name" className="title-input">באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות</label><br/>
                        <form name="form1" className="chekbox" >
                            <label>במידה מועטה<input type="radio" value="1"/></label>
                            <label>במידה בינונית<input type="radio" value="2"/></label>
                            <label>במידה רבה<input type="radio" value="3"/></label>
                        </form>
                    </div>
                    <br/>
                    <div id="name-group" className="form-group">
                        <label id="insert-name" className="title-input" htmlFor="name">שאלות ומחשבות לשיחת הדרכה הבאה</label>
                        <input type="text" className="form-control" name="firstName" id="firstName" placeholder="Your Answer" minLength="10" required/>
                    </div>
                    <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור לתפריט</button>
                    <button type="submit" id="confirm-form" className="btn btn-info" >שלח משוב</button>
                    
                </form>
            </div>
        )
    }




}


export  default  TestGuide;