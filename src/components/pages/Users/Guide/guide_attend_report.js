import React from "react";
import {auth, db, getUser} from '../../../../firebase/firebase';
import './Guide.css'
import Grid from "@material-ui/core/Grid";
import ClipLoader from "react-spinners/ClipLoader";





var postStudents = [];


class GuideReports extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            loadPage:false,
            spinner: [true,'נא להמתין הדף נטען'],
            page:'menu',
            user: props.location,
            error:false,
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
                q9:"",
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
        // console.log(name, value)
        if(name === 'date' && event.target.value!=='' )
        {
            this.loadSpinner(true,"מיבא נתוני קבוצה")
            var test = await db.collection("guides").doc(auth.currentUser.uid).collection("comes").doc(event.target.value).get()
            if(test.exists) {
                alert("מילאת משוב לתאריך הנוכחי נא לבחור תאריך אחר")
                form = this.state.form;
                // console.log(name);

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

        this.loadSpinner(false,"")

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
        this.loadSpinner(true,"מייבא נתונים")
        if(!this.state.date) {
            this.loadSpinner(false,"")
            return;
        }
        if(this.state.date === this.state.prevDate) {
            this.setState({viewStudent: !this.state.viewStudent});
            this.loadSpinner(false,"")
            return ;
        }
        this.setState({prevDate:this.state.date});
        // console.log("in");
        var team = (await db.collection("guides").doc(auth.currentUser.uid).get()).data().team;
        const collection = await db.collection('students').where("team","==",team).get()
        // console.log(collection)
        const Students = [];
        const date = this.state.date
        const collectionPromisesTeam = collection.docs.map( async function(doc) {
            var ref =await db.collection("students").doc(doc.id).collection("comes").doc(date).get()
            var user = await db.collection("students").doc(doc.id).get()
            return [ref,user]

        })

        Promise.all(collectionPromisesTeam).then(res => {
            // console.log("end prommis");
            res.forEach(doc=>{
                var canUpdate = false
                var approv = false;
                var feedback = ''
                var originFeedback = ''
                if(doc[0].exists) {
                    approv = doc[0].data().approved;
                    // console.log(doc[0].data())
                    if(doc[0].data().form)
                        canUpdate = doc[0].data().form.canUpdate
                    feedback = doc[0].data().feedbackGuide;

                    originFeedback = feedback;

                }
                var originCheckBox = approv
                var data = doc[1].data();
                var ref = doc[1].id;
                Students.push({data,approv,ref,feedback,originFeedback,originCheckBox,canUpdate})
            })
            let i;
            // console.log(Students.length)
            this.setState({viewStudent: !this.state.viewStudent});
            for (i=0;i<Students.length;i++)
            {
                if(!this.state.Students)
                {
                    this.setState({Students: Students});
                    this.loadSpinner(false,"")
                    return
                }
                else if(Students[i].approv!==this.state.Students[i].approv)
                {
                    this.setState({Students: Students});
                    this.loadSpinner(false,"")
                    return
                }

            }

            this.loadSpinner(false,"")
        });


    }


    loadSpinner(event,massage=""){
        var spinner = []
        spinner.push(event)
        spinner.push(massage)
        this.setState({spinner:spinner})
    }



    async addDataToTeam()
    {

        var path = auth.currentUser.uid
        try{
            var dateForm=this.state.date
            var {year,month,day} =this.parser(dateForm)
            var date = new Date()
            date.setTime(0)
            date.setFullYear(year,month-1,day)
            var guide = await db.collection("guides").doc(path);
            var team = (await guide.get()).data();
            var teamCollection = await db.collection("Teams").doc(team.team.id);
            var newDate = teamCollection.collection("Dates").doc(dateForm);
            newDate.get().then(async function(doc){
                if(!doc.exists){
                    // console.log("create form")
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
                        feedbackToStudents:[],

                    })

                }
            })

        }catch(error) {
            this.loadSpinner(false)
        }
    }
    async componentDidMount() {
        var href =  window.location.href.split("/",5)
        // console.log(href)
        auth.onAuthStateChanged(async user=>{
            if(user)
            {

                var type = await getUser(user)
                if(href[4] === user.uid && (href[3] === type||type==='Tester'))
                {
                    this.setState({
                        isLoad: true,
                        user: user,
                        type: type
                    })
                    this.render()
                    this.setState({loadPage:true})
                    this.loadSpinner(false,"")
                    return
                }
                else
                {
                    this.notfound()
                    return
                }

            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';
                return;

            }

        })

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
        this.loadSpinner(true ,"מעדכן נתוני סטודנט")
        // alert("המערכת מתחילה בשמירה יש ללחוץ אישור להתחלה והמתנה להודעה נוספת")
        this.setState({loading:true})
        for(var i=0;i<Students.length;i++)
        {
           Students[i] = await this.saveStudentData(Students[i])
        }
        alert("כל השינויים בוצעו בהצלחה")
        this.loadSpinner(false)
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
        // console.log("in1")
        if(student.feedback === student.originFeedback && student.originCheckBox === student.approv && !student.canUpdate) {
            return student
        }

        await this.addDataToTeam()
        // console.log("in2")
        var sid = student.ref
        var form = await db.collection("students").doc(sid).collection("comes").doc(this.state.date)
        var dataStudent = (await form.get()).data()
        if(dataStudent && dataStudent.form) {
            dataStudent = await dataStudent.form
            console.log("dataStudent")
            console.log(dataStudent)
        }
        var approved = student.approv
        var feedback = student.feedback
        var guide = await db.collection("guides").doc(auth.currentUser.uid)
        var team = (await guide.get()).data();
        var updateTeamDate  = await db.collection("Teams").doc(team.team.id).collection("Dates").doc(this.state.date).get();
        var updateTeamDateSet  = await db.collection("Teams").doc(team.team.id).collection("Dates").doc(this.state.date)
        var name=student.data.fname+" "+ student.data.lname
        var enter
        // console.log("in3");
        var feedbackToStudents = updateTeamDate.data()["feedbackToStudents"];
        if(feedbackToStudents === undefined)
            feedbackToStudents = []
        postStudents = [];
        var studentsComes=updateTeamDate.data().studentsComes;
        if(studentsComes ===null || studentsComes === undefined)
            studentsComes=[]
        var formStudents = {};
        if(approved) {
            console.log("in4");
            if (dataStudent === undefined) {
                console.log("in5")
                feedbackToStudents.push(name+": "+feedback);
                studentsComes.push(name)
                updateTeamDateSet.set({
                    studentsComes:studentsComes,
                    feedbackToStudents: feedbackToStudents,
                }, { merge: true });
                await this.AddFeedbackToStudent(sid);
            }
            else {
                // console.log("in5.1")
                if (!updateTeamDate.data()) {
                    // console.log("in6",dataStudent)
                    // console.log(feedback)
                    feedbackToStudents.push(name+": "+feedback);
                    studentsComes.push(name)
                    postStudents.push(dataStudent.topicMeeting,);
                    // console.log(dataStudent)
                    // console.log(dataStudent.formStudents)
                    formStudents = dataStudent.formStudents;
                    if(!formStudents)
                        formStudents={}
                    updateTeamDateSet.set({
                        feedbackToStudents: feedbackToStudents,
                        studentsComes:studentsComes,
                        guideName: team.fname+' '+team.lname,
                        postStudents: postStudents,
                        formStudents: formStudents
                    }, { merge: true });
                } else
                    {
                    // console.log("in7")
                    if (updateTeamDate.data()["postStudents"]) {
                        // console.log("in8")
                        postStudents = updateTeamDate.data()["postStudents"]
                        // console.log(dataStudent)
                        if (dataStudent.topicMeeting !== undefined && dataStudent.topicMeeting !== '') {
                            postStudents.push(dataStudent.topicMeeting);
                        }
                    }
                    if (updateTeamDate.data()["studentsComes"]) {
                        // console.log("in9")
                        studentsComes = updateTeamDate.data()["studentsComes"]
                        enter = false
                        await studentsComes.map((oldCome, i) => {
                            var newName = oldCome.substr(0, name.length)
                            if (newName === name) {
                                // console.log('enter')
                                studentsComes[i] = name
                                enter = true
                            }
                    return oldCome
                        })
                        if (!enter) {
                            studentsComes.push(name)

                        }
                    }
                    else
                    {
                        studentsComes.push(name)
                    }
                    if (updateTeamDate.data()["feedbackToStudents"]) {
                        // console.log("in10")
                        feedbackToStudents = updateTeamDate.data()["feedbackToStudents"]
                        // console.log(feedbackToStudents)
                        enter = false
                        if(feedbackToStudents && feedbackToStudents.length > 0) {
                            await feedbackToStudents.map((oldfeedback, i) => {
                                var newName = oldfeedback.substr(0, name.length)
                                if (newName === name) {
                                    // console.log('enter')
                                    feedbackToStudents[i] = name + ": " + feedback
                                    enter = true
                                }
                        return oldfeedback
                            })
                        }
                        if (!enter) {

                            // console.log("in11")
                            if(feedbackToStudents.length === 0)
                                feedbackToStudents=[]
                            // console.log(feedbackToStudents)
                            feedbackToStudents.push(name + ": " + feedback)


                        }
                    // console.log(feedbackToStudents)

                    }
                    else
                    {
                        feedbackToStudents.push(name + ": " + feedback)
                    }
                    if (updateTeamDate.data()["formStudents"]) {
                        // console.log("formStudents")
                        // console.log("in12")
                        formStudents = await updateTeamDate.data()['formStudents']
                        if (dataStudent.canUpdate) {
                            // console.log("in11")
                            postStudents.push(dataStudent.feedback)
                            formStudents['q1'][parseInt(dataStudent.feeedbackMeeting['q1'])]++;
                            formStudents['q2'][parseInt(dataStudent.feeedbackMeeting['q2'])]++;
                            formStudents['q3'][parseInt(dataStudent.feeedbackMeeting['q3'])]++;
                            formStudents['q4'][parseInt(dataStudent.feeedbackMeeting['q4'])]++;
                        }
                    }


                    await updateTeamDateSet.update({
                        // guideName: team.fname + ' ' + team.lname,
                        postStudents: postStudents,
                        feedbackToStudents: feedbackToStudents,
                        studentsComes:studentsComes,
                        formStudents: formStudents
                    })


                }
            }
        }

        else{
            await this.AddFeedbackToStudent(sid);
            // console.log("in11")
            feedback=""
            feedbackToStudents=[]
            studentsComes=[]
            feedbackToStudents = updateTeamDate.data()["feedbackToStudents"]
            var newfeedbacks=[]
            for(var i=0;i<feedbackToStudents.length;i++)
            {
                if(feedbackToStudents[i].substr(0,name.length)!==name) {
                    newfeedbacks.push(feedbackToStudents[i])
                }
            }
            await updateTeamDateSet.set({feedbackToStudents:newfeedbacks},{merge:true});
        }
        dataStudent = (await form.get()).data()
        if(dataStudent && dataStudent.form) {
            dataStudent = await dataStudent.form
            // console.log("dataStudent")
            // console.log(dataStudent)
        }
        if(dataStudent && dataStudent.canUpdate)
        {
            if(feedback === undefined)
                feedback=""
            dataStudent.canUpdate = false
            if(approved === undefined || dataStudent === undefined || feedback === undefined) {
                    console.log(student)
                    alert("נמצאה בעיית נתונים אצל החניך " + student.data.fname+" "+student.data.lname+" לא נשמרו נתונים עבורו ")
            }
            else {
                await form.update({
                    approved: approved,
                    form: dataStudent,
                    feedbackGuide: feedback,
                    guideName: team.fname + ' ' + team.lname
                }).catch(err => {
                    console.log("err")
                    console.log(err)
                })
            }
        }
        else {
            if (feedback === undefined)
                feedback = ""
            if (approved === undefined || dataStudent === undefined || feedback === undefined) {
                alert("נמצאה בעיית נתונים אצל החניך " + student.data.fname + " " + student.data.lname +" לא נשמרו נתונים עבורו ")
            } else {
                await form.set({
                    approved: approved,
                    feedbackGuide: feedback,
                    guideName: team.fname + ' ' + team.lname
                }, {merge: true})
            }
        }
        student.originFeedback = student.feedback
        student.originCheckBox = student.approv
        student.canUpdate = false
        // console.log("done")
        return  student
    }




    async AddFeedbackToStudent(sid)
    {
        console.log(sid)

        await db.collection("students").doc(sid).collection("comes").doc(this.state.date).set({
            approved: true,
        }, {merge: true})
    }


    render() {
        if(this.state.loadPage) {
            return (
                <div>
                    {!this.state.spinner[0] ? "" :
                        <div id='fr'>
                            {this.state.spinner[1]}
                            <div className="sweet-loading">
                                <ClipLoader style={{
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    borderRadius: "25px"
                                }}
                                    //   css={override}
                                            size={100}
                                            color={"#123abc"}

                                />
                            </div>
                        </div>
                    }
                    <div id="guideAttendReport" className="sec-design">
                        <div id="name-group" className="form-group">
                            <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                            <input type="date" className="form-control" id="insert-date" name="date"
                                   onChange={this.handleChangeDate} required/>
                            <button className="btn btn-info" onClick={() => {
                                if (!this.state.date) {
                                    alert("נא לבחור תאריך")
                                } else
                                    this.handleSubmit()

                            }}>{!this.state.viewStudent ? ("הצג חניכים") : ("הסתר חניכים")}
                            </button>
                        </div>
                        {
                            (!this.state.Students || !this.state.viewStudent) ? (<div></div>) : (

                                <Grid container spacing={2}>
                                    <Grid item xs={12}>
                                        <Grid container
                                              direction="row"
                                              justify="space-between"
                                              alignItems="center"
                                              spacing={2}>
                                            {
                                                this.state.Students.map((Student, index) => (
                                                    <Grid item xs={12} key={index}>
                                                        {this.Card(Student)}
                                                    </Grid>
                                                ))}
                                        </Grid>
                                    </Grid>
                                </Grid>

                            )
                        }

                        <button id="feedback-button" className="btn btn-info" hidden={!this.state.viewStudent}
                                onClick={async () => {
                                    var students = await this.saveAllStudent(this.state.Students)
                                    this.setState({Students: students})

                                }}>שמירת כל השינויים<span className="fa fa-arrow-right"></span></button>
                        <button id="feedback-button" className="btn btn-info" onClick={() => {
                            this.BackPage()
                        }}>חזרה לתפריט<span className="fa fa-arrow-right"></span></button>
                    </div>
                </div>
            )
        }
    else
            return (<div> {!this.state.spinner[0] ? "" :
                <div id='fr'>
                    {this.state.spinner[1]}
                    <div className="sweet-loading">
                        <ClipLoader style={{
                            backgroundColor: "rgba(255,255,255,0.85)",
                            borderRadius: "25px"
                        }}
                            //   css={override}
                                    size={100}
                                    color={"#123abc"}

                        />
                    </div>
                </div>
            }</div>)
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

                            <Grid item xs={6} hidden={Student.feedback === Student.originFeedback && Student.originCheckBox === Student.approv && !Student.canUpdate}>
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


    loadUser(page)
    {

        this.props.history.push({
            // pathname: `/${page}/${this.state.user.id}`,
            pathname: `/Temp${page}`,
            data: this.state.user // your data array of objects
        })
    }

    notfound()
    {
        this.props.history.push({
            pathname: `/404`,
            data: this.state.user // your data array of objects
        })
    }

    BackPage()
    {
        this.props.history.push({
            pathname: `/Guide/${this.state.user.uid}`,
            data: this.state.user // your data array of objects
        })
    }

}



export  default  GuideReports;
