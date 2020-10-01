import React from "react";
import firebase, {auth,db} from '../../../../firebase/firebase'
import Grid from "@material-ui/core/Grid";
import UserApproval from "./UserApproval";
import AttendReport from "./mngAttendReport"
import UpdatesFirebase from "./UpdatesFirebase";


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

    createUser(user)
    {
        console.log(user)
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
    chooseLayout(page)
    {
        this.setState({
            page:page,
        })
        this.render()
    }


    render() {
        // console.log(this.state.date)
        // if(this.state.user.email)
        //     console.log("this is email : "+this.state.user.email)
        if(this.state.page ==='feedback')
            return(this.GuideFeedback())
        else if(this.state.page === 'report')
            return(
                <AttendReport>
                </AttendReport>
            )
        else if(this.state.page ==='userApproval')
            return (
                <UserApproval>
                </UserApproval>


            )
        else if(this.state.page ==='update')
            return (
                <UpdatesFirebase>
                </UpdatesFirebase>


            )
        else
            return(this.menu())

        
    }

    menu() {

        // if(this.state.user.email)
        //     console.log("this is email : "+this.state.user.email)
        return (
            <div id="instructor" className="sec-design">
                {/* <div> Hello Manager {this.state.user.email}</div> */}
                    <button id="report-button" className="btn btn-info"onClick={()=>{this.chooseLayout("userApproval")}} >אישור משתמשים<span
                        className="fa fa-arrow-right"></span></button>
                <button id="report-button" className="btn btn-info"onClick={()=>{this.chooseLayout("update")}} >עדכון ופעולות<span
                        className="fa fa-arrow-right"></span></button>

                <button id="report-button" className="btn btn-info"onClick={()=>{this.chooseLayout("report")}} >צפייה בדו"ח נוכחות<span
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
    
    // async AttendReport(){
    //     return(
    //     <div id="instactorReport" class="sec-design">
    //     <Grid container spacing={2}>
    //         <Grid item xs={12}>
                
    //             <Grid item xs={12}>
    //                 <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
    //                 <input type="date" className="form-control" id="insert-date" name="date" required/>
    //                 <Select  placeholder={" בחר קבוצה "} options={options} onChange={(e)=>{
    //                     console.log(e.label,e.value);
                        
    //                 }} />

    //             </Grid>
    //             <Grid item xs={12}>
    //                 <div className="text-below-image">

    //                     <button >הצג</button>
    //                     <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזרה לתפריט</button>
    //                 </div>

    //             </Grid>
    //         </Grid>
    //     </Grid>
    // </div>
    // )
    // }
    Card(Student) {
        if (Student) {
            //console.log(Student)
                return (
                    <div className="Card"
                         style={
                             Student.approv?(
                             {
                                backgroundColor: "rgba(153, 255, 153, 0.7)"})://approv
                            ({
                                backgroundColor: "rgba(255, 102, 102, 0.7)",//not approv
                            })
                         }>



                        <Grid container spacing={1}>
                            <Grid item xs={12}>
                                <h4>{Student.data.fname + " " + Student.data.lname}</h4>
                            </Grid>
                            <Grid item xs={12}>
                                <b>:אימייל<div className="text">{Student.data.email}</div></b>
                            </Grid>
                            <Grid item xs={12}>
                                <div className="text-below-image">
                                    <label>הגעה <input type='checkbox' checked={Student.approv} onChange={()=>{this.approvStudent(Student)}}/></label>
                                </div>
                            </Grid>
                            
                            <Grid item xs={12}>
                                {
                                    (!Student.approv)?(<div></div>):(<div>
                                        <label>משוב על החניך </label>

                                        <input type='Textarea' value={Student.feedback} onChange={(e)=>{this.feedbackGuide(e,Student)}} required/>
                                    </div>)
                                }
                            </Grid>
                            <Grid item xs={6}>
                                <button onClick={()=>{this.saveStudentData(Student)}}>שמירת שינויים</button>
                            </Grid>
                        </Grid>




                    </div>
                );
        }
        else
        {
            return (
                <div></div>
            )
        }
    }

}


export  default  TempManager;