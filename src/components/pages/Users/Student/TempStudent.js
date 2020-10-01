import React ,{ useState, useEffect } from "react";
import firebase, {auth,db} from '../../../../firebase/firebase'
import { RadioGroup ,FormControlLabel, Radio } from '@material-ui/core';
import Grid from "@material-ui/core/Grid";


class TempStudent extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            user: props.location,
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
            this.render()
        })

        // console.log(auth.currentUser)


    }
    async componentDidUpdate(prevProps) {

    }





    loadTempPage(page)
    {
        this.props.history.push({
            pathname: `/${page}`,
            data: this.state.user // your data array of objects
        })
    }

    async  logout() {
        //מסך טעינה
        await auth.signOut();
        window.location.href = '/';
        //סיום מסך טעינה
    }

    chooseLayout(page)
    {
        this.setState({
            page:page,
        })
        this.render()
    }

    ChangePage(path) {

        this.props.history.push({
            pathname: `${this.props.location.pathname}/${path}`,
            data: this.state.user
        })

    }

    render() {

        return ( 
            <div id="instructor" className="sec-design" dir="rtl">
                <h2> שלום {this.state.user.email} </h2>
                <form id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.ChangePage("Feedback")}}>מילוי משוב<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" onClick={()=>{this.ChangePage('Profile')}} >פרופיל<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="logout" className="btn btn-info" >התנתק</button>
                </form>
            </div>
        )
    }


}


export  default  TempStudent;