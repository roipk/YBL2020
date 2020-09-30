import React, { Component } from 'react'
import Select from 'react-select'
import firebase, {auth, db} from '../../../../firebase/firebase'
import Grid from "@material-ui/core/Grid";
import '../Guide/Guide.css';
import TestGuide from "../Guide/TempGuide";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

const options = [
   ]

class UserApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            users:[
                {
                    email:"test",
                    fname:"gershon",
                    lname:"mm",
                    phone:"050111111222",
                    team:"",
                    teamName:"",
                    type:"Guide",
                },
                {
                    email:"test2",
                    fname:"shlomo",
                    lname:"muuuum",
                    phone:"0566662",
                    team:"",
                    teamName:"",
                    type:"Student",
                },
                {
                    email:"test",
                    fname:"tikva",
                    lname:"ttt",
                    phone:"05444444442",
                    team:"",
                    teamName:"",
                    type:"Guide",
                },
            ],
        };

    }

    async componentDidMount() {
        var approval =  await db.collection("waitforapproval").get();
        var users = []
        approval.forEach(doc=>{
            users.push(doc.data())
           this.setState({users:users})
        })

        console.log(this.state)
        var nameTeams =  await db.collection("Teams").get();
        nameTeams.forEach(doc=>{
            options.push({ value: doc.ref, label: doc.data().name })
    })


}

    radio(e,index)
{

    var student = document.getElementById("Student"+index)
    var guide = document.getElementById("Guide"+index)

    if(e.target === student) {
        student.checked=true;
        guide.checked=false;

    }
    else {
        guide.checked=true;
        student.checked=false;
    }
}
render() {
    return (
        <div id="guideAttendReport" className="sec-design">
            <div id="name-group" className="form-group">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Grid  container
                               direction="row"
                               justify="space-between"
                               alignItems="center"
                               spacing={2}>
                            {
                                this.state.users.map((user,index) => (
                                    <Grid  item xs={12}  key={index}>
                                        {this.Card(user,index)}
                                    </Grid >

                                ))}
                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">
                                <button >אישור בקשות מסומנות</button>
                            </div>

                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">

                                <button >אישור כל הבקשות</button>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </div>


            {/*<button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזרה לתפריט<span className="fa fa-arrow-right"></span></button>*/}


        </div>
    );
}




    Card(user,index) {
        if (user) {
            return (
                <div className="Card"  dir="rtl">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <b>שם מלא: </b>  {user.fname + " " + user.lname}<br/>
                            <b> אימייל: </b> {user.email}<br/>
                            <b> טלפון: </b>{user.phone}<br/>
                            <Select  placeholder={" נבחרה קבוצה - "+user.teamName} options={options} />
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <label>
                                    <input id ={"Student"+index} type="radio" checked={user.type==="Student"} value="Student" onChange={(e) => {
                                        user.type = e.target.value;
                                        console.log(user.type)
                                        this.radio(e,index)

                                    }}/>
                                    סטודנט
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>

                                <label>
                                    <input id ={"Guide"+index}  checked={user.type==="Guide"}type="radio" value="Guide"  onChange={e => {
                                        user.type = e.target.value;
                                        console.log(user.type)
                                        this.radio(e,index)

                                    }}/>
                                    מדריך
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">
                                <label className="container">אישור בקשה<input type='checkbox' /></label>
                            </div>

                        </Grid>

                        <Grid item xs={6}>
                            <button >אישור בקשה בודדת</button>
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

export  default  UserApproval;