import React from "react";
import firebase, {auth,db} from '../../../../firebase/firebase';
import SelectInput from "@material-ui/core/Select/SelectInput";
import $ from 'jquery';
import {FormControlLabel, Paper, Radio, RadioGroup} from "@material-ui/core";
import './Guide.css'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


class TestGuide extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            page:'menu',
            user: props.location,
            error:false,
            loading: true,
            rule:"Manager",
            prevDate:'',
            viewStudent: false,
            form : {
            }
        };
        

        this.handleSubmit = this.handleSubmit.bind(this)
        // this.handleSubmit2 = this.handleSubmit2.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.changeBackGround = this.changeBackGround.bind(this)
        this.approvStudent = this.approvStudent.bind(this)
        this.saveStudentData = this.saveStudentData.bind(this)
        this.feadbackGuide = this.feadbackGuide.bind(this)
        // this.hendleRadioButton = this.hendleRadioButton.bind(this)
        // this.handleCheckBox = this.handleCheckBox.bind(this)

    }


    // async getDataFromFirebase(event)
    // {
    //     // await this.checkIfFeedbackExist()
    //     var guidePath = "awwLpQL9A1WKW9KX60Lz"
    //     try{
    //         var collection = await db.collection("students").get()
    //         var students = [];
    //         var selectedDate = this.state.reportDate;
    //
    //         const collectionPromises = collection.docs.map( async function(doc) {
    //                     if(doc.data()["guide"] === "1234"){
    //                         var data = db.collection("students").doc(doc.id).collection("comes").doc(selectedDate)
    //                         var ref =await db.collection("students").doc(doc.id).collection("comes").doc(selectedDate).get()
    //                         var user = (await db.collection("students").doc(doc.id).get()).data()
    //                         // if (ref.data() && ref.data()["approved"]===false){
    //                             // students.push(user);
    //                             return [user,data ,ref]
    //                         // }
    //                     }
    //             })
    //
    //         Promise.all(collectionPromises).then(res => {
    //             // this.createCheckList(res);
    //             document.getElementById("stListX").innerHTML = "";
    //             document.getElementById("stListV").innerHTML = "";
    //             var i=0
    //             res.forEach(doc=>
    //             {
    //                 console.log(doc)
    //                     // console.log(doc)
    //                     const label=document.createElement("label");
    //                     label.setAttribute("class","container")
    //                     label.innerHTML=doc[0].fname+" "+doc[0].lname
    //                     const inputC = document.createElement("input");
    //                     inputC.setAttribute("type", "checkbox");
    //                     inputC.setAttribute("value", doc[0].fname+" "+doc[0].lname);
    //                     inputC.setAttribute("id", "checkbox"+i++);
    //                     inputC.addEventListener( 'change', function() {
    //                        async function handleCheckBox(CheckBox) {
    //                            await doc[1].update({
    //                                approved: CheckBox
    //                            }).then(()=>{
    //                                console.log("update")
    //                                inputC.checked=CheckBox
    //                                if(CheckBox)
    //                                     var div= document.getElementById("stListV")
    //                                else
    //                                    var div= document.getElementById("stListX")
    //                                div.appendChild(label)
    //                                // label.remove()
    //
    //                            })
    //                         }
    //
    //                         if(this.checked) {
    //                             // Checkbox is checked..
    //                             console.log("v")
    //                             handleCheckBox(true)
    //
    //                         } else {
    //                             // Checkbox is not checked..
    //                             console.log("x")
    //                             handleCheckBox(false)
    //                         }
    //                     });
    //                     label.appendChild(inputC)
    //
    //
    //                 if(doc[2].data()["approved"]===false){
    //
    //                     inputC.checked=false
    //                     var div= document.getElementById("stListX")
    //                 }
    //
    //                 else{
    //                     inputC.checked=true
    //                     var div= document.getElementById("stListV")
    //
    //                 }
    //
    //
    //                 div.appendChild(label)
    //
    //
    //
    //
    //             })
    //         })
    //
    //
    //
    //     }catch(error) {
    //         alert(error.message)
    //     }
    // }





    // async checkIfFeedbackExist()
    // {
    //     var Path = auth.currentUser.uid
    //     var selectedDate = this.state.reportDate;
    //     console.log(Path)
    //     try{
            // const guideRef = db.collection('guides').doc(Path);
            // const date = await db.collection("Dates").where("date","==",selectedDate).get();
            // const collectionPromises = date.docs.map( async function(doc) {
            //     console.log(doc.data())
            //     const team =  db.collection("Teams").where("guide","==",guideRef).get();
            //     const collectionPromises1 = (await team).forEach(doc1 => {
            //         console.log(doc1.id)
            //         if(doc.data()["date"]  == selectedDate ){
            //             doc.data()["teams"].forEach(async doc2=>{
            //                 if(doc2.id == doc1.id){
            //                     const guideFeeadback = guideRef.collection("comes").doc(selectedDate)
            //
            //                 }
            //
            //             })
            //         }
            //     })
            //
            //
            //
            // })

            // Promise.all(collectionPromises).then(res => {
            //         // if("teams","array-contains",team)
            //
            // })
        // }catch(error) {
        //     alert(error.message)
        // }
        
        //var Dates = await db.collection("Dates").doc(selectedDate)
    // }



    // handleChange(event)
    // {
    //     this.state.reportDate = event.target.value;
    // }


    async handleChange(event)
    {
        var name = event.target.name;
        var value = event.target.value;
        if(name === 'date' && event.target.value!=='' )
        {
            var test = await db.collection("guides").doc(auth.currentUser.uid).collection("comes").doc(event.target.value).get()
            if(test.exists) {
                alert("מילאת משוב לתאריך הנוכחי נא לבחור תאריך אחר")
                var form = this.state.form;
                console.log(name);

                form[name] = '';
                this.setState({form:form})

            }
            else
            {
                var form = this.state.form
                form[name] = value;
                this.setState({form:form})
            }
        }
        else
        {
            var form = this.state.form
            form[name] = value;
            this.setState({form:form})
        }



    }



    async handleChangeDate(event)
    {
        var name = event.target.name;
        var value = event.target.value;
        if(name === 'date')
        {
            this.setState({date:value,viewStudent:false})
        }
        //     var test = await db.collection("guides").doc(auth.currentUser.uid).collection("comes").doc(event.target.value).get()
        //     if(test.exists) {
        //
        // }



    }



    async handleSubmit(event)
    {
        if(!this.state.date) {
            return;
        }
        if(this.state.date === this.state.prevDate) {
            this.setState({viewStudent: !this.state.viewStudent});
            return ;
        }
        this.setState({prevDate:this.state.date});
        console.log("in");
        var team = (await db.collection("guides").doc(auth.currentUser.uid).get()).data().Team;
        const collection = await db.collection('students').where("Team","==",team).get()
        const Students = [];
        const date = this.state.date
        const collectionPromisesTeam = collection.docs.map( async function(doc) {
            var ref =await db.collection("students").doc(doc.id).collection("comes").doc(date).get()
            var user = await db.collection("students").doc(doc.id).get()
            return [ref,user]

        })

        Promise.all(collectionPromisesTeam).then(res => {
            console.log("end prommis");
            res.forEach(doc=>{
                var approv = false;
                var feedback = ''
                if(doc[0].exists) {
                    approv = true;
                    feedback = doc[0].data().feedbackGuide;
                }
                var data = doc[1].data();
                var ref = doc[1].id;
                Students.push({data,approv,ref,feedback})
            })
            let i;
            console.log(Students.length)
            this.setState({viewStudent: !this.state.viewStudent});
            for (i=0;i<Students.length;i++)
            {
                if(!this.state.Students)
                {
                    this.setState({Students: Students});
                    return
                }
                else if(Students[i].approv!=this.state.Students[i].approv)
                {
                    this.setState({Students: Students});
                    return
                }

            }
        });
        // this.sendDataToFirebase(this.state.form)
    }
    loadPage(event){
        this.setState({loading:event})
    }
    handleSubmit2(event)
    {
        this.sendfeedback(event)
    }


    async sendDataToFirebase(form)
    {
        // var team = auth.currentUser.uid
        var path = auth.currentUser.uid
        // var path = "4oUqd87D5odv62ebBKOFQ3D4iqX2"
        try{
            console.log(form.date)
            var guide = await db.collection("guides").doc(path)
            var newDate = guide.collection("comes").doc(form.date);
            newDate.set({
                form: form,
                date:form.date
            })

            var team = (await guide.get()).data();
            // console.log(team)
            var updateTeamDate  = await db.collection("Teams").doc(team.Team.id)
                .collection("Dates").doc(form.date);

            updateTeamDate.set(
                {
                    reportGuide: newDate,
                    nameGuide: team.fname + " "+team.lname,
                    postsStudents:[],
                    feedbackToStudents:[]

                }
            )


            console.log("done")

        }catch(error) {
            alert(error.message)
        }



    }

    async componentDidMount() {
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

        // console.log(auth.currentUser)


    }


    async componentDidUpdate(prevProps) {

    }

    approvStudent(student)
    {
        for(var i=0;i<this.state.Students.length;i++)
        {
           if(this.state.Students[i] === student)
           {
               this.state.Students[i].approv = !this.state.Students[i].approv
               this.setState({Students: this.state.Students})
               return
           }
        }
    }

    feadbackGuide(event,student)
    {
        console.log(event.target.value)
        for(var i=0;i<this.state.Students.length;i++)
        {
            if(this.state.Students[i] === student)
            {
                this.state.Students[i].feedback = event.target.value
                this.setState({Students: this.state.Students})
                return
            }
        }
    }

    async saveStudentData(student)
    {
        var sid = student.ref
        var approved = student.approv
        var feedback = student.feedback
        if(!approved)
            feedback="";

        console.log(student)
        console.log(sid)
        console.log(feedback)
        console.log(approved)
        console.log(this.state.date)
        const stud =await db.collection("students").doc(sid).collection("comes").doc(this.state.date).set({
            approved:approved,
            feedbackGuide:feedback
        }, {merge:true})
        // console.log(student.ref)

    }




    loadTempPage(page)
    {
        this.props.history.push({
            pathname: `/${page}`,
            data: this.state.user // your data array of objects
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
        // console.log(this.state.date)
        // if(this.state.user.email)
        //     console.log("this is email : "+this.state.user.email)
        // if(this.state.page ==='feedback')
        //     return(this.GuideFeedback())
        // else if(this.state.page === 'report')
            return(this.GuideAttendReport())
        // else
        //     return(this.menu())
    }

    menu() {
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
        //check firebase if form exist
            return (
                <div id="guideAttendReport" className="sec-design">
                    <div id="name-group" className="form-group">
                        <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                        <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChangeDate} required/>
                        <button className="btn btn-info" onClick={()=>{
                            if(!this.state.date)
                        {
                            alert("נא לבחור תאריך")
                        }
                        else
                            this.handleSubmit()

                           }}>{!this.state.viewStudent?("הצג"):("הסתר")}
                        </button>
                    </div>
                    {
                        (!this.state.Students || !this.state.viewStudent)?  (<div></div>) :  (

                            <Grid container spacing={2}>
                            <Grid item xs={12}>
                            <Grid  container
                                   direction="row"
                                   justify="space-between"
                                   alignItems="center"
                                   spacing={2}>
                                {
                            this.state.Students.map((Student,index) => (
                                <Grid  item xs={6}  key={index}>
                                    {this.Card(Student)}
                                </Grid >
                            ))}
                        </Grid>
                        </Grid>
                        </Grid>

                        )
                    }

                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("report")}}>מעבר לדו"ח נוכחות<span className="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזרה לתפריט<span className="fa fa-arrow-right"></span></button>


                    {/*חלק ישן של האישורי הגעה*/}
                    {/*    <div id="name-group" className="form-group" dir="rtl">*/}
                    {/*        <label id="insert-message" className="title-input">סטודנטים שדממתינים לאישור נוכחות:</label><br/>*/}
                    {/*        <div id="stListX" className="checkboxes"></div>*/}
                    {/*    </div>*/}
                    {/*<div id="name-group" className="form-group" dir="rtl">*/}
                    {/*    <label id="insert-message" className="title-input">סטודנטים שהשתתפו ואושרו:</label><br/>*/}
                    {/*    <div id="stListV" className="checkboxes"></div>*/}
                    {/*</div>*/}



                </div>

            )

        // return(
        //     <div id="guideAttendReport" className="sec-design">
        //             <div id="name-group" className="form-group">
        //                 <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
        //                 <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChangeDate} required/>
        //                 <button className="btn btn-info" onClick={this.handleSubmit}>הצג</button>
        //             </div>
        //
        //             {
        //             this.state.Students.map((Student,index) => (
        //                 <div key={index}>
        //                     <p>
        //                     {this.Card(Student)}
        //                     </p>
        //                 </div>
        //
        //             ))
        //             }
        //         <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("report")}}>מעבר לדו"ח נוכחות<span className="fa fa-arrow-right"></span></button>
        //         <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזרה לתפריט<span className="fa fa-arrow-right"></span></button>
        //
        //
        //         {/*חלק ישן של האישורי הגעה*/}
        //         {/*    <div id="name-group" className="form-group" dir="rtl">*/}
        //         {/*        <label id="insert-message" className="title-input">סטודנטים שדממתינים לאישור נוכחות:</label><br/>*/}
        //         {/*        <div id="stListX" className="checkboxes"></div>*/}
        //         {/*    </div>*/}
        //         {/*<div id="name-group" className="form-group" dir="rtl">*/}
        //         {/*    <label id="insert-message" className="title-input">סטודנטים שהשתתפו ואושרו:</label><br/>*/}
        //         {/*    <div id="stListV" className="checkboxes"></div>*/}
        //         {/*</div>*/}
        //
        //
        //
        //     </div>
        // )
    }

    changeBackGround(event)
    {
        console.log(event)

    }
    Card(Student) {
        if (Student) {
            console.log(Student)
                return (
                    <div className="Card"
                         style={
                             Student.approv?(
                             {
                        backgroundColor: "rgba(0, 255, 3, 0.7)"})://approv
                         ({
                             backgroundColor: "rgba(255, 0, 0, 0.7)",//not approv
                          })
                         }>



                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <h4>{Student.data.fname + " " + Student.data.lname}</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="text-below-image">
                                    <label>הגעה <input type='checkbox' checked={Student.approv} onChange={()=>{this.approvStudent(Student)}}/></label>
                                </div>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="text"><b>email:</b> {Student.data.email}</div>
                            </Grid>
                            <Grid item xs={12}>
                                {
                                    (!Student.approv)?(<div></div>):(<div>
                                        <label>משוב על החניך </label>

                                        <input type='Textarea' value={Student.feedback} onChange={(e)=>{this.feadbackGuide(e,Student)}} />
                                    </div>)
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <button onClick={()=>{this.saveStudentData(Student)}}>שמירת שינויים</button>
                            </Grid>
                        </Grid>




                    </div>
                );
        }
        else
        {
            return (
                <div></div>
            )
        }
    }



    GuideFeedback() {
        return(
            <div id="guideFeeadback" className="sec-design">
                <div dir="rtl">
                    <label id="date"  className="title-input">הכנס את תאריך המפגש:</label>
                    <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChange} required/>
                <div id="name-group" className="form-group">
                    <label id="Q1" className="title-input"> נושא הפעילות</label>
                    <input type="text" className="form-control" name="Q1" id="Q1" onChange={this.handleChange} minLength="5" required/>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q1" className="title-input"> מספר הפעילות</label>
                    <input type="text" className="form-control" name="Q2" id="Q2" onChange={this.handleChange} minLength="5" required/>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q2" className="title-input"> מה היה בפעילות</label>
                    <input type="text" className="form-control" name="Q3" id="Q3" onChange={this.handleChange} minLength="5" required/>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q1" className="title-input">עם איזה תחושה יצאתי מהפעילות</label>
                    <input type="text" className="form-control" name="Q4" id="Q4" onChange={this.handleChange} placeholder="Your Answer" minLength="5" required/>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q3" className="title-input">עם אילו הצלחות נפגשתי בפעילות</label>
                    <input type="text" className="form-control" name="Q5" id="Q5" onChange={this.handleChange} placeholder="Your Answer" minLength="10" required/>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q3" className="title-input">עם אילו דילמות נפגשתי בפעילות</label>
                    <input type="text" className="form-control" name="Q6" id="Q6" onChange={this.handleChange} placeholder="Your Answer" minLength="10" required/>
                </div>
                <div id="name-group" className="form-group">
                    <label id="Q4" className="title-input" htmlFor="name"> נקודות חשובות למפגש הבא</label>
                    <input type="text" className="form-control" name="Q7" id="Q7" onChange={this.handleChange} placeholder="Your Answer" minLength="10" required/>
                </div>
                <br/>
                <label id="insert-name" className="title-input">באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות</label>
                <div>
                    <RadioGroup
                        aria-label="new"
                        name="q8"
                        id ='q8'
                        // value={location}
                        onChange={this.handleChange}
                        row={true}
                    >
                        <FormControlLabel value="1" labelPlacement="end" control={<Radio />} label="במידה מועטה מאוד" />
                        <FormControlLabel value="2" labelPlacement="end" control={<Radio />} label="במידה מועטה" />
                        <FormControlLabel value="3" labelPlacement="end" control={<Radio />} label="במידה בינונית" />
                        <FormControlLabel value="4" labelPlacement="end" control={<Radio />} label="במידה רבה" />
                        <FormControlLabel value="5" labelPlacement="end" control={<Radio />} label="במידה רבה מאוד" />
                    </RadioGroup>
                </div>
                    <br/>
                <div id="name-group" className="form-group">
                    <label id="insert-name" className="title-input" htmlFor="name">שאלות ומחשבות לשיחת הדרכה הבאה</label>
                    <input type="text" className="form-control" name="q9" id="q9" onChange={this.handleChange} placeholder="Your Answer" minLength="10" required/>
                </div>

                </div>


                <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("report")}}>מעבר למשובי סטודנטים<span className="fa fa-arrow-right"></span></button>
                <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור לתפריט</button>
                {/*<button id="confirm-form" className="btn btn-info" onClick={this.handleSubmit2} >אשר</button>*/}
                <button onClick={() => this.loadTempPage("User")}>חזרה להמשך בדיקות דפים</button>

            </div>
        )
    }

    


}



export  default  TestGuide;