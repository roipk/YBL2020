import React from "react";
import  {auth} from '../../../../firebase/firebase'



class Manager extends React.Component {
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
        console.log("work")
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

        if(this.state.user.email)
            console.log("this is email : "+this.state.user.email)
        return (
            <div id="instructor" className="sec-design">
                <div> Hello Manager {this.state.user.email}</div>
                <form id="Manager" className="form-design" name="student_form">
                    <button id="report-button" className="btn btn-info" >צפייה בדו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" className="btn btn-info" >צפייה במשובי חניכים<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" className="btn btn-info" >צפייה במשובי
                        מדריכים<span
                            className="fa fa-arrow-right"></span></button>
                    <button id="go-back" className="btn btn-info" >התנתק</button>
                </form>
            </div>
        );
    }


}


export  default  Manager;