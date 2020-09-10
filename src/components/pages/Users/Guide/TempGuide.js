import React from "react";
import firebase, {auth} from '../../../../firebase/firebase'



class TestGuide extends React.Component {
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
                <h2>Hello Guide {this.state.user.email} </h2>
                <form id="instructor_menu" className="form-design" name="student_form" method="POST">
                    <button id="feedback-button" className="btn btn-info" >אישור דו"ח נוכחות<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="report-button" className="btn btn-info" >מילוי משוב<span
                        className="fa fa-arrow-right"></span></button>
                    <button id="go-back" className="btn btn-info" >התנתק</button>
                </form>
            </div>
        );
    }


}


export  default  TestGuide;