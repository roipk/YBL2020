import React from "react";
import firebase, {auth, db} from '../../../../firebase/firebase';
import './Guide.css'
import Grid from "@material-ui/core/Grid";
import {BackPage} from "../UserPage";





var postStudents = [];

class GuideReports extends React.Component {
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
            date:"",
            form : {
                date:"",
                q1:"",
                q2:"",
                q3:"",
                q4:"",
                q5:"",
                q6:"",
                q7:"",
                q8:"",
                q9:""
            }
        };


        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.approvStudent = this.approvStudent.bind(this)
        this.saveStudentData = this.saveStudentData.bind(this)
        this.feedbackGuide = this.feedbackGuide.bind(this)
        
    }



    async handleChange(event)
    {
        var form=''
        var name = event.target.name;
        var value = event.target.value;
        console.log(name, value)
        if(name === 'date' && event.target.value!=='' )
        {
            var test = await db.collection("guides").doc(auth.currentUser.uid).collection("comes").doc(event.target.value).get()
            if(test.exists) {
                alert("מילאת משוב לתאריך הנוכחי נא לבחור תאריך אחר")
                form = this.state.form;
                console.log(name);

                form[name] = '';
                this.setState({form:form})

            }
            else
            {
                form = this.state.form
                form[name] = value;
                this.setState({form:form})
            }
        }
        else
        {
            form = this.state.form
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
            this.setState({date:value,viewStudent:false});
            this.state.date=value
        }

        this.state.Students=null
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
        var team = (await db.collection("guides").doc(auth.currentUser.uid).get()).data().team;
        const collection = await db.collection('students').where("team","==",team).get()
        console.log(collection)
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
                var originFeedback = ''
                if(doc[0].exists) {
                    approv = doc[0].data().approved;
                    feedback = doc[0].data().feedbackGuide;
                    originFeedback = feedback;

                }
                var originCheckBox = approv
                var data = doc[1].data();
                var ref = doc[1].id;
                Students.push({data,approv,ref,feedback,originFeedback,originCheckBox})
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
                else if(Students[i].approv!==this.state.Students[i].approv)
                {
                    this.setState({Students: Students});
                    return
                }

            }
        });


    }
    loadPage(event){
        this.setState({loading:event})
    }



    async addDataToTeam()
    {
        var path = auth.currentUser.uid
        try{
            var dateForm=this.state.date
            var {year,month,day} =this.parser(dateForm)
            var date = new Date()
            date.setFullYear(year,month-1,day)
            var guide = await db.collection("guides").doc(path);
            var team = (await guide.get()).data();
            var teamCollection = await db.collection("Teams").doc(team.team.id);
            var newDate = teamCollection.collection("Dates").doc(dateForm);
            newDate.get().then(async function(doc){
                if(!doc.exists){
                    console.log("create form")
                    newDate.set({
                        formStudents:{
                            q1:[0,0,0,0,0],
                            q2:[0,0,0,0,0],
                            q3:[0,0,0,0,0],
                            q4:[0,0,0,0,0],
                        },
                        date:date,
                        nameGuide: team.fname + " "+team.lname,
                        postStudents:[],
                        feedbackToStudents:{},

                    })

                }
            })
        }catch(error) {

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

        var Students =  this.state.Students;
        for(var i=0;i<Students.length;i++)
        {
            if(Students[i] === student)
            {
                Students[i].approv = !Students[i].approv;
                this.setState({Students:Students})
                return
            }
        }
    }

    feedbackGuide(event,student)
    {
        var Students = this.state.Students;
        for(var i=0;i<Students.length;i++)
        {
            if(Students[i] === student)
            {
                Students[i].feedback = event.target.value
                this.setState({Students: Students})
                return
            }
        }
    }


    async saveAllStudent(Students)
    {
        alert("המערכת מתחילה בשמירה יש ללחוץ אישור להתחלה והמתנה להודעה נוספת")
        for(var i=0;i<Students.length;i++)
        {
           Students[i] = await this.saveStudentData(Students[i])
        }
        alert("כל השינויים בוצעו בהצלחה")
        return Students
    }

    parser(date)
    {
        var year=''
        var month = ''
        var day = ''
        var j=0;
        for(var i =0; i<date.length; i++)
        {
            if(j===0 && date[i]!=='-')
            {
                year+=date[i]
            }
            else if(j===1 && date[i]!=='-')
            {
                month+=date[i]
            }
            else if(j===2 && date[i]!=='-')
            {
                day+=date[i]
            }
            else
                j++

        }
        year = parseInt(year)
        month=parseInt(month)
        day= parseInt(day)
        return {year,month,day}
    }
    async saveStudentData(student)
    {
        console.log("in1")
        if(student.feedback === student.originFeedback && student.originCheckBox === student.approv) {
            return
        }
        await this.addDataToTeam()
        console.log("in2")
        var sid = student.ref
        var form = await db.collection("students").doc(sid).collection("comes").doc(this.state.date)
        var dataStudent = (await form.get()).data()
        if(dataStudent && dataStudent.form)
            dataStudent = await dataStudent.form
        var approved = student.approv
        var feedback = student.feedback
        var guide = await db.collection("guides").doc(auth.currentUser.uid)
        var team = (await guide.get()).data();
        var updateTeamDate  = await db.collection("Teams").doc(team.team.id).collection("Dates").doc(this.state.date).get();
        var updateTeamDateSet  = await db.collection("Teams").doc(team.team.id).collection("Dates").doc(this.state.date)
        var name=student.data.fname+" "+ student.data.lname
        console.log("in3");
        var feedbackToStudents = {};
        postStudents = [];
        var formStudents = {};
        if(approved) {
            console.log("in4");
            if (dataStudent === undefined) {
                feedbackToStudents[name] = feedback;
                updateTeamDateSet.set({
                    feedbackToStudents: feedbackToStudents,
                }, { merge: true });
            } else {
                console.log("in5")
                if (!updateTeamDate.data()) {
                    console.log("in6",dataStudent)
                    console.log(feedback)
                    feedbackToStudents[name] = feedback;
                    console.log(dataStudent.topicMeeting)
                    postStudents.push(dataStudent.topicMeeting,);
                    console.log(dataStudent)
                    console.log(dataStudent.formStudents)
                    formStudents = dataStudent.formStudents;
                    updateTeamDateSet.set({
                        feedbackToStudents: feedbackToStudents,
                        // guideName: team.fname+' '+team.lname,
                        postStudents: postStudents,
                        formStudents: formStudents
                    }, { merge: true });
                } else {
                    console.log("in7")
                    if (updateTeamDate.data()["postStudents"]) {
                        console.log("in8")
                        postStudents = updateTeamDate.data()["postStudents"]
                        console.log(dataStudent)
                        if(dataStudent.topicMeeting!==undefined && dataStudent.topicMeeting!=='')
                            postStudents.push(dataStudent.topicMeeting,);
                    }
                    if (updateTeamDate.data()["feedbackToStudents"]) {
                        console.log("in9")
                        feedbackToStudents = updateTeamDate.data()["feedbackToStudents"]
                        feedbackToStudents[name] = feedback

                    }
                    if (updateTeamDate.data()["formStudents"]) {
                        // console.log("formStudents")
                        console.log("in10")
                        formStudents = await updateTeamDate.data()['formStudents']
                        if (dataStudent.canUpdate) {
                            console.log("in11")
                            formStudents['q1'][parseInt(dataStudent.feeedbackMeeting['q1'])]++;
                            formStudents['q2'][parseInt(dataStudent.feeedbackMeeting['q2'])]++;
                            formStudents['q3'][parseInt(dataStudent.feeedbackMeeting['q3'])]++;
                            formStudents['q4'][parseInt(dataStudent.feeedbackMeeting['q4'])]++;
                        }
                    }

                    console.log(formStudents)
                    updateTeamDateSet.update({
                        // guideName: team.fname + ' ' + team.lname,
                        postStudents: postStudents,
                        feedbackToStudents: feedbackToStudents,
                        formStudents: formStudents
                    })

                }
            }
        }

        else{
            console.log("in11")
            feedback=""
            feedbackToStudents={}
            feedbackToStudents=updateTeamDate.data()["feedbackToStudents"]
            console.log('not approved')
            updateTeamDateSet.set({
                feedbackToStudents:{
                    [name]:firebase.firestore.FieldValue.delete()
                }}, { merge: true });
        }


        if(dataStudent && dataStudent.canUpdate)
        {
            // dataStudent.canUpdate = false
            await form.set({
                approved: approved,
                form:dataStudent,
                feedbackGuide: feedback,
                guideName: team.fname + ' ' + team.lname
            }, {merge: true})
        }
        else {
            await form.set({
                approved: approved,
                feedbackGuide: feedback,
                guideName: team.fname + ' ' + team.lname
            }, {merge: true})
        }
        student.originFeedback = student.feedback
        student.originCheckBox = student.approv
        console.log("done")
        return  student
    }







    render() {
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

                    }}>{!this.state.viewStudent?("הצג חניכים"):("הסתר חניכים")}
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
                                            <Grid  item xs={12}  key={index}>
                                                {this.Card(Student)}
                                            </Grid >
                                        ))}
                                </Grid>
                            </Grid>
                        </Grid>

                    )
                }

                <button id="feedback-button" className="btn btn-info" hidden={!this.state.viewStudent} onClick={async ()=>{
                    var students = await this.saveAllStudent( this.state.Students)
                    this.setState({Students:students})

                }}>שמירת כל השינויים<span className="fa fa-arrow-right"></span></button>
                <button id="feedback-button" className="btn btn-info"  onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט<span className="fa fa-arrow-right"></span></button>

            </div>

        )
    }

    Card(Student) {
        if (Student) {
             return (
                    <div className="Card"
                         style={
                             Student.approv?(
                             {
                                backgroundColor: "rgba(153, 255, 153, 0.7)"})://approv
                            ({
                                backgroundColor: "rgba(255, 102, 102, 0.7)",//not approv
                            })
                         }>



                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <b>{Student.data.fname + " " + Student.data.lname}</b><br/>
                                {Student.data.email}<b> :אימייל</b>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="text-below-image">
                                    <label className="container">נכח/ה במפגש<input type='checkbox' checked={Student.approv} onChange={()=>{
                                        this.approvStudent(Student)

                                    }}/></label>
                                </div>
                            </Grid>

                            <Grid item xs={12}>
                                {
                                    (!Student.approv)?(<div></div>):(<div>
                                        <label>משוב על החניך
                                        </label>
                                        <textarea  dir="rtl" cols="50"  rows="5" value={Student.feedback} onChange={(e)=>{this.feedbackGuide(e,Student)}} required/>


                                    </div>)
                                }
                            </Grid>
                            <Grid item xs={6} hidden={Student.feedback === Student.originFeedback && Student.originCheckBox === Student.approv}>
                                <button onClick={async ()=>{
                                    var allStudent=[]
                                    allStudent.push(Student)
                                    allStudent = await this.saveAllStudent(allStudent)
                                    var s = this.state.Students
                                    for(var i=0;i<s.length;i++)
                                    {
                                        if(s[i] === Student)
                                        {
                                           s[i] = allStudent[0]
                                            this.setState({Students: s})
                                        }
                                    }

                                }}>שמירת שינויים</button>
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

}



export  default  GuideReports;