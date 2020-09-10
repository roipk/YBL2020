import React from "react";
import firebase, {auth} from '../../../../firebase/firebase'



class Student extends React.Component {
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
            <div>
                <h2> Hello Student {this.state.user.email} </h2>
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


                        <button type="submit" id="confirm-form" className="btn btn-info">המשך
                            {/*<spanclass="fa fa-arrow-right"></span>*/}
                        </button>
                        <button id="go-back" className="btn btn-info" >חזור</button>
                    </form>

                </div>
            </div>
        );
    }


}


export  default  Student;