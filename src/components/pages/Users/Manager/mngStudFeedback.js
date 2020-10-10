import React, { Component } from "react";
import {BackPage} from "../UserPage";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import {db} from "../../../../firebase/firebase";




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
                                <input type="date" className="form-control" value={this.state.dateFrom} name="date"
                                       onChange={(e)=>{
                                           this.setState({dateFrom:e.target.value})
                                           // this.GetTeams()
                                       }}
                                       required/>
                            </Grid>
                            <Grid item xs={5}>
                                <label id="insert-student" className="title-input" htmlFor="name">עד תאריך </label>
                                <input type="date" className="form-control" id="insert-date" value={this.state.dateTo} name="date"
                                       onChange={(e)=>{
                                           this.setState({dateTo:e.target.value})
                                           // this.GetTeams()
                                       }}
                                       required/>
                            </Grid>

                            <Grid item xs={2} hidden={!this.state.dateTo && !this.state.dateFrom}>
                                <label id="insert-student" className="title-input" htmlFor="name"> &nbsp;</label>
                                <button id="viewReport" className="btn btn-info" onClick={()=>{ this.GetTeams()}}>מצא קבוצות<span
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
                    <Grid  item xs={12} hidden={!this.state.show}>
                        {/*{*/}
                        {/*    this.state.Forms.map((Form,index) => (*/}
                        {/*        <Grid  item xs={12}  key={index}>*/}
                        {/*            <hr/>*/}
                        {/*            {this.feedbacks(Form)}*/}
                        {/*        </Grid >*/}
                        {/*    ))}*/}
                    </Grid >
                    <button id="go-back" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזור</button>
                </div>
            </div>
        )
    }

    feedbacks(form)
{
    if(form)
    return(
    <div id="name-group" className="form-group" dir="rtl">
        <div  className="report" id="report">
            <div>
                <h4> תאריך המפגש: 25-10-2020</h4>
                <h4> נושא המפגש: טעם וריח</h4>
            </div>
            <table id="feedList" style={{style:{textAlign: 'center'}}}>
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
                    <th><h5>5</h5></th>
                    <th><h5>2</h5></th>
                    <th><h5>0</h5></th>
                    <th><h5>4</h5></th>
                    <th><h5>4</h5></th>
                </tr>
                <tr>
                    <th><h5>באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד?</h5></th>
                    <th><h5>1</h5></th>
                    <th><h5>2</h5></th>
                    <th><h5>3</h5></th>
                    <th><h5>4</h5></th>
                    <th><h5>5</h5></th>
                </tr>
                <tr>
                    <th><h5>באיזה מידה נושא המפגש היה רלוונטי עבורך?</h5></th>
                    <th><h5>2</h5></th>
                    <th><h5>5</h5></th>
                    <th><h5>3</h5></th>
                    <th><h5>4</h5></th>
                    <th><h5>4</h5></th>
                </tr>
                <tr>
                    <th><h5> באיזה מידה לקחת חלק פעיל במפגש היום?</h5></th>
                    <th><h5>2</h5></th>
                    <th><h5>5</h5></th>
                    <th><h5>3</h5></th>
                    <th><h5>4</h5></th>
                    <th><h5>4</h5></th>
                </tr>
            </table>

            <div>
                <u><h3>סיכום חניכים:</h3></u>
                <h5>היה לי כיף</h5>
                <h5>נהנתי מאוד</h5>
                <h5>היה משהו משהו</h5>
                <h5>בדיקה כלשהי</h5>
                <h5>מתנות תמיד זה נחמד</h5>
            </div>
        </div>
    </div>
    )
    else
        return (<div></div>)
}


async GetForms()
{
    var from= this.state.dateFrom
    var to= this.state.dateTo
    console.log(this.state.team)
    var forms = await db.collection('Teams').doc(this.state.team.id).collection("Dates").where('date','>=',from).get()
    console.log(forms)
}
}



export default FeedbackStudents;
