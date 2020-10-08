import React, { Component } from "react";
import {db,CreateNewTeam} from "../../../../firebase/firebase";
import Grid from "@material-ui/core/Grid";
import TempManager from "./TempManager";
import {BackPage} from "../UserPage";
import Select from "react-select";
var options = []
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
                replaceTeamName:false

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
                        <div className="text-below-image">

                            <button onClick={this.handleSubmit} >רשימת מדריכים</button>
                            <div></div>
                            <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                        </div>

                    </Grid>
                </Grid>
            </div>

        )
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

    attendReport() {

        return(
            <div id="instactorReport" className="sec-design" dir='rtl'>
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <input type="text" name="team" placeholder="שם קבוצה חדשה" onChange={this.handleChange}/>
                    </Grid>
                    <Grid item xs={6} >
                        <button onClick={()=>{CreateNewTeam(this.state.teamName)}}>צור קבוצה חדשה</button>
                    </Grid>
                    <Grid item xs={6}>
                        <button onClick={()=>{
                        if(this.state.teamName && this.state.teamName.length > 0)
                            this.setState({replaceTeamName:true})
                        else
                            alert("שם הקבוצה החדשה לא יכול להיות ריק")
                        }}>החלף שם לקבוצה קיימת </button>
                    </Grid>
                    <Grid item xs={8} hidden={!this.state.replaceTeamName}>
                    <Select  placeholder={" בחר קבוצה להחלפת שם "} options={options} onChange={(e)=>{
                            console.log(e.label,e.value);
                            this.setState({teamPath:e.value})
                        }} required/>

                    </Grid>
                    <Grid item xs={4} hidden={!this.state.replaceTeamName} >
                        <button onClick={()=>{
                            console.log("בוצעה החלפה")
                            this.setState({replaceTeamName:false})
                        }}>אישור החלפה</button>
                    </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">

                                <button onClick={this.handleSubmit} >רשימת מדריכים</button>
                                <div></div>
                                <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                            </div>

                        </Grid>
                </Grid>
            </div>

        )
    }
}



export default UpdatesFirebase;
