import React, { Component } from "react";
import {getTeamFeedbackByDate, db, auth, getUser} from "../../../../firebase/firebase";
import Select from 'react-select'
import Grid from "@material-ui/core/Grid";
import $ from 'jquery'
import {BackPage} from "../UserPage";
import ClipLoader from "react-spinners/ClipLoader";

var options = []
class AttendReport extends Component {

    constructor(props) {
        super(props);


        this.state =
            {
                isLoaded:false,
                date:"",
                teamPath:"",
                spinner: [true,'נא להמתין הדף נטען'],
                report:false
            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleChangeDate = this.handleChangeDate.bind(this)
    }

    loadSpinner(event,massage){
        var spinner = []
        spinner.push(event)
        spinner.push(massage)
        this.setState({spinner:spinner})
    }

    render() {

        return(
            <div id="instactorReport" className="sec-design">
                {!this.state.spinner[0] ? "" :
                    <div id='fr'>
                       {this.state.spinner[1]}
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
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid item xs={12}>
                            <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                            <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChangeDate} required/>
                            <Select  placeholder={" בחר קבוצה "} options={options} onChange={(e)=>{
                                console.log(e.label,e.value);
                                this.setState({teamPath:e.value})
                            }} required/>

                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">

                                <button onClick={(e)=>{
                                    this.handleSubmit(e)
                                    this.setState({report:!this.state.report})
                                }} >{this.state.report?"הסתר דוח נוכחות":"הצג דוח נוכחות"}</button>

                            </div>
                        </Grid>
                        <Grid item xs={12}  hidden={!this.state.report}>
                            <div id="studentList" ></div>
                        </Grid>
                        <Grid item xs={12}>
                                <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                        </Grid>
                    </Grid>
                </Grid>
            </div>

        )
    }
    async handleSubmit(event)
    {
        $("#studentList").replaceWith('<div id="studentList">')
        if(!this.state.date ||  !this.state.teamPath) {
            alert("נא למלא את כל השדות החובה")
            return
        }
        var res= (await getTeamFeedbackByDate(this.state.teamPath.id,this.state.date)).studentsComes

        res.forEach(name=>{
            var lable=document.createElement("lable");
            lable.innerHTML = name;
            var br=document.createElement("br");
            $('#studentList').append(lable);
            $('#studentList').append(br);
        })
        // for (var name in res){
        //     var lable=document.createElement("lable");
        //     lable.innerHTML = name;
        //     var br=document.createElement("br");
        //     $('#studentList').append(lable);
        //     $('#studentList').append(br);
        // }
    }
    async componentDidMount() {
        auth.onAuthStateChanged(async user=>{
            if(user)
            {
                var type = await getUser(user)
                console.log(type)
                if(type)
                {
                    this.setState({
                        isLoad: true,
                        user: user,
                        type: type
                    })
                    // if(type!=='Tester')
                    //     this.loadUser(type)
                }
                else{
                    alert('המנהל עדיין לא אישר את הבקשה')
                    window.location.href = '/Login';
                    return
                }
                // console.log(tester.exists)
                // console.log(user)
                console.log("change user")
                // this.setState({
                //     isLoad:true,
                //     user:user,
                // })

            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';
                return;

            }
            this.loadSpinner(false,'')
            this.render()
        })
        this.loadSpinner(true,"מיבא נתוני משתמש")
        var nameTeams =  await db.collection("Teams").get();
        nameTeams.forEach(doc=>{
            options.push({ value: doc.ref, label: doc.data().name })
        })
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
    }

    loadUser(page)
    {
        this.props.history.push({
            // pathname: `/${page}/${this.state.user.id}`,
            pathname: `/Temp${page}`,
            data: this.state.user // your data array of objects
        })
    }
}



export default AttendReport;
