import React from "react";
import firebase, {auth} from '../../../../firebase/firebase'



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

    loadTempPage(page)
    {
        this.props.history.push({
            pathname: `/${page}`,
            data: this.state.user // your data array of objects
        })
    }


    render() {

        if(this.state.user.email)
            console.log("this is email : "+this.state.user.email)
        return (
            <div id="instructor" className="sec-design">
                <div> Hello Manager {this.state.user.email}</div>

                    <button id="report-button" className="btn btn-info" >צפייה בדו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" className="btn btn-info" >צפייה במשובי חניכים<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="feedback-button" className="btn btn-info" >צפייה במשובי
                        מדריכים<span
                            className="fa fa-arrow-right"></span></button>
                    <button id="logout" className="btn btn-info" >התנתק</button>
                <button onClick={() => this.loadTempPage("User")}>חזרה להמשך בדיקות דפים</button>
            </div>
        );
    }


}


export  default  TempManager;