import React from "react";
import  {db,auth, getStudentData,getStudent} from '../../../firebase/firebase'
import {BackPage} from "./UserPage";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Select from "react-select";


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

        var student=await getStudentData(user)
        this.setState({
            fname:student.fname,
            lname:student.lname,
            phone:student.phone,

        })

        console.log(this.state)
    }

    async sendData(){
        if(this.state.password && this.state.Vpassword && this.state.password === this.state.Vpassword)
            auth.currentUser.updatePassword(this.state.password).then(()=>{
                alert("הסיסמא שונה בהצלחה")
            })
        console.log(this.state)
        var user=(auth.currentUser).uid
        var student = await getStudent(user)
        console.log(student)
        var updateStudent = {
            fname:this.state.fname,
            lname:this.state.lname,
            phone:this.state.phone,
        }

        student.update(updateStudent)
    }

    render() {
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
                                required
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
                                required
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
                                required
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
                                required
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
                                required
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