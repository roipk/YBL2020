import React from "react";
import  {auth, getPathData, signOut} from '../../../../firebase/firebase';
import './Guide.css'
import {NextPage} from "../UserPage";


class TestGuide extends React.Component {
    constructor(props) {
        super(props);
        
        this.state = {
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
       
        getPathData("Teams/FgMtMMfD72JGd2qYJ9VD/Dates/2020-10-10")
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
            this.render()
        })

    }


       render() {
        return (
            <div id="instructor" className="sec-design">
                <h2>Hello Guide {this.state.user.email} </h2>
                <div id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{NextPage(this.props,"Reports",this.state.user)}}>אישור דו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{NextPage(this.props,"Feedback",this.state.user)}} >מילוי משוב<span
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

}



export  default  TestGuide;