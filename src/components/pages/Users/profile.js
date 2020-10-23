import React from "react";
import  {auth, getStudentData,getStudent,getGuide,getManager} from '../../../firebase/firebase'
import {BackPage} from "./UserPage";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            fname:'',
            lname:'',
            phone:'',
        };
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
            this.getDate()
            this.render()
        })

    }

    async getDate() {
        var user=(auth.currentUser).uid
        //check if student or guide
        var student = await getStudentData(user)
        var guide = await getGuide(user)
        var manager = await getManager(user)
        if(student)
            this.setState({
                fname:student.fname,
                lname:student.lname,
                phone:student.phone,

            })
        else if(guide)
            this.setState({
                fname:guide.fname,
                lname:guide.lname,
                phone:guide.phone,

            })
        else if(manager)
            this.setState({
                fname:manager.fname,
                lname:manager.lname,
                phone:manager.phone,

            })
        console.log(this.state)
    }

    async sendData(){
        if(this.state.password && this.state.Vpassword){
            if(this.state.password !== this.state.Vpassword){
                alert("הסיסמא ואימות הסיסמא לא תואמים")
                return
            }
            else if((this.state.password).length <6){
                alert("הסיסמא צריכה להיות יותר מ6 תווים")
                return
            }
            auth.currentUser.updatePassword(this.state.password)
        }
        else if((!this.state.password && this.state.Vpassword)||(this.state.password && !this.state.Vpassword)){
            alert("אנא מלא את כל הנתונים")
            return
        }
        console.log(this.state)
        var user=(auth.currentUser).uid
        var student = await getStudent(user)
        console.log(student)
        var updateStudent = {
            fname:this.state.fname,
            lname:this.state.lname,
            phone:this.state.phone,
        }

        student.update(updateStudent).then(()=>
        {
            alert("הפרטים שונו בהצלחה")
        })
    }

    render() {
        console.log("******")
        return (
            <div id="instructor" className="sec-design">
                <Grid container spacing={2}>
                        <Grid item xs={6}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="lname"
                                name="lname"
                                type="string"
                                autoComplete="off"
                                value={this.state.lname}
                                onChange={e => {
                                    this.setState({lname:e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="שם משפחה"
                            />
                        </Grid>
                        <Grid item xs={6}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="fname"
                                name="fname"
                                type="string"
                                autoComplete="off"
                                autoFocus
                                value={this.state.fname}
                                onChange={e => {
                                    this.setState({fname:e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="שם פרטי"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="phone"
                                name="phone"
                                type="tel"
                                autoComplete="off"
                                value={this.state.phone}
                                onChange={e => {
                                    this.setState({phone:e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="פלאפון"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                    this.setState({password:e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="סיסמא חדשה"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                    this.setState({Vpassword:e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="אימות סיסמא"
                            />
                        </Grid>
                    </Grid>
                <button id="report-button" className="btn btn-info" onClick={()=>{this.sendData()}}>עדכון פרטים<span
                    className="fa fa-arrow-right"></span></button>
                <button onClick={() => {BackPage(this.props,this.state.user)}}>חזרה </button>

            </div>
        );
    }



    ChangePage(path) {

        this.props.history.push({
            pathname: `${this.props.location.pathname}/${path}`,
        })
        return
    }


}


export  default  Profile;