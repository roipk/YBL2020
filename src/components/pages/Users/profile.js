import React from "react";
import {
    auth,
    getStudentData,
    getStudent,
    getUser,
    getGuideData,
    getManagerData, getGuide, getManager
} from '../../../firebase/firebase'
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import ClipLoader from "react-spinners/ClipLoader";


class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loadPage:false,
            spinner: [true,'נא להמתין הדף נטען'],
            fname:'',
            lname:'',
            phone:'',
            type:''
        };
    }


    async componentDidMount() {
        var href =  window.location.href.split("/",5)
        // console.log(href)
        auth.onAuthStateChanged(async user=>{
            if(user)
            {

                var type = await getUser(user)
                if(href[4] === user.uid && (href[3] === type||type==='Tester'))
                {
                    if(type==='Tester')
                        type = href[3]
                    this.setState({
                        isLoad: true,
                        user: user,
                        type: type
                    })
                    await this.getDate()
                    this.loadSpinner(false,"")
                    this.setState({loadPage:true})
                    this.render()
                    return
                }
                else
                {

                    this.notfound()
                    return
                }

            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';
                return;

            }

        })

    }

    async getDate() {
        var user = (auth.currentUser).uid
        var student = await getStudentData(user)
        var guide = await getGuideData(user)
        var manager = await getManagerData(user)
        if (student) {
            this.setState({
                fname: student.fname,
                lname: student.lname,
                phone: student.phone,

            })
        } else if (guide) {
            this.setState({
                fname: guide.fname,
                lname: guide.lname,
                phone: guide.phone,

            })
        } else if (manager) {

            this.setState({
                fname: manager.fname,
                lname: manager.lname,
                phone: manager.phone,

            })
            // console.log(this.state)
        }
    }

    // async sendData(){
    //     if(this.state.password && this.state.Vpassword){
    //         if(this.state.password !== this.state.Vpassword){
    //             alert("הסיסמא ואימות הסיסמא לא תואמים")
    //             return
    //         }
    //         else if((this.state.password).length <6){
    //             alert("הסיסמא צריכה להיות יותר מ6 תווים")
    //             return
    //         }
    //         auth.currentUser.updatePassword(this.state.password)
    //     }
    //     else if((!this.state.password && this.state.Vpassword)||(this.state.password && !this.state.Vpassword)){
    //         alert("אנא מלא את כל הנתונים")
    //         return
    //     }
    //     // console.log(this.state)
    //     var user=(auth.currentUser).uid
    //     var student = await getStudent(user)
    //     // console.log(student)
    //     var updateStudent = {
    //         fname:this.state.fname,
    //         lname:this.state.lname,
    //         phone:this.state.phone,
    //     }
    //
    //     student.update(updateStudent).then(()=>
    //     {
    //         alert("הפרטים עודכנו בהצלחה")
    //     })
    // }
    async sendData(){
        if(this.state.password && this.state.Vpassword){
            if(this.state.password !== this.state.Vpassword){
                alert("הסיסמא ואימות הסיסמא לא תואמים")
                return
            }
            else if((this.state.password).length < 6){
                alert("הסיסמא צריכה להיות יותר מ6 תווים")
                return
            }
            // console.log(this.state.password)
            auth.currentUser.updatePassword(this.state.password)
        }
        else if((!this.state.password && this.state.Vpassword)||(this.state.password && !this.state.Vpassword)){
            alert("אנא מלא את כל הנתונים")
            return
        }
        // console.log(this.state)
        var user=(auth.currentUser).uid
        if(this.state.type === "Student")
        {
            user = await getStudent(user)
        }
        else if(this.state.type === "Guide")
        {
            user = await getGuide(user)
        }
        else if(this.state.type === "Manager")
        {
            user = await getManager(user)
        }
        // console.log(student)
        var updateStudent = {
            fname:this.state.fname,
            lname:this.state.lname,
            phone:this.state.phone,
        }

        user.update(updateStudent).then(()=>
        {
            alert("הפרטים שונו בהצלחה")
        })
    }
    loadSpinner(event,massage = ""){
        var spinner = []
        spinner.push(event)
        spinner.push(massage)
        this.setState({spinner:spinner})
    }
    render() {
        if(this.state.loadPage)
        {
            return (
                <div id="instructor" className="sec-design">
                    {!this.state.spinner[0] ? "" :
                        <div id='fr'>
                            {this.state.spinner[1]}
                            <div className="sweet-loading">
                                <ClipLoader style={{
                                    backgroundColor: "rgba(255,255,255,0.85)",
                                    borderRadius: "25px"
                                }}
                                    //   css={override}
                                            size={100}
                                            color={"#123abc"}

                                />
                            </div>
                        </div>
                    }
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
                                    this.setState({lname: e.target.value})
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
                                    this.setState({fname: e.target.value})
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
                                    this.setState({phone: e.target.value})
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
                                    this.setState({password: e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="סיסמא חדשה"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="verifyPassword"
                                name="password"
                                type="password"
                                autoComplete="off"
                                onChange={(e) => {
                                    this.setState({Vpassword: e.target.value})
                                }}
                                variant="standard"
                                fullWidth
                                label="אימות סיסמא"
                            />
                        </Grid>
                    </Grid>
                    <button id="report-button" className="btn btn-info" onClick={() => {
                        this.sendData()
                    }}>עדכון פרטים<span
                        className="fa fa-arrow-right"></span></button>
                    <button onClick={() => {
                        this.BackPage()
                    }}>חזרה
                    </button>

                </div>
            );
        }
        else
            return (<div> {!this.state.spinner[0] ? "" :
                <div id='fr'>
                    {this.state.spinner[1]}
                    <div className="sweet-loading">
                        <ClipLoader style={{
                            backgroundColor: "rgba(255,255,255,0.85)",
                            borderRadius: "25px"
                        }}
                            //   css={override}
                                    size={100}
                                    color={"#123abc"}

                        />
                    </div>
                </div>
            }</div>)
    }



    ChangePage(path) {

        this.props.history.push({
            pathname: `${this.props.location.pathname}/${path}`,
        })
        return
    }

    notfound()
    {
        this.props.history.push({
            pathname: `/404`,
            data: this.state.user // your data array of objects
        })
    }

    BackPage()
    {
        this.props.history.push({
            pathname: `/${this.state.type}/${this.state.user.uid}`,
            data: this.state.user // your data array of objects
        })
    }
}


export  default  Profile;