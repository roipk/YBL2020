import React from "react";
import {auth, getPathData, getUser, signOut} from '../../../../firebase/firebase';
import './Guide.css'
import {NextPage} from "../UserPage";
import ClipLoader from "react-spinners/ClipLoader";

class TestGuide extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
            spinner: true,
            page:'menu',
            user: props.location,
            error:false,
            loading: true,
            rule:"Manager",
            prevDate:'',
            viewStudent: false,
            date:"",
            form : {
                date:"",
                q1:"",
                q2:"",
                q3:"",
                q4:"",
                q5:"",
                q6:"",
                q7:"",
                q8:"",
                q9:""
            }
        };
       
        // getPathData("Teams/FgMtMMfD72JGd2qYJ9VD/Dates/2020-10-10")
    }


    loadSpinner(event){
        this.setState({spinner:event})
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
                    if(type!=='Tester')
                        this.loadUser(type)
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
            this.loadSpinner(false)
            this.render()
        })

    }


       render() {
        return (
            <div id="instructor" className="sec-design" dir='rtl'>
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
                <h2>שלום {this.state.user.displayName} </h2>
                {/*<h2>Hello Guide {this.state.user.email} </h2>*/}
                <div id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{NextPage(this.props,"Reports",this.state.user)}}>אישור דו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{NextPage(this.props,"Feedback",this.state.user)}} >מילוי משוב<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{NextPage(this.props,"Profile",this.state.user)}} >עדכון פרטים או סיסמא<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="logout" className="btn btn-info" onClick={()=>{signOut()}} >התנתק</button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{
                        this.props.history.push({
                            pathname: `User`,
                            data: this.state.user // your data array of objects
                        })}} >חזרה לדף בדיקות<span
                        className="fa fa-arrow-right"></span></button>
                </div>
            </div>
        )
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



export  default  TestGuide;