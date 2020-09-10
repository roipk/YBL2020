import React, { Component } from "react";
import firebase from "../../../../firebase/firebase";

class Users extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                isLoaded:false,

            }
    }



    // componentDidMount() {
    //     const {id} = this.props?.match?.params || ''
    //     let currentComponent = this;
    //     currentComponent.setState({isLoaded:false,error:false})
    //     const docRef = firebase.firestore().collection("GameList").doc(id); // get game data from firebase
    //     docRef.get().then(function(doc) {
    //         if (doc.exists) {
    //             currentComponent.setState({game:doc.data(),isLoaded:true})
    //         } else {
    //             currentComponent.setState({error:"No such Game!"})
    //         }
    //     }).catch(function(error) {
    //         currentComponent.setState({error:"Internal Error"})
    //         console.log("Error getting document:", error);
    //     });
    // }


    render() {
        // attendReport();
        return(
            <div>
                <h2>hello  </h2>
                    <div id="attendreport" className="sec-design">

                        <form id="student_form" className="form-design" name="student_form">

                            <div id="name-group" className="form-group">
                                <label id="insert-student" className="title-input" htmlFor="name">בחר את תאריך
                                    המפגש: </label>
                                <input type="date" className="form-control" id="insert-date" name="insert-date"
                                       required/>

                            </div>

                            <div id="name-group" className="form-group">
                                <label id="insert-name" className="title-input" htmlFor="name"> הזן את שם
                                    המדריך:</label>
                                <input type="text" className="form-control" name="instName" id="instName"
                                       placeholder="Name" minLength="2" required/>
                            </div>


                            <button type="submit" id="confirm-form" className="btn btn-info"
                                    onClick="studentFeedback()">המשך
                                {/*<spanclass="fa fa-arrow-right"></span>*/}
                            </button>
                            <button id="go-back" className="btn btn-info" onClick="studLoadMenu()">חזור</button>
                        </form>

            </div>
            </div>


        )
    }
}


// function attendReport() {
//     console.log(this.state.today)
//         // var dd = this.today.getDate();
//         // var mm = this.today.getMonth() + 1; //January is 0!
//         // var yyyy = this.today.getFullYear();
//         // if (dd < 10) {
//         //     dd = '0' + dd
//         // }
//         // if (mm < 10) {
//         //     mm = '0' + mm
//         // }
//         // this.today = yyyy + '-' + mm + '-' + dd;
// //     max={this.today}
// }



export default Users;
