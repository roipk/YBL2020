import React from "react";
import {auth, db} from '../../../../firebase/firebase';
import { Radio, RadioGroup} from "@material-ui/core";
import './Guide.css'
import {BackPage} from "../UserPage";
import Grid from "@material-ui/core/Grid";
import ClipLoader from "react-spinners/ClipLoader";


class GuideFeedback extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            page:'menu',
            user: props.location,
            spinner: true,
            error:false,
            loading: true,
            rule:"Manager",
            prevDate:'',
            viewStudent: false,
            date:"",
            form : {
                date:"",
                team:"",
                name:"",
            }
        };


        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        // this.handleChangeDate = this.handleChangeDate.bind(this)
        this.approvStudent = this.approvStudent.bind(this)

        this.feedbackGuide = this.feedbackGuide.bind(this)


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

    loadSpinner(event){
        this.setState({spinner:event})
    }

    async handleChange(event)
    {
        this.loadSpinner(true)

        var form=''
        var name = event.target.name;
        var value = event.target.value;
        var e = event.target
        if(name === 'date' && event.target.value!=='' )
        {

            var formGuide = await db.collection("guides").doc(auth.currentUser.uid).collection("comes").doc(event.target.value).get()

            if(formGuide.data() && formGuide.data().locked) {
                alert("המשוב לתאריך הנוכחי נחתם נא לבחור תאריך אחר")
                document.getElementById(e.id).value=''
                form = this.state.form;
                console.log(name);

                form[name] = '';
                this.setState({form:form})

            }
            else if(formGuide.data())
            {
                this.setState({form:formGuide.data().form})

            }
            else
            {
                var guideData= await db.collection("guides").doc(auth.currentUser.uid).get()
                form ={}
                form[name] = value;
                form['name']=guideData.data().fname+' '+guideData.data().lname;
                form['team']=guideData.data().teamName
                this.setState({form:form})
            }
        }
        else
        {
            form = this.state.form
            form[name] = value;
            this.setState({form:form})
        }
        this.loadSpinner(false)



    }


    //
    // async handleChangeDate(event)
    // {
    //     var name = event.target.name;
    //     var value = event.target.value;
    //     if(name === 'date')
    //     {
    //         this.setState({date:value,viewStudent:false});
    //         this.state.date=value
    //     }
    //
    //
    //     this.state.Students=null
    // }



    async handleSubmit(event)
    {
        if(!this.state.date) {
            return;
        }
        if(this.state.date === this.state.prevDate) {
            this.setState({viewStudent: !this.state.viewStudent});
            return ;
        }
        this.loadSpinner(true)
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
                    this.loadSpinner(false)
                    return
                }
                else if(Students[i].approv!==this.state.Students[i].approv)
                {
                    this.setState({Students: Students});
                    this.loadSpinner(false)
                    return
                }

            }
            this.loadSpinner(false)
        });


    }
    loadPage(event){
        this.setState({loading:event})
    }

    async sendfeedback(form){
        this.loadSpinner(true)
        var path = auth.currentUser.uid
        try{
            var guide = await db.collection("guides").doc(path)
            console.log(form)
            var newDate = await guide.collection("comes").doc(form.date);
            newDate.set({
                form: form,
                date:form.date
            }).then(async ()=>{
                await this.addDataToTeam(guide,form.date);
                alert("הטופס נשלח בהצלחה ניתן לשנות פרטים עד לחתימת המנהל")
                this.loadSpinner(false)
                window.location.reload(true);

            })

        }catch(error) {
            alert(error.message)
            this.loadSpinner(false)
        }
    }
    async addDataToTeam(guide,date)
    {
        var formGuide = (await guide.collection('comes').doc(date).get()).ref
        try{
            var team = (await guide.get()).data();
            var teamCollection = await db.collection("Teams").doc(team.team.id)
            var newDate = teamCollection.collection("Dates").doc(date);
            var doc =  await newDate.get()
            var {year,month,day} = this.parser(date)
            var fullDate = new Date()
            fullDate.setTime(0)
            fullDate.setFullYear(year,month-1,day)
            // date.setUTCFullYear(year,month,day)
            // date.setHours(0,0,0)
            console.log(doc)
                if(!doc.exists){
                    console.log("not exist")
                    newDate.set({
                        date:fullDate,
                        reportGuide: formGuide,
                        topicMeeting:this.state.form.q1,
                        nameGuide: team.fname + " "+team.lname,
                        postStudents:[],
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
                    console.log(formGuide)
                    newDate.update({
                        date:fullDate,
                        reportGuide: formGuide,
                        topicMeeting:this.state.form.q1,
                    })
                }
        }catch(error) {
            alert(error.message)
        }



    }
    async componentDidMount() {
        auth.onAuthStateChanged(async user=>{
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
            var teamName = await db.collection("guides").doc(auth.currentUser.uid).get()
                if(!teamName.data().teamName)
                {
                    alert("אינך משוייכ/ת לקבוצה יש לפנות למנהל")
                    this.loadSpinner(false)
                    BackPage(this.props,this.state.user)
                }
            this.loadSpinner(false)
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
                {!this.state.spinner ? "" :
                    <div id='fr'>
                        אנא המתן/י הפעולה מתבצעת
                        <div className="sweet-loading">
                            <ClipLoader style={{
                                backgroundColor: "rgba(255,255,255,0.85)",
                                borderRadius: "25px"
                            }}
                                //   css={override}
                                        size={120}
                                        color={"#123abc"}

                            />
                        </div>
                    </div>
                }
                <div dir="rtl">
                    <label id="date"  className="title-input">הכנס את תאריך המפגש:</label>
                    <input type="date"  id="insert-date" name="date" onChange={(e)=>this.handleChange(e)} required/>
                    <div id="name-group">
                        <label id="Q1L" className="title-input">נושא הפעילות:</label>
                        <input type="text"  name="q1" id="q1i" placeholder={'התשובה שלך'} value={this.state.form.q1?(this.state.form.q1):('')} onChange={(e)=>{this.handleChange(e)}}  required/>
                    </div>
                    <div id="name-group">
                        <label id="Q2L" className="title-input">מספר הפעילות:</label>
                        <input type="text" name="q2" id="q2i" placeholder={'התשובה שלך'} value={this.state.form.q2?(this.state.form.q2):('') } onChange={(e)=>this.handleChange(e)}  required/>
                    </div>
                    <div id="name-group" >
                        <label id="Q3L" className="title-input">מה היה בפעילות?</label>
                        <Grid item xs={12}>
                            {
                                <div>
                                    <textarea  dir="rtl" cols="70" name="q3" id="q3i" rows="5" placeholder={'התשובה שלך'} value={this.state.form.q3?(this.state.form.q3):('') } onChange={(e)=>this.handleChange(e)}  required/>

                                </div>
                            }
                        </Grid>
                        {/*<input type="text" name="q3" id="q3i" onChange={this.handleChange}  required/>*/}
                    </div>
                    <div id="name-group" >
                        <label id="Q4L" className="title-input">עם איזה תחושה יצאתי מהפעילות?</label>
                        <Grid item xs={12}>
                            {
                                <div>

                                    <textarea  dir="rtl" cols="70" name="q4" id="q4i" rows="5"placeholder={'התשובה שלך'} value={this.state.form.q4?(this.state.form.q4):('') } onChange={(e)=>this.handleChange(e)}  required/>


                                </div>
                            }
                        </Grid>
                        {/*<input type="text"  name="q4" id="q4i" onChange={this.handleChange} placeholder="Your Answer" required/>*/}
                    </div>
                    <div id="name-group" >
                        <label id="Q5L" className="title-input">עם אילו הצלחות נפגשתי בפעילות?</label>
                        <Grid item xs={12}>
                            {
                                <div>

                                    <textarea  dir="rtl" cols="70"  name="q5" id="q5i" rows="5" placeholder={'התשובה שלך'} value={this.state.form.q5?(this.state.form.q5):('') }  onChange={(e)=>this.handleChange(e)}  required/>


                                </div>
                            }
                        </Grid>
                        {/*<input type="text"  name="q5" id="q5i" onChange={this.handleChange} placeholder="Your Answer" required/>*/}
                    </div>
                    <div id="name-group" >
                        <label id="Q6L" className="title-input">עם אילו דילמות נפגשתי בפעילות?</label>
                        <Grid item xs={12}>
                            {
                                <div>

                                    <textarea  dir="rtl" cols="70" name="q6" id="q6i" rows="5" placeholder="Your Answer"placeholder={'התשובה שלך'} value={this.state.form.q6?(this.state.form.q6):('') } onChange={(e)=>this.handleChange(e)}  required/>


                                </div>
                            }
                        </Grid>
                        {/*<input type="text" name="q6" id="q6i" onChange={this.handleChange} placeholder="Your Answer" required/>*/}
                    </div>
                    <div id="name-group" >
                        <label id="Q7L" className="title-input" htmlFor="name">נקודות חשובות למפגש הבא:</label>
                        <Grid item xs={12}>
                            {
                                <div>

                                    <textarea  dir="rtl" cols="70" name="q7" id="q7i" rows="5" placeholder={'התשובה שלך'} value={this.state.form.q7?(this.state.form.q7):('') } onChange={(e)=>this.handleChange(e)}  required/>


                                </div>
                            }
                        </Grid>
                        {/*<input type="text" name="q7" id="q7i" onChange={this.handleChange} placeholder="Your Answer" required/>*/}
                    </div>
                    <br/>
                    <label id="insert-name" className="title-input"><h4>באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות?</h4></label>
                    <div>
                        <RadioGroup
                            aria-label="new"
                            name="q8"
                            id ='q8i'
                            // value={location}
                            onChange={(e)=>this.handleChange(e)}
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
                        <label id="insert-name" className="title-input" htmlFor="name">שאלות ומחשבות לשיחת הדרכה הבאה:</label>
                        <Grid item xs={12}>
                            {
                                <div>

                                    <textarea  dir="rtl" cols="70" name="q9" id="q9i"  rows="5"placeholder={'התשובה שלך'} value={this.state.form.q9?(this.state.form.q9):('') } onChange={(e)=>this.handleChange(e)}  required/>


                                </div>
                            }
                        </Grid>
                        {/*<input type="text" name="q9" id="q9i" onChange={this.handleChange} placeholder="Your Answer" minLength="10" required/>*/}
                    </div>

                </div>

                <button id="sendData" className="btn btn-info" onClick={()=>{this.sendfeedback(this.state.form)}}>שלח משוב</button>
                <button id="go-back" className="btn btn-info"  onClick={()=>{BackPage(this.props,this.state.user)}}>חזור לתפריט</button>
</div>
        )
    }

}



export  default  GuideFeedback;