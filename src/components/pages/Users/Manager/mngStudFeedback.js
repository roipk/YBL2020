import  React, {Component, createElement} from "react";
import {BackPage} from "../UserPage";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import {db} from "../../../../firebase/firebase";
import $ from "jquery";




let op = false


class FeedbackStudents extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,
                show:false,
            }
    }



    async  GetTeams() {
        if (!op) {
            op=true
            var options=[]
            var nameTeams = await db.collection("Teams")
                .orderBy('name','asc')
                .get()
            nameTeams.forEach(doc => {
                options.push({value: doc.ref, label: doc.data().name})
            })
           this.setState({options:options})

        }
    }

    render() {
        return(
            <div id="studentFeedback" className="feedback-design" dir='rtl'>
                <div id="studentFeedback" className="form-design" name="student_form" method="POST">
                    <div id="name-group" className="form-group">
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <label id="insert-student" className="title-input" htmlFor="name">מתאריך </label>
                                <input type="date" className="form-control"  name="date"
                                       onChange={(e)=>{
                                           this.setState({dateFrom:e.target.value})
                                           // this.GetTeams()
                                       }}
                                       required/>
                            </Grid>
                            <Grid item xs={5}>
                                <label id="insert-student" className="title-input" htmlFor="name">עד תאריך </label>
                                <input type="date" className="form-control" id="insert-date" name="date"
                                       onChange={(e)=>{
                                           this.setState({dateTo:e.target.value})
                                           // this.GetTeams()
                                       }}
                                       required/>
                            </Grid>

                            <Grid item xs={2} hidden={!this.state.dateTo && !this.state.dateFrom}>
                                <label id="insert-student" className="title-input" htmlFor="name"> &nbsp;</label>
                                <button id="viewReport" className="btn btn-info" onClick={()=>{
                                    this.GetTeams()
                                }}>מצא קבוצות<span
                                    className="fa fa-arrow-right"></span></button>
                            </Grid>

                            <Grid item xs={6} hidden={!this.state.options}>
                                <Select  placeholder={" בחר קבוצה " }options={this.state.options} onChange={(e)=>{
                                    console.log(e.label,e.value);
                                    this.setState({team:e.value,teamName:e.label})
                                }} required/>
                            </Grid>
                            <Grid item xs={3}>
                            </Grid>
                            <Grid item xs={3}  hidden={!this.state.options}>
                                <button id="viewReport" className="btn btn-info" onClick={()=>{
                                    this.GetForms()
                                    this.setState({show:!this.state.show})
                                }}>{!this.state.show?("הצג דו\"ח מפגשים"):("הסתר דו\"ח מפגשים")}<span
                                    className="fa fa-arrow-right"></span></button>
                            </Grid>

                        </Grid>
                        </div>
                    {this.state.forms?(
                    <Grid  item xs={12} hidden={!this.state.show} >
                        {
                            this.state.forms.map((Form,index) => (
                                <Grid  item xs={12}  key={index}>
                                    <hr/>
                                    {this.feedbacks(Form.data())}
                                </Grid >
                            ))
                        }
                    </Grid >
                    ):(<div></div>)}
                    <button id="go-back" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזור</button>
                </div>
            </div>
        )
    }

    feedbacks(form)
{
    if(form) {
        console.log(form)
        console.log(form.postStudents)
        return (
            <div id="name-group" className="form-group" dir="rtl">
                <div className="report" id="report">
                    <div>
                        <h4> שם המדריך:{form.nameGuide} </h4>
                        <h4> תאריך המפגש: {form.date.Date}</h4>
                        <h4> נושא המפגש: {form.topicMeeting}</h4>
                    </div>
                    <table id="feedList" style={{style: {textAlign: 'center'}}}>
                        <tbody>
                        <tr>
                            <th><h5> &nbsp; שאלות &nbsp;</h5></th>
                            <th><h5> &nbsp; במידה מועטה מאוד &nbsp;</h5></th>
                            <th><h5> &nbsp; במידה מועטה&nbsp; </h5></th>
                            <th><h5> &nbsp; במידה בינונית&nbsp; </h5></th>
                            <th><h5> &nbsp; במידה רבה&nbsp; </h5></th>
                            <th><h5> &nbsp; במידה רבה מאוד &nbsp;</h5></th>
                        </tr>
                        <tr>
                            <th><h5>באיזה מידה המפגש היום חידש לך/למדת דברים חדשים?</h5></th>
                            <th><h5>{form.formStudents['q1'][0]}</h5></th>
                            <th><h5>{form.formStudents['q1'][1]}</h5></th>
                            <th><h5>{form.formStudents['q1'][2]}</h5></th>
                            <th><h5>{form.formStudents['q1'][3]}</h5></th>
                            <th><h5>{form.formStudents['q1'][4]}</h5></th>

                        </tr>
                        <tr>
                            <th><h5>באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד?</h5></th>
                            <th><h5>{form.formStudents['q2'][0]}</h5></th>
                            <th><h5>{form.formStudents['q2'][1]}</h5></th>
                            <th><h5>{form.formStudents['q2'][2]}</h5></th>
                            <th><h5>{form.formStudents['q2'][3]}</h5></th>
                            <th><h5>{form.formStudents['q2'][4]}</h5></th>
                        </tr>
                        <tr>
                            <th><h5>באיזה מידה נושא המפגש היה רלוונטי עבורך?</h5></th>
                            <th><h5>{form.formStudents['q3'][0]}</h5></th>
                            <th><h5>{form.formStudents['q3'][1]}</h5></th>
                            <th><h5>{form.formStudents['q3'][2]}</h5></th>
                            <th><h5>{form.formStudents['q3'][3]}</h5></th>
                            <th><h5>{form.formStudents['q3'][4]}</h5></th>
                        </tr>
                        <tr>
                            <th><h5> באיזה מידה לקחת חלק פעיל במפגש היום?</h5></th>
                            <th><h5>{form.formStudents['q4'][0]}</h5></th>
                            <th><h5>{form.formStudents['q4'][1]}</h5></th>
                            <th><h5>{form.formStudents['q4'][2]}</h5></th>
                            <th><h5>{form.formStudents['q4'][3]}</h5></th>
                            <th><h5>{form.formStudents['q4'][4]}</h5></th>
                        </tr>
                        </tbody>
                    </table>

                    <div id='posts'>
                        <u><h3>סיכום חניכים:</h3></u>
                        {
                            form.postStudents.map((post, i) =>
                                <h5 key={i} >{post}</h5>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }
    else
        return (<div></div>)
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
async GetForms()
{
    if(this.state.forms || this.state.show)
        return
    var from = this.state.dateFrom;
    var to = this.state.dateTo;
    if(!from)
      {
          alert("שדה מתאריך - הוא שדה חובה")
          return
      }
    if(!to)
    {
        alert("שדה עד תאריך - הוא שדה חובה")
        return
    }
    var fromDate = this.parser(from)
    console.log(fromDate["year"])
    from = new Date()
    from.setFullYear(fromDate["year"],fromDate["month"]-1,fromDate["day"]-1)
    var toDate = this.parser(to)

    to = new Date()
    to.setFullYear(toDate["year"],toDate["month"]-1,toDate["day"]+1)
    if(fromDate["year"]>toDate["year"]){
        alert("התאריך מ גדול מהתאירך עד")
        return
    }
    if(fromDate["year"]===toDate["year"] && fromDate["month"]>toDate["month"]){
        alert("התאריך מ גדול מהתאירך עד")
        return
    }
    if(fromDate["year"]===toDate["year"] && fromDate["month"]===toDate["month"] && fromDate["day"]>toDate["day"]){
        alert("התאריך מ גדול מהתאירך עד")
        return
    }



    var forms = await db.collection('Teams').doc(this.state.team.id).collection("Dates")
        .where('date','>',from)
        .where('date','<',to)
        .get()
    this.setState({forms:forms.docs})
    console.log(forms)
}
}



export default FeedbackStudents;
