import  React, {Component} from "react";
import {BackPage} from "../UserPage";
import Grid from "@material-ui/core/Grid";
import Select from "react-select";
import {db} from "../../../../firebase/firebase";
import $ from "jquery";
import ClipLoader from "react-spinners/ClipLoader";




let op = false


class FeedbackStudents extends Component {

    constructor(props) {
        super(props);
        this.state =
            {
                isLoaded:false,
                show:false,
                spinner:false
            }
    }



    async  GetTeams() {

        var from = this.GetDates(this.state.dateFrom)
        var to = this.GetDates(this.state.dateTo)

        if(!this.state.dateFrom || !this.state.dateTo )
        {
            alert("נא למלא תאריך התחלה וסיום")
            return
        }

            var options=[]
            this.setState({options:options,show:false})
            var nameTeams = await db.collection("Teams")
                .orderBy('name','asc')
                .get()



            console.log("in 1")
            var Teamcollection = nameTeams.docs.map( async function(doc) {
                console.log("in 2")
                var dates = await db.collection("Teams").doc(doc.id).collection("Dates")
                    .where('date','>=',from)
                    .where('date','<=',to)
                    .get()

                if(!dates.empty)
                    return [doc,dates]

            })

            Promise.all(Teamcollection).then(res => {
                res.forEach(item=>{
                    console.log("in 3")
                    if(item)
                        options.push({ value: item, label:  item[0].data().name})
                })
                this.setState({options:options})
                console.log("in 4")

            })

    }

    render() {
        return(
            <div>
                {!this.state.spinner ? "" :
                    <div id='fr'>
                        טעון נתונים
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
            <div id="studentFeedback" className="feedback-design" dir='rtl'>
                <div id="studentFeedback" className="form-design" name="student_form" method="POST">
                    <div id="name-group" className="form-group">
                        <Grid container spacing={2}>
                            <Grid item xs={5}>
                                <label id="insert-student" className="title-input" htmlFor="name">מתאריך </label>
                                <input type="date" className="form-control"  name="date"
                                       onChange={(e)=>{
                                           this.setState({dateFrom:e.target.value,options:null,show:false,teamName:null})
                                       }}
                                       required/>
                            </Grid>
                            <Grid item xs={5}>
                                <label id="insert-student" className="title-input" htmlFor="name">עד תאריך </label>
                                <input type="date" className="form-control" id="insert-date" name="date"
                                       onChange={(e)=>{
                                           this.setState({dateTo:e.target.value,options:null,show:false,teamName:null})
                                       }}
                                       required/>
                            </Grid>


                            <Grid item xs={2} hidden={!this.state.dateTo || !this.state.dateFrom}>
                                <label id="insert-student" className="title-input" htmlFor="name"> &nbsp;</label>
                                <button id="viewReport" className="btn btn-info" onClick={()=>{
                                    this.GetTeams()
                                }}>מצא קבוצות<span
                                    className="fa fa-arrow-right"></span></button>
                            </Grid>

                            <Grid item xs={6} hidden={!this.state.options}>
                                <Select id = 'select'  placeholder={" בחר קבוצה "} options={this.state.options} onChange={(e)=>{
                                    console.log(e.label,e.value);
                                    this.setState({team:e.value,teamName:e.label})
                                }} required/>
                            </Grid>
                            <Grid item xs={3} hidden={!this.state.options}>
                                <label id="insert-student" className="title-input" htmlFor="name"> &nbsp;</label>
                                {
                                    !this.state.teamName?"לא נבחרה קבוצה": this.state.teamName
                                }

                            </Grid>
                            <Grid item xs={3}  hidden={!this.state.teamName}>
                                <button id="viewReport" className="btn btn-info" onClick={()=>{

                                    this.setState({show:!this.state.show, forms:this.state.team[1].docs})
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
                                    { this.feedbacks(Form.data())}
                                </Grid >
                            ))
                        }
                    </Grid >
                    ):(<div></div>)}
                    <button id="go-back" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזור</button>
                </div>
            </div>
            </div>
        )
    }

    feedbacks(form)
{
    if(form && this.state.show) {
       var date =form.date.toDate()
        var day = date.getUTCDate()+1
        var month = date.getMonth()+1
        var year = date.getFullYear()
        console.log(form.postStudents)
        return (
            <div id="name-group" className="form-group" dir="rtl">
                <div className="report" id="report">
                    <div>
                        <h4> שם המדריך:{form.nameGuide} </h4>
                        <h4> תאריך המפגש: {day+'/'+month+"/"+year}</h4>

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

    GetDates(date)
{
    // if(this.state.forms || this.state.show)
    //     return

    date = this.parser(date)
    var parsDate = new Date()
    parsDate.setTime(0)
    parsDate.setFullYear(date["year"],date["month"]-1,date["day"])

    return parsDate;

    // var toDate = this.parser(to)
    // to = new Date()
    // to.setFullYear(toDate["year"],toDate["month"]-1,toDate["day"]+1)
    // if(fromDate["year"]>toDate["year"]){
    //     alert("התאריך מ גדול מהתאירך עד")
    //     return
    // }
    // if(fromDate["year"]===toDate["year"] && fromDate["month"]>toDate["month"]){
    //     alert("התאריך מ גדול מהתאירך עד")
    //     return
    // }
    // if(fromDate["year"]===toDate["year"] && fromDate["month"]===toDate["month"] && fromDate["day"]>toDate["day"]){
    //     alert("התאריך מ גדול מהתאירך עד")
    //     return
    // }

}

}



export default FeedbackStudents;
