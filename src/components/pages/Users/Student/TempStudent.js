import React from "react";
import  {auth, signOut} from '../../../../firebase/firebase'
import {NextPage} from "../UserPage";


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



    render() {

        return (
            <div id="instructor" className="sec-design" dir="rtl">
                <h2> שלום {this.state.user.displayName} </h2>
                <form id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{NextPage(this.props,"Feedback",this.state.user)}}>מילוי משוב<span
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
                </form>
            </div>
        )
    }


}


export  default  TempStudent;