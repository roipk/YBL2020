import React from "react";
import  {auth} from '../../../../firebase/firebase'
import ClipLoader from "react-spinners/ClipLoader";
import {NextPage} from "../UserPage";

class TempManager extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            user: props.location,
            error:false,
            loading: true,
            rule:"Manager",
        };
    }


    loadPage(event){
        this.setState({loading:event})
        //    this.render()
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


    async  logout() {
        //מסך טעינה
        await auth.signOut();
        window.location.href = '/';
        //סיום מסך טעינה
    }



    render() {

        return (
            <div id="instructor" className="sec-design">
                 <div> שלום {this.state.user.displayName}</div>
                <button id="report-button" className="btn btn-info"onClick={()=>{
                    this.ChangePage("UserApproval")
                    return
                }} >אישור משתמשים<span
                    className="fa fa-arrow-right"></span></button>
                <button id="report-button" className="btn btn-info"onClick={()=> {
                    this.ChangePage("Updates")
                    return
                }} >עדכון ופעולות<span
                    className="fa fa-arrow-right"></span></button>

                <button id="report-button" className="btn btn-info" onClick={()=>{
                    this.ChangePage("Reports")
                    return
                }} >צפייה בדו"ח נוכחות<span
                    className="fa fa-arrow-right"></span></button>
                <button id="feedback-button" className="btn btn-info" onClick={()=>{
                    this.ChangePage("Feedbacks/Student")
                    return
                }} >צפייה במשובי חניכים<span
                    className="fa fa-arrow-right"></span></button>
                <button id="feedback-button" className="btn btn-info" onClick={()=>{
                    this.ChangePage("Feedbacks/Guide")
                    return
                }}>צפייה במשובי
                    מדריכים<span
                        className="fa fa-arrow-right"></span></button>
                <button id="report-button" className="btn btn-info" onClick={()=>{NextPage(this.props,"Profile",this.state.user)}} >עדכון פרטים או סיסמא<span
                        className="fa fa-arrow-right"></span></button>               
                <button id="logout" className="btn btn-info" >התנתק</button>
                <button onClick={() => this.loadTempPage("User")}>חזרה להמשך בדיקות דפים</button>
            </div>

        );
    }

    loadTempPage(path)
    {
        this.props.history.push({
            pathname: `/${path}`,
            data: this.state.user
        })
    }

    ChangePage(path) {

        this.props.history.push({
            pathname: `${this.props.location.pathname}/${path}`,
            data: this.state.user
        })

    }
    

}


export  default  TempManager;