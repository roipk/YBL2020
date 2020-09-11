import React from "react";
import firebase, {auth} from '../../../../firebase/firebase'



class TempStudent extends React.Component {
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

    chooseLayout(page)
    {
        this.setState({
            page:page,
        })
        this.render()
    }


    render() {
        if(this.state.user.email)
            console.log("this is email : "+this.state.user.email)
        if(this.state.page ==='feedback')
            return(this.StudentFeedback())
        else
            return(this.menu())
    }

    menu() {
        if(this.state.user.email)
            console.log("this is email : "+this.state.user.email)
        return (
            <div>
                <h2> Hello Student {this.state.user.email} </h2>
                <div id="attendreport" className="sec-design">

                    <form id="student_form" className="form-design" name="student_form">

                        <div id="name-group" className="form-group">
                            <label id="insert-student" className="title-input" htmlFor="name">בחר את תאריך המפגש </label>
                            <input type="date" className="form-control" id="insert-date" name="insert-date"
                                   required/>
                        </div>

                        <div id="name-group" className="form-group">
                            <label id="insert-name" className="title-input" htmlFor="name"> הזן את שם המדריך</label>
                            <input type="text" className="form-control" name="instName" id="instName"
                                   placeholder="Name" minLength="2" required/>
                        </div>
                        
                        <button type="submit" id="confirm-form" className="btn btn-info"  onClick={()=>{this.chooseLayout('feedback')}}>המשך</button>
                        <button id="logout" className="btn btn-info" onClick={this.logout}>התנתק</button>
                    </form>


                </div>
            </div>
        );
    }
    StudentFeedback(){
        return(
            <div id="student_feedback" class="sec-design">
                <form id="student_feed" class="form-design" name="student_feed">
                    <div id="topic" class="form-group">
                        <label id="insert-topic" class="title-input" for="name"> באיזה נושא המפגש עסק:</label>
                        <input type="text" class="form-control" name="subject" id="subject" placeholder="Your Answer" minlength="5" required/>
                    </div>
                    <div id ="box" class="chekbox" onSubmit="return checkRadio()">
                        <label id="checkbox" class="title-input" for="name"> באיזה מידה המפגש היום חידש לך/למדת דברים חדשים</label>
                        <br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <label>במידה מועטה<input type="radio" value="1"/></label>
                            <label>במידה בינונית<input type="radio" value="2"/></label>
                            <label>במידה רבה<input type="radio" value="3"/></label>
                        </form><br/>
                        <label id="checkbox" class="title-input" for="name"> באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד</label>
                        <br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <label>במידה מועטה<input type="radio" value="1"/></label>
                            <label>במידה בינונית<input type="radio" value="2"/></label>
                            <label>במידה רבה<input type="radio"  value="3"/></label>
                        </form><br/>
                        <label id="checkbox" class="title-input" for="name"> באיזה מידה נושא המפגש היה רלוונטי עבורך</label>
                        <br/>
                        <form name="form1" class="chekbox" onSubmit="return checkRadio()">
                            <label>במידה מועטה<input type="radio" value="1"/></label>
                            <label>במידה בינונית<input type="radio" value="2"/></label>
                            <label>במידה רבה<input type="radio" value="3"/></label>
                        </form><br/>
                        <div id="name-group" class="form-group">
                            <label id="feedback" class="title-input" for="name"> מה את/ה לוקח/ת מהמפגש היום</label>
                            <input type="text" class="form-control" name="Q4" id="Q4" placeholder="Your Answer" minlength="10" required/>
                        </div>
                    </div>
                    <button type="submit" id="confirm-form" className="btn btn-info" >דווח נוכחות ושלח משוב</button>
                    <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור</button>
                </form>
            </div>
                    
        )
    }


}


export  default  TempStudent;