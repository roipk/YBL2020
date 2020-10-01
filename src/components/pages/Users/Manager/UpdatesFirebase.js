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
    chooseLayout(page)
    {
        this.setState({
            page:page,
        })
        this.render()
    }
    async handleChange(event)
    {

        var value = event.target.value;
        this.setState({teamName:value})
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
        // const collection = await db.collection('students').where("Team","==",team).get()
        // const Students = [];
        // const date = this.state.date
        // const collectionPromisesTeam = collection.docs.map( async function(doc) {
        //      var ref =await db.collection("students").doc(doc.id).collection("comes").doc(date).get()
        //      var user = await db.collection("students").doc(doc.id).get()
        //     return [ref,user]

        // })

        // Promise.all(collectionPromisesTeam).then(res => {
        //     console.log("end prommis");
        //     res.forEach(doc=>{
        //         var approv = false;
        //         var feedback = ''
        //         if(doc[0].exists) {
        //             approv = true;
        //             feedback = doc[0].data().feedbackGuide;
        //         }
        //         var data = doc[1].data();
        //         var ref = doc[1].id;
        //         Students.push({data,approv,ref,feedback})
        //     })
        //     let i;
        //     console.log(Students.length)
        //     this.setState({viewStudent: !this.state.viewStudent});
        //     for (i=0;i<Students.length;i++)
        //     {
        //         if(!this.state.Students)
        //         {
        //             this.setState({Students: Students});
        //             return
        //         }
        //         else if(Students[i].approv!=this.state.Students[i].approv)
        //         {
        //             this.setState({Students: Students});
        //             return
        //         }

        //     }
        // });


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
                                <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזרה לתפריט</button>
                            </div>

                        </Grid>
                </Grid>
            </div>

        )
    }
}



export default UpdatesFirebase;
