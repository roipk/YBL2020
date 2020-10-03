import React, { Component } from "react";
import {db} from "../../../../firebase/firebase";
import Select from 'react-select'
import Grid from "@material-ui/core/Grid";
import TempManager from "./TempManager";
import $ from 'jquery'
import { ContactSupport } from "@material-ui/icons";
import {BackPage} from "../UserPage";

var options = []
class AttendReport extends Component {

    constructor() {
        super();


        this.state =
            {
                isLoaded:false,
                date:"",
                teamPath:"",
            }
            this.handleSubmit = this.handleSubmit.bind(this)
            this.handleChangeDate = this.handleChangeDate.bind(this)
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
        console.log(this.state.teamPath.id)
        if(!this.state.date) {
            return;
        }
        console.log("in");
        var team = await db.collection("Teams").doc(this.state.teamPath).get();
        console.log(team)
        const collection = await db.collection('students').where("Team","==",this.state.teamPath).get()
        console.log(collection)
        const Students = [];
        const date = this.state.date
        const collectionPromisesTeam = collection.docs.map( async function(doc) {
            var ref =await db.collection("students").doc(doc.id).collection("comes").doc(date).get()
            var user = await db.collection("students").doc(doc.id).get()
            return [ref,user]

        })
        Promise.all(collectionPromisesTeam).then(res => {
            console.log("end prommis");
            res.forEach(doc=>{
                var data = doc[1].data();
                var ref = doc[0].data();
                Students.push({data,ref})
            })
            let i;
            console.log(Students)
            this.setState({viewStudent: !this.state.viewStudent});
            for (i=0;i<Students.length;i++)
            {
                try{
                    if(Students[i].ref.approved==true){
                        console.log(Students[i].ref)
                        console.log(Students[i].data.fname+" "+Students[i].data.lname)
                        var lable=document.createElement("lable");
                        lable.innerHTML = Students[i].data.fname+" "+Students[i].data.lname;
                        var br=document.createElement("br");
                        $('#studentList').append(lable);
                        $('#studentList').append(br);
                    }
                }catch{
                    console.log("user doesnt have comes collection")
                }


            }
        });
        

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
                    <Grid item xs={12}>
                        
                        <Grid item xs={12}>
                            <label id="date" className="title-input">הכנס את תאריך המפגש:</label>
                            <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChangeDate} required/>
                            <Select  placeholder={" בחר קבוצה "} options={options} onChange={(e)=>{
                                console.log(e.label,e.value);
                                this.setState({teamPath:e.value.id})
                            }} />

                        </Grid>
                        <Grid item xs={12}>
                            <div className="text-below-image">

                                <button onClick={this.handleSubmit} >הצג</button>
                                <div></div>
                                <button id="feedback-button" className="btn btn-info" onClick={()=>{BackPage(this.props,this.state.user)}}>חזרה לתפריט</button>
                            </div>

                        </Grid>
                    </Grid>
                </Grid>
            </div>

        )
    }
}



export default AttendReport;
