import React from "react";
import {auth, db} from '../../../../firebase/firebase';
import { Radio, RadioGroup} from "@material-ui/core";
import './Guide.css'
import {BackPage} from "../UserPage";


class GuideFeedback extends React.Component {
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

        this.feedbackGuide = this.feedbackGuide.bind(this)


    }



    async handleChange(event)
    {
        var form=''
        var name = event.target.name;
        var value = event.target.value;
        var e = event.target
        // console.log(name, value)
        if(name === 'date' && event.target.value!=='' )
        {
            var test = await db.collection("guides").doc(auth.currentUser.uid).collection("comes").doc(event.target.value).get()
            if(test.data() && test.data().locked) {
                alert("המשוב לתאריך הנוכחי נחתם נא לבחור תאריך אחר")

                document.getElementById(e.id).value=''
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
        var team = (await db.collection("guides").doc(auth.currentUser.uid).get()).data().Team;
        const collection = await db.collection('students').where("team","==",team).get()
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

    async sendfeedback(form){
        var path = auth.currentUser.uid
        try{
            var guide = await db.collection("guides").doc(path)
            var newDate = await guide.collection("comes").doc(form.date);
            newDate.set({
                form: form,
                date:form.date
            }).then(async ()=>{
                await this.addDataToTeam(guide,form.date);
                alert("הטופס נשלח בהצלחה ניתן לשנות פרטים עד לחתימת המנהל")
                window.location.reload(true);

            })

        }catch(error) {
            alert(error.message)
        }
    }
    async addDataToTeam(guide,date)
    {
        var formGuide = (await guide.get()).ref
        try{
            var team = (await guide.get()).data();
            var teamCollection = await db.collection("Teams").doc(team.team.id)
            var newDate = teamCollection.collection("Dates").doc(date);
            var doc =  await newDate.get()
            console.log(doc)
                if(!doc.exists){
                    console.log("not exist")
                    newDate.set({
                        reportGuide: formGuide,
                        topicMeeting:this.state.form.q1,
                        nameGuide: team.fname + " "+team.lname,
                        postStudents:{},
                        feedbackToStudents:{},
                        formStudents:{
                            q1:[0,0,0,0,0],
                            q2:[0,0,0,0,0],
                            q3:[0,0,0,0,0],
                            q4:[0,0,0,0,0],
                        }
                    })
                }
                else {
                    newDate.update({
                        reportGuide: formGuide,
                        topicMeeting:this.state.form.q1,
                    })
                }
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
        // console.log(event.target.value);
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




    render() {
        return(

            <div id="guideFeeadback" className="sec-design" >
                <div dir="rtl">
                    <label id="date"  className="title-input">הכנס את תאריך המפגש:</label>
                    <input type="date"  id="insert-date" name="date" onChange={this.handleChange} required/>
                    <div id="name-group">
                        <label id="Q1L" className="title-input"> נושא הפעילות</label>
                        <input type="text"  name="q1" id="q1i" onChange={this.handleChange}  required/>
                    </div>
                    <div id="name-group">
                        <label id="Q2L" className="title-input"> מספר הפעילות</label>
                        <input type="text" name="q2" id="q2i" onChange={this.handleChange}  required/>
                    </div>
                    <div id="name-group" >
                        <label id="Q3L" className="title-input"> מה היה בפעילות</label>
                        <input type="text" name="q3" id="q3i" onChange={this.handleChange}  required/>
                    </div>
                    <div id="name-group" >
                        <label id="Q4L" className="title-input">עם איזה תחושה יצאתי מהפעילות</label>
                        <input type="text"  name="q4" id="q4i" onChange={this.handleChange} placeholder="Your Answer" required/>
                    </div>
                    <div id="name-group" >
                        <label id="Q5L" className="title-input">עם אילו הצלחות נפגשתי בפעילות</label>
                        <input type="text"  name="q5" id="q5i" onChange={this.handleChange} placeholder="Your Answer" required/>
                    </div>
                    <div id="name-group" >
                        <label id="Q6L" className="title-input">עם אילו דילמות נפגשתי בפעילות</label>
                        <input type="text" name="q6" id="q6i" onChange={this.handleChange} placeholder="Your Answer" required/>
                    </div>
                    <div id="name-group" >
                        <label id="Q7L" className="title-input" htmlFor="name"> נקודות חשובות למפגש הבא</label>
                        <input type="text" name="q7" id="q7i" onChange={this.handleChange} placeholder="Your Answer" required/>
                    </div>
                    <br/>
                    <label id="insert-name" className="title-input"><h4>באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות</h4></label>
                    <div>
                        <RadioGroup
                            aria-label="new"
                            name="q8"
                            id ='q8i'
                            // value={location}
                            onChange={this.handleChange}
                            row={true}
                        >
                            <label id="insert-name" className="title-input" htmlFor="name">
                                <Radio id='q8i1' name="q8" value="1"  label="במידה מועטה מאוד" />
                                במידה מועטה מאוד
                            </label>
                            <label id="insert-name" className="title-input" htmlFor="name">
                                <Radio id='q8i2' name="q8" value="2"  label="במידה מועטה" />
                                במידה מועטה
                            </label>
                            <label id="insert-name" className="title-input" htmlFor="name">
                                <Radio id='q8i3' name="q8" value="3"  label="במידה בינונית" />
                                במידה בינונית
                            </label>
                            <label id="insert-name" className="title-input" htmlFor="name">
                                <Radio id='q8i4' name="q8" value="4"   label="במידה רבה" />
                                במידה רבה
                            </label>

                            <label id="insert-name" className="title-input" htmlFor="name" >
                                <Radio id='q8i5' name="q8" value="5"  label="במידה רבה מאוד" />
                                במידה רבה מאוד
                            </label>

                        </RadioGroup>
                    </div>
                    <br/>
                    <div id="name-group" >
                        <label id="insert-name" className="title-input" htmlFor="name">שאלות ומחשבות לשיחת הדרכה הבאה</label>
                        <input type="text" name="q9" id="q9i" onChange={this.handleChange} placeholder="Your Answer" minLength="10" required/>
                    </div>

                </div>

                <button id="sendData" className="btn btn-info" onClick={()=>{this.sendfeedback(this.state.form)}}>שלח משוב</button>
                <button id="go-back" className="btn btn-info"  onClick={()=>{BackPage(this.props,this.state.user)}}>חזור לתפריט</button>
</div>
        )
    }

}



export  default  GuideFeedback;