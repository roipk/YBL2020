import React ,{ useState, useEffect } from "react";
import firebase, {auth,db} from '../../../../firebase/firebase'
import { RadioGroup ,FormControlLabel, Radio } from '@material-ui/core';
import './Student.css'


class TempStudent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            user: props.location,
            error:false,
            loading: true,
            page:'menu',
            rule:"Student",
            form:{
                guide: "",
                date: "",
                feedback: "",
                topicMeeting: "",
                feeedbackMeeting: {
                    // help: 0,
                    // new: 0,
                    // relevant: 0,


                },
            },
            searchTerm:"",
            searchResults:[],



            search: true,
            searchQuery: null,
            value1: [],
            options : [
                { key: 1, text: 'Choice 1', value: 1 },
                { key: 2, text: 'banana', value: 2 },
                { key: 3, text: 'kabuk', value: 3 },
            ]


        };

        this.handleChange1 = (e, { value }) => this.setState({ value })
        this.handleSearchChange1 = (e, { searchQuery }) => this.setState({ searchQuery })



        this.handleSubmit = this.handleSubmit.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.hendleSerch = this.hendleSerch.bind(this)
        this. hendleRadioButton = this. hendleRadioButton.bind(this)




    }

    people = [
        "אמיר אוחנה",
        "משה מיזרחי",
        "איציק מלול",
        "יוסף טרומפלדור",
        "יצחק וכותנת הפסים",
        "מישהו חשוב",
        "בדיקת אנשים"
    ];

    async sendDataToFirebase(form)
    {
        var path = "4oUqd87D5odv62ebBKOFQ3D4iqX2"
        try{
            var stude =await db.collection("students").doc(path).get()
            var studeSet =await db.collection("students").doc(path)

            var coms =stude.data().coms

            if(!coms)
            {
                console.log(coms)

                coms= []

            }
            coms.push(form)
            var test = await studeSet.set({coms:coms}, {merge:true})
            console.log(coms)


            // var testAdd = await stude.add({coms:form}, {merge:true})

            alert("end")

            // if(stude){
            //
            //
            //     console.log(stude.data())
            //     stude.data().coms= form
            //     console.log(stude.data())
            //
            // }


        }catch(error) {
            alert(error.message)
        }



    }

    getItem(item)
    {
        console.log(item.item)
        this.setState({searchTerm:item.item});
    }
    hendleSerch(event)
    {
        // this.setState({searchTerm:event.target.value})
        // this.hendleRes()
        const results = this.people.filter(person =>
            person.toLowerCase().includes(event.target.value)
        );
        this.setState({searchResults:results,searchTerm:event.target.value});

    }
    hendleRadioButton(event)
    {
        var form = this.state.form
        var feeedbackMeeting= form.feeedbackMeeting
        feeedbackMeeting[event.target.name] = event.target.value;
        form.feeedbackMeeting=feeedbackMeeting
        this.setState({form:form})
        console.log(form)
    }

    handleChange(event)
    {

        var form = this.state.form
        form[event.target.name] = event.target.value;
        this.setState({form:form})

    }

    handleSubmit(event)
    {
        console.log(this.state.form)
        this.sendDataToFirebase(this.state.form)

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


    loadTempPage(page)
    {
        this.props.history.push({
            pathname: `/${page}`,
            data: this.state.user // your data array of objects
        })
    }

    render() {

        // if(this.state.user.email)
        //     console.log(this.state)
        // if(this.state.page ==='report')
        return(this.StudentAttendReport())
        // else if(this.state.page ==='viewReport')
        //     return(this.StudentViewReport())
        // else
        //     return(this.menu())
    }


    menu() {
        const {  options, search, value1 } = this.state

        return (<div id="instructor" className="sec-design">
            <h2>Hello Student {this.state.user.email} </h2>

            <button id="feedback-button" className="btn btn-info"  onClick={()=>{this.chooseLayout("report")}}>רישום נוכחות<span
                className="fa fa-arrow-right"></span></button>
            <button id="report-button" className="btn btn-info" onClick={()=>{this.chooseLayout('viewReport')}} >הצגת נוכחות<span
                className="fa fa-arrow-right"></span></button>
            <button id="go-back" className="btn btn-info" >התנתק</button>
        </div>)
    }

    StudentAttendReport(){
        return ( <div>

            <div id="attendreport" className="sec-design">
                <h2>שלום {this.state.user.email} </h2>

                <div id="name-group" className="form-group">
                    <label id="insert-student" className="title-input" htmlFor="name">בחר את תאריך המפגש </label>
                    <input type="date" className="form-control" id="insert-date" name="date" onChange={this.handleChange}
                           required/>
                </div>

                {/*<div id="name-group" className="form-group">*/}
                {/*    <input*/}
                {/*        type="text"*/}
                {/*        placeholder="בחר מדריך"*/}
                {/*        name = "guide"*/}
                {/*        value={this.state.searchTerm}*/}
                {/*        onChange={(e)=>{*/}
                {/*            this.hendleSerch(e);*/}
                {/*            this.handleChange(e);*/}
                {/*        }}*/}


                {/*    />*/}
                {/*    <ul>*/}
                {/*        {this.state.searchResults.map(item => (*/}
                {/*            <ul key={item} onClick={()=>{this.getItem({item})}}>{item}</ul>*/}
                {/*        ))}*/}
                {/*    </ul>*/}

                {/*</div>*/}
                <div id="topic" className="form-group">
                    <label id="insert-topic" className="title-input" htmlFor="name"> באיזה נושא המפגש
                        עסק</label>
                    <input type="text" className="form-control" name="topicMeeting" id="subject"
                           placeholder="Your Answer" minLength="5" required onChange={this.handleChange}/>

                </div>
                <div id="box" className="chekbox" >
                    <label id="checkbox" className="title-input" htmlFor="name"> באיזה מידה המפגש היום חידש
                        לך/למדת דברים חדשים</label>
                    <br/>

                    <div>
                        <RadioGroup
                            aria-label="new"
                            name="q1"
                            // value={location}
                            onChange={this.hendleRadioButton}
                            row={true}
                        >
                            <FormControlLabel value="1" labelPlacement="start" control={<Radio />} label="במידה מועטה מאוד" />
                            <FormControlLabel value="2" labelPlacement="start" control={<Radio />} label="במידה מועטה" />
                            <FormControlLabel value="3" labelPlacement="start" control={<Radio />} label="במידה בינונית" />
                            <FormControlLabel value="4" labelPlacement="start" control={<Radio />} label="במידה רבה" />
                            <FormControlLabel value="5" labelPlacement="start" control={<Radio />} label="במידה רבה מאוד" />
                        </RadioGroup>
                    </div>
                    <br/>
                    <label id="checkbox" className="title-input" htmlFor="name"> באיזה מידה אתה מרגיש שהמפגש
                        יעזור לך בעתיד</label>
                    <br/>
                    <div>
                        <RadioGroup
                            aria-label="Location"
                            name="q2"
                            // value={location}
                            onChange={this.hendleRadioButton}
                            row={true}
                        >
                            <FormControlLabel value="1" labelPlacement="start" control={<Radio />} label="במידה מועטה מאוד" />
                            <FormControlLabel value="2" labelPlacement="start" control={<Radio />} label="במידה מועטה" />
                            <FormControlLabel value="3" labelPlacement="start" control={<Radio />} label="במידה בינונית" />
                            <FormControlLabel value="4" labelPlacement="start" control={<Radio />} label="במידה רבה" />
                            <FormControlLabel value="5" labelPlacement="start" control={<Radio />} label="במידה רבה מאוד" />
                        </RadioGroup>
                    </div>
                    <br/>
                    <label id="checkbox" className="title-input" htmlFor="name"> באיזה מידה נושא המפגש היה
                        רלוונטי עבורך</label>
                    <br/>
                    <div>
                        <RadioGroup
                            aria-label="Location"
                            name="q3"
                            // value={location}
                            onChange={this.hendleRadioButton}
                            row={true}

                        >
                            <FormControlLabel value="1" labelPlacement="start" control={<Radio />} label="במידה מועטה מאוד" />
                            <FormControlLabel value="2" labelPlacement="start" control={<Radio />} label="במידה מועטה" />
                            <FormControlLabel value="3" labelPlacement="start" control={<Radio />} label="במידה בינונית" />
                            <FormControlLabel value="4" labelPlacement="start" control={<Radio />} label="במידה רבה" />
                            <FormControlLabel value="5" labelPlacement="start" control={<Radio />} label="במידה רבה מאוד" />
                        </RadioGroup>
                    </div>
                    <br/>
                    <label id="checkbox" className="title-input" htmlFor="name"> באיזה מידה לקחת חלק פעיל במפגש היום</label>
                    <br/>
                    <div>
                        <RadioGroup
                            aria-label="Location"
                            name="q4"
                            // value={location}
                            onChange={this.hendleRadioButton}
                            row={true}

                        >
                            <FormControlLabel value="1" labelPlacement="start" control={<Radio />} label="במידה מועטה מאוד" />
                            <FormControlLabel value="2" labelPlacement="start" control={<Radio />} label="במידה מועטה" />
                            <FormControlLabel value="3" labelPlacement="start" control={<Radio />} label="במידה בינונית" />
                            <FormControlLabel value="4" labelPlacement="start" control={<Radio />} label="במידה רבה" />
                            <FormControlLabel value="5" labelPlacement="start" control={<Radio />} label="במידה רבה מאוד" />

                        </RadioGroup>
                    </div>
                    <br/>

                    <div id="name-group" className="form-group">
                        <label id="feedback" className="title-input" htmlFor="name"> מה את/ה לוקח/ת מהמפגש
                            היום</label>
                        <input type="text" className="form-control" name="feedback" id="Q4" placeholder="Your Answer"
                               minLength="10" onChange={this.handleChange} required/>
                    </div>
                </div>
                {/*<button id="confirm-form" className="btn btn-info"  onClick={this.handleSubmit}>הצגת נוכחות</button>*/}
                <button id="confirm-form" className="btn btn-info"  onClick={this.handleSubmit}>דווח נוכחות ושלח משוב</button>
                <button id="logout" className="btn btn-info" >התנתק</button>

                {/*<button id="go-back" className="btn btn-info" onClick={() => {*/}
                {/*        this.chooseLayout("menu")*/}
                {/*    }}>חזור*/}

                {/*    </button>*/}

            </div>
        </div>);
    }





    StudentViewReport(){
        return(
            <div id="student_feedback" class="sec-design">
                <div id="topic" class="form-group">
                    <h2>לא נמצאו רישומי נוכחות</h2>
                </div>
                <button type="submit" id="confirm-form" className="btn btn-info" >רישום נוכחות</button>
                <button id="go-back" className="btn btn-info"  onClick={()=>{this.chooseLayout("menu")}}>חזור</button>

            </div>

        )
    }


}


export  default  TempStudent;