import React from 'react'
import Select from 'react-select'
import  { db,CreateUser, DeleteUser} from '../../../../firebase/firebase'
import Grid from "@material-ui/core/Grid";
import '../Guide/Guide.css';
import TempManager from "./TempManager";
import {BackPage} from "../UserPage";


const options = [
   ]


class UserApproval extends React.Component {
    constructor(props) {
        super(props);
        this.state = {

        };

    }




    async componentDidUpdate(prevProps, prevState, snapshot) {
        const collection = await db.collection('paintings').get()
        const usersList = [];
        collection.forEach(doc => {
            const data = doc.data();
            if (data)
                usersList.push(data)
        });
        let i;
        console.log(this.state.users)
        for (i=0;i<usersList.length;i++)
        {
            if(usersList[i].email!==this.state.users[i].email)
            {
                this.setState({users: usersList});
                return
            }
        }


    }


    async componentDidMount() {

        const collection = await db.collection('waitforapproval').get()
        const usersList = [];
        collection.forEach(doc => {
            const data = doc.data();
            if (data)
                usersList.push(data)
        });
        this.setState({users: usersList});


        var nameTeams =  await db.collection("Teams").get();
            nameTeams.forEach(doc=>{
                options.push({ value: doc.ref, label: doc.data().name })
            })

    }




    radio(e,index,user)
{

    var student = document.getElementById("students"+index)
    var guide = document.getElementById("guides"+index)
    var manager = document.getElementById("managers"+index)


    user.type = e.target.value;

    if(e.target === student) {
        student.checked=true;
        guide.checked=false;
        manager.checked=false;

    }
    else if(e.target === guide) {
        student.checked=false;
        guide.checked=true;
        manager.checked=false;

    }
    else {
        student.checked=false;
        guide.checked=false;
        manager.checked=true;
    }
}
render() {
        
    if(this.state.page ==='menu')
        return(
            <TempManager>

            </TempManager>
        )
        if(this.state.users) {
            if(this.state.users.length === 0)
            {
                return (
                    <div id="guideAttendReport" className="sec-design" dir="rtl">
                        <div id="name-group" className="form-group">
                            <Grid container spacing={2}>
                                <Grid item xs={12}>
                                    אין משתמשים חדשים
                                </Grid>
                            </Grid>
                            <Grid item xs={12}>
                                <button id="feedback-button" className="btn btn-info"  onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                            </Grid>
                        </div>
                    </div>
                )
            }
            return (
                <div id="guideAttendReport" className="sec-design" dir="rtl">
                    <div id="name-group" className="form-group">
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <Grid container
                                      direction="row"
                                      justify="space-between"
                                      alignItems="center"
                                      spacing={2}>

                                    {this.state.users.map((user,index) => (
                                        <Grid item xs={12} key={index}>
                                            {this.Card(user, index)}
                                        </Grid>
                                        )
                                    )}


                                </Grid>
                                <Grid item xs={12}>
                                    <div className="text-below-image">
                                        <button>אישור בקשות מסומנות</button>
                                    </div>
                                </Grid>
                                <Grid item xs={12}>
                                    <button id="feedback-button" className="btn btn-info"  onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                                </Grid>
                            </Grid>
                        </Grid>
                    </div>


                    {/*<button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout}}>חזרה לתפריט<span className="fa fa-arrow-right"></span></button>*/}


                </div>
            );
        }
        else
        {
           return (
               <div id="guideAttendReport" className="sec-design" dir="rtl">
                   <div id="name-group" className="form-group">
                       <Grid container spacing={2}>
                           <Grid item xs={12}>
                               טוען משתמשים
                           </Grid>
                       </Grid>
                   </div>
               </div>
           )
        }
}




    Card(user,index) {
            return (

                <div className="Card"  dir="rtl">
                    <Grid container spacing={1}>
                        <Grid item xs={12}>
                        <b>שם מלא: </b>  {user.fname + " " + user.lname}<br/>
                            <b> אימייל: </b> {user.email}<br/>
                            <b> טלפון: </b>{user.phone}<br/>
                            <b> תפקיד: </b>{(user.type==="students")?("חניך"):("מדריך")}<br/>
                            <b> קבוצה: </b>{user.teamName}<br/>
                            <Select  placeholder={" החלף קבוצה "} options={options} onChange={(e)=>{
                                user.team = e.value;
                                user.teamName = e.label;
                            }} />
                        </Grid>
                        <Grid item xs={12}>
                        <b> החלף תפקיד: </b><br/>
                        </Grid>
                        <Grid item xs={4}>

                            <div>
                                <label>
                                    <input id ={"students"+index} type="radio" value="students" onClick={e => {
                                        this.radio(e,index,user)
                                    }}/>
                                    חניך
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>

                                <label>
                                    <input id ={"guides"+index} type="radio" value="guides"  onClick={e => {
                                        this.radio(e,index,user)
                                    }}/>
                                    מדריך
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={4}>
                            <div>

                                <label>
                                    <input id ={"managers"+index} type="radio" value="managers"  onClick={e => {
                                        this.radio(e,index,user)
                                    }}/>
                                    מנהל
                                </label>
                            </div>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">
                                <label className="container">אישור בקשה<input type='checkbox' checked={user.approve} onChange={e=>{
                                    user.approve = e.target.checked
                                } }/></label>
                            </div>

                        </Grid>

                        <Grid item xs={6}>
                            <button
                                style={{backgroundColor: "rgb(50,248,6)"}}
                                onClick={()=>{
                                CreateUser(user).then(()=>{
                                var newUsers = []
                                this.state.users.forEach((user,i)=>{
                                 if(index!==i)
                                     newUsers.push(user)
                                })
                                this.setState({users:newUsers})
                                })
                            }}>אישור בקשה </button>
                        </Grid>
                        <Grid item xs={6}>
                            <button
                                style={{backgroundColor: "rgb(248,6,6)"}}
                                onClick={()=>{
                                DeleteUser(user.email).then(()=>{
                                    var newUsers = []
                                    this.state.users.forEach((user,i)=>{
                                        if(index!==i)
                                            newUsers.push(user)
                                    })
                                    this.setState({users:newUsers})
                                })
                            }}>דחיית בקשה</button>
                        </Grid>
                    </Grid>




                </div>
            );
    }

}

export  default  UserApproval;