import React, { Component } from "react";
import firebase ,{db,CreateNewTeam} from "../../../../firebase/firebase";
import Select from 'react-select'
import Grid from "@material-ui/core/Grid";
import TempManager from "./TempManager";
import { ContactSupport } from "@material-ui/icons";
var options = []
class UpdatesFirebase extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,
                date:"",
                teamPath:"",
                teamName:"",
            }
        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChangeDate = this.handleChangeDate.bind(this)
        this.handleChange = this.handleChange.bind(this)
    }

    async handleChange(event)
    {

        var value = event.target.value;
        this.setState({teamName:value})
    }

    BackPage()
    {
        this.props.history.push({
            pathname: `./`,
            // this.chooseLayout("userApproval")
        })
    }

    render() {
        console.log(this.state.date)
        if(this.state.page ==='menu')
            return(
                <TempManager>

                </TempManager>
            )

        else
            return(this.attendReport())


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
            <div id="instactorReport" className="sec-design">
                <Grid container spacing={2}>
                    <Grid item xs={4}>
                        <button onClick={()=>{CreateNewTeam(this.state.teamName)}}>צור קבוצה</button>
                    </Grid>
                    <Grid item xs={8}>
                            <input type="text" name="team" placeholder="שם קבוצה חדשה" onChange={this.handleChange}/>
                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">

                                <button onClick={this.handleSubmit} >רשימת מדריכים</button>
                                <div></div>
                                <button id="feedback-button" className="btn btn-info" onClick={()=>{this.BackPage()}}>חזרה לתפריט</button>
                            </div>

                        </Grid>
                </Grid>
            </div>

        )
    }
}



export default UpdatesFirebase;
