import React, { Component } from 'react'
import Select from 'react-select'
import firebase, {auth} from '../../../../firebase/firebase'
import Grid from "@material-ui/core/Grid";
import '../Guide/Guide.css';
import TestGuide from "../Guide/TempGuide";
import {FormControlLabel, Radio, RadioGroup} from "@material-ui/core";

const options = [
    { value: 'chocolate', label: 'קבוצה 1' },
    { value: 'strawberry', label: 'קבוצה 2' },
    { value: 'vanilla', label: 'קבוצה 3' }
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
                    type:"Guide",
                },
                {
                    email:"test2",
                    fname:"shlomo",
                    lname:"muuuum",
                    phone:"0566662",
                    team:"",
                    type:"Student",
                },
                {
                    email:"test",
                    fname:"tikva",
                    lname:"ttt",
                    phone:"05444444442",
                    team:"",
                    type:"Guide",
                },
            ],
        };

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
                                        {this.Card(user)}
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




    Card(user) {
        if (user) {
            //console.log(user)
            return (
                <div className="Card"  dir="rtl">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <b>שם מלא: </b>  {user.fname + " " + user.lname}<br/>
                            <b> אימייל: </b> {user.email}<br/>
                            <b> טלפון: </b>{user.phone}<br/>
                            <Select placeholder="בחר/י קבוצה מהשימה" options={options} />
                        </Grid>

                        <Grid item xs={6}>
                            <div>
                                <label>
                                    <input type="radio" value="Student" checked = {user.type === 'Student'}  onChange={(e) => {
                                        console.log(user.type ==='Student')
                                        console.log(user.type)
                                        user.type = e.target.value

                                        console.log(user.type)
                                        console.log(user.type ==='Student')

                                    }}/>
                                    סטודנט
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={6}>
                            <div>

                                <label>
                                    <input type="radio" value="Guide" checked={user.type ==='Guide'}  onChange={e => {
                                        // console.log(user)
                                        // user.type = e.target.value
                                        // console.log(user)

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



                        <Grid item xs={12}>


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