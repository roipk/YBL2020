import React from "react";
import  {auth} from '../../../firebase/firebase'
import {BackPage} from "./UserPage";



class Profile extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

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

    }



    render() {

        return (
            <div id="instructor" className="sec-design">
                {/* <div> Hello Manager {this.state.user.email}</div> */}
                <button id="report-button" className="btn btn-info"  onClick={() => {
                   auth.currentUser.updatePassword('1234').then(()=>{
                       alert("הקוד שונה בהצלחה")
                   })

                }}
                >עדכון פרטים<span
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