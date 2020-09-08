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
import './Login.css'

import {db,auth} from  '../../../firebase/firebase';


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







async function loginWithEmail()  {


    var email = document.getElementById("email");
    var password = document.getElementById("password");
    var canLogin = await auth.signInWithEmailAndPassword(email.value, password.value).catch(function (error) {
        var errorCode = error.code;
        var errorMessage = error.message;
        if(errorCode!==errorMessage);
        alert("user or password not correct")

    });

    if (canLogin) {
        console.log(canLogin)
        alert("welcome")
        document.getElementById("clickme").click()
        console.log("click")
    }
}



class LoginPage extends React.Component {

    constructor(){
        super();
        // this.classes = useStyles();

        this.state = {
            t:{
                "fname":"roi",
                "lname":"madmon"
            },
            flag: false

            }
        };







    render() {
        return (
            this.Login()
            //this.state.flag === true ? <PaintingExtraDetails data={this.state.extra_details_paint}/> : this.List()
        );
    }



    Login() {
        return (

            <Container component="main" maxWidth="xs">
                <div className="sec-design">
                    <CssBaseline/>
                    <div className={useStyles.paper}>
                        <Avatar className={useStyles.avatar}>
                            <LockOutlinedIcon/>
                        </Avatar>
                        <Typography className="enter" component="h1" variant="h5">
                            התחברות
                        </Typography>
                        <form className={useStyles.form} noValidate>
                            <Grid container spacing={2}>

                                <Grid item xs={12}>
                                    <TextField
                                        inputProps={{style: {textAlign: 'center'}}}
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
                                        inputProps={{style: {textAlign: 'center'}}}
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
                                        inputProps={{style: {textAlign: 'center'}}}
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
                                // className={classes.submit}
                                onClick={loginWithEmail}
                            >
                                כניסה
                            </Button>

                            <Link id="clickme" href={"/Users/"+this.state.t.fname} variant="body2">
                            </Link>
                            <Grid container justify="flex-end">
                                <Grid item>
                                    <Link href="/signup" variant="body2">
                                        עוד אין לך חשבון? להרשמה
                                    </Link>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </div>
            </Container>

        );
    }


}


export default LoginPage;