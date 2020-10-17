import React, { Component } from "react";
import {db, CreateNewTeam, auth, getUser} from "../../../../firebase/firebase";
import Grid from "@material-ui/core/Grid";
import {BackPage} from "../UserPage";
import Select from "react-select";
import ClipLoader from "react-spinners/ClipLoader";


var options = []
var guidesOptions = []
var studentsOptions = []
var emptyGuidesOptions = []
var emptyStudentsOptions = []
var emptyTeamOptions = []
var TeamOptions = []
class UpdatesFirebase extends Component {

    constructor(props) {
        super(props);

        this.state =
            {
                spinner: true,
                isLoaded:false,
                date:"",
                newTeamName:'',
                teamPath:"",
                teamName:"",
                replaceTeamName:false,
                delete:false,
                showGuides:false,
                showStudents:false,
                showTeamWithoutGuide:false,
                showGuideWithoutTeam:false,
                showStudentWithoutTeam:false,
            }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    loadSpinner(event){
        this.setState({spinner:event})
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
                {!this.state.spinner ? "" :
                    <div id='fr'>
                        אנא המתן/י הפעולה מתבצעת
                        <div className="sweet-loading">
                            <ClipLoader style={{
                                backgroundColor: "rgba(255,255,255,0.85)",
                                borderRadius: "25px"
                            }}
                                //   css={override}
                                        size={120}
                                        color={"#123abc"}

                            />
                        </div>
                    </div>
                }
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
                               var d = await db.doc(this.state.teamPath).get()
                                if(d.data().guide) {
                                    console.log("team on guide remove")
                                    await d.data().guide.update({
                                        team: null,
                                        teamName: null
                                    })
                                }
                               var studs = await  db.collection("students").where('teamName','==',this.state.teamName).get()
                                    studs.docs.forEach(async student=>{
                                        student.ref.update({
                                            teamName: null,
                                            team:null
                                        })
                                    })

                                var guide = await  db.collection("guides").where('teamName','==',this.state.teamName).get()
                                guide.docs.forEach(async student=>{
                                    guide.ref.update({
                                        teamName: null,
                                        team:null
                                    })
                                })

                               await db.doc(this.state.teamPath).delete().then(function() {
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
                                    this.setState({showGuides:!this.state.showGuides,guideTeamName:null,guideName:null})

                            }} >{this.state.showGuides?'הסתר רשימת מדריכים':'הצג רשימת מדריכים'}</button>
                            {
                                (this.state.showGuides && this.state.Guides )?(<div> נמצאו: {this.state.Guides.length} מדריכים
                                    <Select  placeholder={" מצא מדריך "} options={guidesOptions} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({Guides:[e.value]})
                                    }} />
                                </div>):('')
                            }
                            {
                                (!this.state.Guides || !this.state.showGuides)?'':
                                    this.state.Guides.map((Guide,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.card(Guide.data(),index)}
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
                                (this.state.showStudents && this.state.Students )?<div> נמצאו: {this.state.Students.length} חניכים </div>:''
                            }
                            {
                                (this.state.showStudents && this.state.Students )?(
                                    <Select  placeholder={" מצא חניך "} options={studentsOptions} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({Students:e.value})
                                    }} />
                                ):('')
                            }
                            {
                                (!this.state.Students || !this.state.showStudents)?'':
                                    this.state.Students.map((Student,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.card(Student.data(),index)}
                                        </Grid >
                                    ))


                            }
                        </div>
                    </Grid>
                    <Grid item xs={12}>
                        <div className="text-below-image">
                            <button onClick={async ()=>{
                                await this.getAllUsers('studentEmpty')
                                await this.getAllUsers('Teams')
                                this.setState({showStudentWithoutTeam:!this.state.showStudentWithoutTeam})
                            }} >{this.state.showStudentWithoutTeam?'הסתר רשימת חניכים ללא קבוצה':'הצג רשימת חניכים ללא קבוצה'}</button>
                            {
                                (this.state.showStudentWithoutTeam && this.state.StudentEmpty )?(<div> נמצאו: {this.state.StudentEmpty.length} חניכים
                                    <Select  placeholder={" מצא חניך "} options={emptyStudentsOptions} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({StudentEmpty:[e.value]})
                                    }} />
                                </div>):('')
                            }
                            {
                                (!this.state.StudentEmpty || !this.state.showStudentWithoutTeam)?'':
                                    this.state.StudentEmpty.map((user,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.card(user.data(),index)}
                                        </Grid >
                                    ))


                            }
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div className="text-below-image">
                            <button onClick={async ()=>{
                                await this.getAllUsers('guidesEmpty')
                                await this.getAllUsers('teamEmpty')
                                this.setState({showGuideWithoutTeam:!this.state.showGuideWithoutTeam})
                            }} >{this.state.showGuideWithoutTeam?'הסתר רשימת מדריכים ללא קבוצה':'הצג רשימת מדריכים ללא קבוצה'}</button>
                            {
                                (this.state.showGuideWithoutTeam && this.state.GuidesEmpty )?(<div> נמצאו: {this.state.GuidesEmpty.length} מדריכים
                                    <Select  placeholder={" מצא מדריך "} options={emptyGuidesOptions} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({GuidesEmpty:[e.value]})
                                    }} />
                                </div>):('')
                            }
                            {
                                (!this.state.GuidesEmpty || !this.state.showGuideWithoutTeam)?'':
                                    this.state.GuidesEmpty.map((Guide,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.card(Guide.data(),index)}
                                        </Grid >
                                    ))


                            }
                        </div>

                    </Grid>
                    <Grid item xs={12}>
                        <div className="text-below-image">
                            <button onClick={async ()=>{
                                await this.getAllUsers('guidesEmpty')
                                await this.getAllUsers('teamEmpty')
                                this.setState({showTeamWithoutGuide:!this.state.showTeamWithoutGuide})
                            }} >{this.state.showTeamWithoutGuide?'הסתר רשימת קבוצות ללא מדריך':'הצג רשימת קבוצות ללא מדריך'}</button>
                            {
                                (this.state.showTeamWithoutGuide && this.state.TeamEmpty )?(<div> נמצאו: {this.state.TeamEmpty.length} קבוצות
                                    <Select  placeholder={" מצא קבוצה "} options={emptyTeamOptions} onChange={(e)=>{
                                        console.log(e.label,e.value);
                                        this.setState({TeamEmpty:[e.value]})
                                    }} />
                                </div>):('')
                            }
                            {
                                (!this.state.TeamEmpty || !this.state.showTeamWithoutGuide)?'':
                                    this.state.TeamEmpty.map((Team,index) => (
                                        <Grid  item xs={12}  key={index}>
                                            <hr/>
                                            {this.teamCard(Team.data())}
                                        </Grid >
                                    ))


                            }
                        </div>

                    </Grid>





                    <Grid item xs={12}>
                        <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                    </Grid>


                </Grid>



            </div>

        )
    }




    async getAllUsers(user) {
        this.loadSpinner(true)

        if ((user === 'guides' && this.state.Guides && this.state.Guides > 1) ||
            (user === 'students' && this.state.Students && this.state.Students > 1) ||
            (user === 'guidesEmpty' && this.state.GuidesEmpty && this.state.GuidesEmpty > 1) ||
            (user === 'studentEmpty' && this.state.StudentEmpty && this.state.StudentEmpty > 1) ||
            (user === 'teamEmpty' && this.state.TeamEmpty && this.state.TeamEmpty > 1) ||
            (user === 'Teams' && this.state.Teams && this.state.Teams > 1)) {
            this.loadSpinner(false)
            return
        }
        console.log(user)
        var temp = user
        if (user === 'guides')
            guidesOptions = []
        else if (user === 'guidesEmpty') {
            emptyGuidesOptions = []
            temp = 'guides'
        } else if (user === 'studentEmpty') {
            emptyStudentsOptions = []
            temp = 'students'
        } else if (user === 'teamEmpty') {
            emptyTeamOptions = []
            temp = 'Teams'
        } else if (user === 'Teams') {
            TeamOptions = []
            temp = 'Teams'
        } else if (user === 'students')
            studentsOptions = []
        var allUsers = []
        await db.collection(temp).get().then(res => {
            res.forEach(res => {
                if (res.data().uid) {
                    if (user === 'students') {
                        allUsers.push(res)
                        studentsOptions.push({value: res, label: res.data().fname + ' ' + res.data().lname})

                    } else if (user === 'guides') {
                        allUsers.push(res)
                        guidesOptions.push({value: res, label: res.data().fname + ' ' + res.data().lname})

                    } else if (user === 'guidesEmpty' && !res.data().team) {
                        allUsers.push(res)
                        emptyGuidesOptions.push({value: res, label: res.data().fname + ' ' + res.data().lname})
                    } else if (user === 'studentEmpty' && !res.data().teamName) {
                        allUsers.push(res)
                        emptyStudentsOptions.push({value: res, label: res.data().fname + ' ' + res.data().lname})
                    }
                } else if (user === 'teamEmpty' && !res.data().guide) {
                    allUsers.push(res)
                    emptyTeamOptions.push({value: res, label: res.name})

                } else if (user === 'Teams' && res.data().guide) {
                    allUsers.push(res)
                    TeamOptions.push({value: res, label: res.name})
                }
            })
        })
        if (user === 'guides')
            this.setState({Guides: allUsers})
        else if (user === 'students')
            this.setState({Students: allUsers})
        else if (user === 'guidesEmpty')
            this.setState({GuidesEmpty: allUsers})
        else if (user === 'studentEmpty')
            this.setState({StudentEmpty: allUsers})
        else if (user === 'teamEmpty')
            this.setState({TeamEmpty: allUsers})
        else if (user === 'Teams') {
            this.setState({Teams: allUsers})
        }

        this.loadSpinner(false)
        console.log(allUsers)
    }


    async handleSubmit(event)
    {
        this.loadSpinner(true)
        console.log(this.state.teamPath)
        if(!this.state.date) {
            return;
        }
        console.log("in");
        var team = await db.collection("Teams").doc(this.state.teamPath).get();
        console.log(team)
        this.loadSpinner(false)
    }
    async componentDidMount() {
        auth.onAuthStateChanged(async user=>{
            if(user)
            {
                var type = await getUser(user)
                console.log(type)
                if(type)
                {
                    this.setState({
                        isLoad: true,
                        user: user,
                        type: type
                    })
                    if(type!=='Tester')
                        this.loadUser(type)
                }
                else{
                    alert('המנהל עדיין לא אישר את הבקשה')
                    window.location.href = '/Login';
                    return
                }
                // console.log(tester.exists)
                // console.log(user)
                console.log("change user")
                // this.setState({
                //     isLoad:true,
                //     user:user,
                // })

            }
            else {
                this.setState({
                    isLoad: true,
                })
                window.location.href = '/Login';
                return;

            }
            this.loadSpinner(false)
            this.render()
        })
        this.loadSpinner(true)
        var nameTeams =  await db.collection("Teams").get();
        nameTeams.forEach(doc=>{
            options.push({ value: doc.ref, label: doc.data().name })
        })
        this.loadSpinner(false)
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

    teamCard(team)
    {
        return(
            <div id="name-group" className="form-group" dir="rtl">
                <div className="report" id="report">
                    <div>
                        <h4> שם קבוצה: {team.name} </h4>
                        <Grid container spacing={2}>
                            <Grid item xs={8}>
                                <Select  placeholder={" שיבוץ מדריך "} options={emptyGuidesOptions} onChange={(e)=>{
                                    console.log(e.label,e.value);
                                    this.setState({emtpyGuideTeamPath:e.value,emtpyguideTeamName:e.label})
                                }} />
                            </Grid>
                            <Grid item xs={4} hidden={!this.state.emtpyGuideTeamPath}>


                            </Grid>
                        </Grid>
                    </div>
                </div>
            </div>
        )
    }

    card(user,index)
    {
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
                            user.options = e.label
                            var teamPath = this.state.guideTeamPath
                            var teamName = this.state.guideTeamName
                            if(teamPath && teamName) {
                                if (index < teamPath.length) {
                                    teamPath[index] = e.value
                                    teamName[index] = e.label
                                }
                                else
                                {
                                    teamPath.push(e.value)
                                    teamName.push(e.label)
                                }
                            }
                            else
                            {
                                teamPath = [e.value]
                                teamName = [e.label]

                            }
                            this.setState({guideTeamPath:teamPath,guideTeamName:teamName})
                        }} />
                        </Grid>
                        <Grid item xs={4} hidden={!this.state.guideTeamName || this.state.guideTeamName.length <= index  || this.state.guideTeamName[index] === user.teamName}>
                        <button onClick={async ()=>{

                            if(user.type==='guides' || user.type==='testers') {
                                var updateTeam = await db.collection('guides').doc(user.uid)
                                await updateTeam.update({
                                    teamName:this.state.guideTeamName[index],
                                    team:this.state.guideTeamPath[index]
                                })
                                var oldGuide = await db.collection('Teams').doc(this.state.guideTeamPath.id).get()
                                try{
                                    await db.doc((oldGuide.data().guide).path).update({
                                        teamName:null,
                                        team:null
                                    })

                                }
                                catch(e){
                                    console.log(e)
                                }
                                try{
                                    await db.collection('Teams').doc(user.team.id).update({
                                        guide: null
                                    })
                                }
                                catch{
                                    console.log("למדריך לא הייתה קבוצה לפני")
                                }
                                await db.collection('Teams').doc(this.state.guideTeamPath.id).update({
                                    guide: updateTeam
                                })
                                this.getAllUsers('guides')
                            }
                            else
                            {
                                var updateTeam = await db.collection('students').doc(user.uid)
                                updateTeam.update({
                                    teamName:this.state.guideTeamName[index],
                                    team:this.state.guideTeamPath[index]
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


    loadUser(page)
    {
        this.props.history.push({
            // pathname: `/${page}/${this.state.user.id}`,
            pathname: `/Temp${page}`,
            data: this.state.user // your data array of objects
        })
    }
}



export default UpdatesFirebase;
