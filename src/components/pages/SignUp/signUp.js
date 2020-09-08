import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

import {db} from '../../../firebase/firebase';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './SignUp.css'



import firebase from '../../../firebase/firebase' ;

const useStyles = makeStyles((theme) => ({
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    avatar: {
        margin: theme.spacing(1),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        margin: theme.spacing(3, 0, 2),
    },

    TextField: {
        alignItems: 'center',
    },
}));

var newUser={
    "fname":"",
    "lname":"",
    "phone":"",
    "email":"",
    "password":""
}




export default function SignUp() {
    const classes = useStyles();



    return (

        <Container component="main" maxWidth="xs">
            <div className="sec-design">
            <CssBaseline />
            <div className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                   הרשמה
                </Typography>
                <form className={classes.form} noValidate>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputProps={{ style: {textAlign: 'center'} }}
                                autoComplete="fname"
                                name="firstName"
                                variant="outlined"
                                required
                                fullWidth
                                id="firstName"
                                label="שם פרטי"
                                autoFocus
                            />
                        </Grid>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                inputProps={{ style: {textAlign: 'center'} }}
                                variant="outlined"
                                required
                                fullWidth
                                id="lastName"
                                label="שם משפחה"
                                name="lastName"
                                autoComplete="lname"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{ style: {textAlign: 'center'} }}
                                variant="outlined"
                                required
                                fullWidth
                                id="phone"
                                label="פלאפון"
                                name="phone"
                                autoComplete="nphone"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{ style: {textAlign: 'center'} }}
                                variant="outlined"
                                required
                                fullWidth
                                id="email"
                                label="Email כתובת"
                                name="email"
                                autoComplete="email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{ style: {textAlign: 'center'} }}
                                variant="outlined"
                                required
                                fullWidth
                                name="password"
                                label="סיסמא"
                                type="password"
                                id="password"
                                autoComplete="current-password"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        // type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        onClick={checkUser}
                    >
                        הרשמה
                    </Button>
                    <Grid container justify="flex-end">
                        <Grid item>
                            <Link id="backLogin" href="/" variant="body2">
                              כבר יש לך חשבון? התחבר כאן
                            </Link>
                        </Grid>
                    </Grid>
                </form>
            </div>
            </div>
        </Container>

    );
}




async function checkIfUserExist(phone){
    console.log(phone)
    var path=["guide","students","waitforapproval"]
    var i =0;
    for(; i<path.length; i++)
    {
        var user = await db.collection(path[i]).doc(phone).get();
        // user = await firebase.database().ref(path[i] + phone).once("value");

        if(user.exists)
        {
            console.log("found : " + path[i])
            return true;
        }
        else
            console.log("not found : " + path[i])
    }
    return  false;
}




async function checkUser() {
    newUser.phone = document.getElementById("phone").value
    var user = await checkIfUserExist(newUser.phone)
    if (user)
        alert("משתמש קיים")
    else {
        alert("ההרשמה בוצעה בהצלחה יש להמתין לאישור המנהל")
        document.getElementById("backLogin").click()

    }
    // newUser.p = document.getElementById("firstName").value
    // newUser. = document.getElementById("firstName").value
    // newUser.fname = document.getElementById("firstName").value
    // newUser.fname = document.getElementById("firstName").value
    // newUser.fname = document.getElementById("firstName").value
}