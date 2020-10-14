import React, { Component } from "react";
import {db,CreateNewTeam} from "../../../../firebase/firebase";
import Grid from "@material-ui/core/Grid";
import {BackPage} from "../UserPage";
import Select from "react-select";
var options = []
var guidesOptions = []
var studentsOptions = []
class UpdatesFirebase extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                isLoaded:false,
                date:"",
                newTeamName:'',
                teamPath:"",
                teamName:"",
                replaceTeamName:false,
                delete:false,
                showGuides:false,
                showStudents:false

            }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(event)
    {

        var value = event.target.value;
        if(value === '')
            this.setState({newTeamName:value,replaceTeamName:false})
        else
            this.setState({newTeamName:value})
    }
    async deleteTeam(){


    }

    render() {
        return(
            <div id="instactorReport" className="sec-design" dir='rtl'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <input type="text" name="team" placeholder="שם קבוצה חדשה" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={6} >
                        <button onClick={()=>{
                            CreateNewTeam(this.state.newTeamName)
                            alert("הקבוצה נוספה בהצלחה")
                            window.location.reload(true);}}>צור קבוצה חדשה</button>
                    </Grid>
                    <Grid item xs={6}>
                        <button onClick={()=>{
                            if(this.state.newTeamName && this.state.newTeamName.length > 0)
                                this.setState({replaceTeamName:true})
                            else
                                alert("שם הקבוצה החדשה לא יכול להיות ריק")
                        }}>החלף שם לקבוצה קיימת </button>
                    </Grid>
                    <Grid item xs={8} hidden={!this.state.replaceTeamName}>
                        <Select  placeholder={" בחר קבוצה להחלפת שם "} options={options} onChange={(e)=>{
                            console.log(e.label,e.value);
                            this.setState({teamPath:e.value,teamName:e.label})
                        }} required/>
                    </Grid>
                    <Grid item xs={4} hidden={!this.state.replaceTeamName} >
                        <button onClick={async ()=>{

                            if(this.state.teamName !== this.state.newTeamName) {
                                await this.setState({replaceTeamName: false})
                                this.state.teamPath.update({
                                    name:this.state.newTeamName
                                })
                                alert('בוצע שינוי שם  קבוצה בהצלחה')
                                window.location.reload(true);

                            }
                            else
                            {
                                console.log("שם זהה לא ניתן לשנות")
                            }
                        }}>אישור החלפה</button>
                    </Grid>
                    <Grid item xs={12}>
                        <button onClick={()=>{
                            this.setState({delete:!this.state.delete})
                            this.deleteTeam()
                        }}>{this.state.delete?'הסתר מחיקת קבוצה':'הצג מחיקת קבוצה'} </button>
                    </Grid>
                    <Grid item xs={8} hidden={!this.state.delete}>
                        <Select  placeholder={" בחר קבוצה "} options={options} onChange={(e)=>{
                            console.log(e.label,e.value);
                            this.setState({teamPath:(e.value).path,teamName:e.label})
                        }} required/>
                    </Grid>
                    <Grid item xs={4} hidden={!this.state.delete} >
                        <button onClick={async ()=>{
                            console.log(this.state.teamPath)
                            if(this.state.teamPath) {
                                await this.setState({delete: false})
                                db.doc(this.state.teamPath).delete().then(function() {
                                    console.log("הקבוצה נמחקה בהצלחה!");
                                }).catch(function(error) {
                                    console.error("Error removing document: ", error);
                                });
                                window.location.reload(true);

                            }
                            else
                            {
                                console.log("בחר קבוצה")
                            }
                        }}>מחק</button>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="text-below-image">
                            <button onClick={()=>{
                                this.getAllUsers('guides')
                                this.setState({showGuides:!this.state.showGuides})
                            }} >{this.state.showGuides?'הסתר רשימת מדריכים':'הצג רשימת מדריכים'}</button>
                            {
                                (this.state.showGuides && this.state.Guides )?(<div> נמצאו: {this.state.Guides.length} מדריכים
                                    <Select  placeholder={" מצא מדריך "} options={guidesOptions} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({Guides:[e.value]})
                                    }} />
                                </div>):(<div></div>)
                            }
                            {
                                (!this.state.Guides || !this.state.showGuides)?<div></div>:
                                    this.state.Guides.map((Guide,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.card(Guide.data())}
                                        </Grid >
                                    ))


                            }
                        </div>

                    </Grid>

                    <Grid item xs={12}>
                        <div className="text-below-image">
                            <button onClick={()=>{
                                this.getAllUsers('students')
                                this.setState({showStudents:!this.state.showStudents})
                            }} >{this.state.showStudents?'הסתר רשימת חניכים':'הצג רשימת חניכים'}</button>
                            {
                                (this.state.showStudents && this.state.Students )?<div> נמצאו: {this.state.Students.length} חניכים </div>:<div></div>
                            }
                            {
                                (this.state.showStudents && this.state.Students )?(
                                    <Select  placeholder={" מצא חניך "} options={options} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({Students:e.value})
                                    }} />
                                ):(<div></div>)
                            }
                            {
                                (!this.state.Students || !this.state.showStudents)?<div></div>:
                                    this.state.Students.map((Student,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.card(Student.data())}
                                        </Grid >
                                    ))


                            }
                        </div>
                        <Grid item xs={12}>
                            <button id="feedback-button" className="btn btn-info" onClick={()=>{

                            }}>הצג קבוצות ללא מדריך</button>
                        </Grid>
                        <Grid item xs={12}>
                            <button id="feedback-button" className="btn btn-info" onClick={()=>{

                            }}>הצג מדריכים ללא קבוצה</button>
                        </Grid>
                    <Grid item xs={12}>
                        <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                    </Grid>
                    </Grid>


                </Grid>



            </div>

        )
    }


    async getAllUsers(user)
    {
        if((user === 'guides' && this.state.Guides && this.state.Guides > 1 )||(user === 'students' && this.state.Students && this.state.Students > 1))
            return

        if(user === 'guides')
            guidesOptions=[]
        else if(user === 'students')
            studentsOptions=[]
        var allUsers = []
        await db.collection(user).get().then(res=>{
            res.forEach(res=>{
                if(res.data().uid) {
                    allUsers.push(res)
                    if(user === 'guides')
                        guidesOptions.push({ value: res, label: res.data().fname+''+res.data().lname })
                    else if(user === 'students')
                        studentsOptions.push({ value: res, label: res.data().fname+''+res.data().lname })
                }
            })
        })
        if(user === 'guides')
            this.setState({Guides:allUsers})
        else if(user === 'students')
            this.setState({Students:allUsers})

        console.log(guidesOptions)
    }


    async handleSubmit(event)
    {
        console.log(this.state.teamPath)
        if(!this.state.date) {
            return;
        }
        console.log("in");
        var team = await db.collection("Teams").doc(this.state.teamPath).get();
        console.log(team)
    }
    async componentDidMount() {
        var nameTeams =  await db.collection("Teams").get();
        nameTeams.forEach(doc=>{
            options.push({ value: doc.ref, label: doc.data().name })
        })
    }
    async handleChangeDate(event)
    {
        var name = event.target.name;
        var value = event.target.value;
        if(name === 'date')
        {
            this.setState({date:value,viewStudent:false});
            this.state.date=value
        }
    }


    card(user)
    {
        console.log(user)
        return(
            <div id="name-group" className="form-group" dir="rtl">
                <div className="report" id="report">
                    <div>

                        <h4> שם: {user.fname+' '+ user.lname} </h4>
                        <h4> טלפון: {user.phone}</h4>
                        <h4> אימייל: {user.email}</h4>
                        <h4> קבוצה: {user.teamName}</h4>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                        <Select  placeholder={" החלף קבוצה "} options={options} onChange={(e)=>{
                            console.log(e.label,e.value);
                            this.setState({guideTeamPath:e.value,guideTeamName:e.label})
                        }} />
                        </Grid>
                        <Grid item xs={4} hidden={!this.state.guideTeamName}>
                        <button onClick={async ()=>{


                            if(user.type==='guides') {
                                var updateTeam = await db.collection('guides').doc(user.uid)
                                updateTeam.update({
                                    teamName:this.state.guideTeamName,
                                    team:this.state.guideTeamPath
                                })

                                await db.collection('Teams').doc(this.state.guideTeamPath.id).update({
                                    teamName:null,
                                    team:null
                                })
                                await db.collection('Teams').doc(user.team.id).update({
                                    guide: null
                                })
                                await db.collection('Teams').doc(this.state.guideTeamPath.id).update({
                                    guide: updateTeam
                                })
                                this.getAllUsers('guides')
                            }
                            else
                            {
                                var updateTeam = await db.collection('students').doc(user.uid)
                                updateTeam.update({
                                    teamName:this.state.guideTeamName,
                                    team:this.state.guideTeamPath
                                })
                                this.getAllUsers('students')
                            }
                            alert('הוחלפה קבוצה')
                        }}>החלף</button>
                        </Grid>
                        </Grid>
                    </div>
                </div>
            </div>

        )
    }


    // attendReport() {
    //
    //     return(
    //         <div id="instactorReport" className="sec-design" dir='rtl'>
    //             <Grid container spacing={2}>
    //                 <Grid item xs={12}>
    //                     <input type="text" name="team" placeholder="שם קבוצה חדשה" onChange={this.handleChange}/>
    //                 </Grid>
    //                 <Grid item xs={6} >
    //                     <button onClick={()=>{CreateNewTeam(this.state.teamName)}}>צור קבוצה חדשה</button>
    //                 </Grid>
    //                 <Grid item xs={6}>
    //                     <button onClick={()=>{
    //                     if(this.state.teamName && this.state.teamName.length > 0)
    //                         this.setState({replaceTeamName:true})
    //                     else
    //                         alert("שם הקבוצה החדשה לא יכול להיות ריק")
    //                     }}>החלף שם לקבוצה קיימת </button>
    //                 </Grid>
    //                 <Grid item xs={8} hidden={!this.state.replaceTeamName}>
    //                 <Select  placeholder={" בחר קבוצה להחלפת שם "} options={options} onChange={(e)=>{
    //                         console.log(e.label,e.value);
    //                         this.setState({teamPath:e.value})
    //                     }} required/>
    //
    //                 </Grid>
    //                 <Grid item xs={4} hidden={!this.state.replaceTeamName} >
    //                     <button onClick={()=>{
    //                         console.log("בוצעה החלפה")
    //                         this.setState({replaceTeamName:false})
    //                     }}>אישור החלפה</button>
    //                 </Grid>
    //                     <Grid item xs={12}>
    //                         <div className="text-below-image">
    //
    //                             <button onClick={this.handleSubmit} >רשימת מדריכים</button>
    //                             <div></div>
    //                             <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
    //                         </div>
    //
    //                     </Grid>
    //             </Grid>
    //         </div>
    //
    //     )
    // }
}



export default UpdatesFirebase;
