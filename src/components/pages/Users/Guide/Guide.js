import React from "react";
import firebase, {auth,db} from '../../../../firebase/firebase';
import SelectInput from "@material-ui/core/Select/SelectInput";
import $ from 'jquery';


class Guide extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page:'menu',
            user: props.location,
            error:false,
            loading: true,
            rule:"Manager",
            reportDate:""
        };


        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleSubmit2 = this.handleSubmit2.bind(this)
        this.handleChange = this.handleChange.bind(this)

    }




    async getDataFromFirebase(event)
    {
        var guidePath = "awwLpQL9A1WKW9KX60Lz"
        try{

            // var guideUid = 'awwLpQL9A1WKW9KX60Lz'
            // const guide = await firebase.firestore()
            //     .collection('guides')
            //     .doc(guideUid);

            var collection = await db.collection("students").where("guide","==","awwLpQL9A1WKW9KX60Lz").get()
            // var collection = await db.collection("students").where("guide2","==",guide).get()//reference
            // var collection = await db.collection("students").where("coms"," array-contains",{approved:false}).get()
            var students = []
            collection.forEach(doc => {
                const data = doc.get("coms");
                if (data)
                    data.forEach(doc1 =>{
                        if(doc1["date"] == this.state.reportDate && doc1["approved"]==false){

                            students.push(doc);
                            return false;
                        }
                    });
            });
            this.createCheckList(students);
        }catch(error) {
            alert(error.message)
        }
    }

    handleChange(event)
    {
        this.state.reportDate = event.target.value;
    }

    handleSubmit(event)
    {
        this.getDataFromFirebase(event)
    }
    loadPage(event){
        this.setState({loading:event})
    }
    handleSubmit2(event)
    {
        this.checkstudents(event)
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

    async checkstudents(event){
        var date = this.state.reportDate
        $('#stList input:checkbox').each(async function () {
            var path = (this.checked ? $(this).val() : "");
            try{
                var stude = await db.collection("students").doc(path).get()
                var data =stude.data().coms
                if (data)
                    data.forEach(doc1 =>{
                        if(doc1["date"] == date && doc1["approved"]==false){
                            alert("need to update firebase")
                        }
                    });
            }catch(error){
                console.log(error.message)
            }
        });
    }

    createCheckList(students){
        students.forEach(doc =>{
            const label=document.createElement("label");
            label.setAttribute("class","container")
            label.innerHTML=doc.get("fname")+" "+doc.get("lname")
            const inputC = document.createElement("input");
            inputC.setAttribute("type", "checkbox");
            inputC.setAttribute("value", doc.id);
            label.appendChild(inputC)
            const div= document.getElementById("stList")
            div.appendChild(label)
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
        else if(this.state.page === 'student')
            return(this.GuideAttendStudent())
        else
            return(this.menu())
    }

    menu() {
        return (
            <div id="instructor" className="sec-design">
                <h2>שלום מדריך {this.state.user.name} </h2>
                <form id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("report")}}>אישור דו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{this.chooseLayout('feedback')}} >מילוי משוב פעילות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{this.chooseLayout('student')}} >מילוי משוב חניכים<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="logout" className="btn btn-info" >התנתק</button>
                </form>
            </div>
        )
    }

    GuideAttendReport(){
        return(
            <div id="guideAttendReport" className="sec-design">
                <div id="name-group" className="form-group">
                    <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                    <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChange} required/>
                    <button className="btn btn-info" onClick={this.handleSubmit}>הצג</button>
                </div>
                <div id="name-group" className="form-group" dir="rtl">
                    <label id="insert-message" className="title-input">אשר את נוכחות החניכים במפגש:</label><br/>
                    <div id="stList" className="checkboxes"></div>
                </div>
                <button id="confirm-form" className="btn btn-info" onClick={this.handleSubmit2} >אשר</button>
                <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור</button>
            </div>
        )
    }

    GuideFeedback() {
        return(
            <div id="guideFeeadback" className="sec-design">
                <form id="guide_form" className="form-design" name="guide_form">
                    <div id="name-group" className="form-group">
                        <label id="insert-date" className="title-input">הכנס את התאריך בו התקיים המפגש</label>
                        <input type="date" className="form-control" name="insert-student" id="insert-student" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q1" className="title-input"> נושא הפעילות</label>
                        <input type="text" className="form-control" name="Q1" id="Q1" placeholder="Your Answer" minLength="5" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q1" className="title-input"> מספר הפעילות</label>
                        <input type="text" className="form-control" name="Q1" id="Q1" placeholder="Your Answer" minLength="5" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q2" className="title-input"> מה היה בפעילות</label>
                        <input type="text" className="form-control" name="Q2" id="Q2" placeholder="Your Answer" minLength="5" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q1" className="title-input">עם איזה תחושה יצאתי מהפעילות</label>
                        <input type="text" className="form-control" name="Q1" id="Q1" placeholder="Your Answer" minLength="5" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q3" className="title-input">עם אילו הצלחות נפגשתי בפעילות</label>
                        <input type="text" className="form-control" name="Q3" id="Q3" placeholder="Your Answer" minLength="10" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q3" className="title-input">עם אילו דילמות נפגשתי בפעילות</label>
                        <input type="text" className="form-control" name="Q3" id="Q3" placeholder="Your Answer" minLength="10" required/>
                    </div>
                    <div id="name-group" className="form-group">
                        <label id="Q4" className="title-input" htmlFor="name"> נקודות חשובות למפגש הבא</label>
                        <input type="text" className="form-control" name="Q4" id="Q4" placeholder="Your Answer" minLength="10" required/>
                    </div>
                    <div id ="box" className="chekbox">
                        <label id="insert-name" className="title-input">באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות</label><br/>
                        <form name="form1" className="chekbox" >
                            <label>במידה מועטה מאוד<input type="radio" value="0"/></label>
                            <label>במידה מועטה<input type="radio" value="1"/></label>
                            <label>במידה בינונית<input type="radio" value="2"/></label>
                            <label>במידה רבה<input type="radio" value="3"/></label>
                            <label>במידה רבה מאוד<input type="radio" value="4"/></label>

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

    GuideAttendStudent(){
        return(
            <div id="guideAttendReport" className="sec-design">
                <div id="name-group" className="form-group">
                    <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                    <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChange} required/>
                    <button className="btn btn-info" onClick={this.handleSubmit}>הצג</button>
                </div>
                <div id="name-group" className="form-group" dir="rtl">
                    <div id="stList" className="checkboxes"></div>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q4" className="title-input" htmlFor="name">יש לכתוב על כל חניך – במה בלט/ה? הצלחות שחווה/חוותה, התקדמות במישור הרגשי/חברתי וכד</label>
                    <input type="text" className="form-control" name="Q4" id="Q4" placeholder="Your Answer" minLength="10" required/>
                </div>
                <button type="submit" id="confirm-form" className="btn btn-info" >שלח משוב</button>
                <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור לתפריט</button>
            </div>
        )
    }

}



export  default  Guide;