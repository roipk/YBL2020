import React, { useState } from 'react'
import { Typography, Paper, Avatar, Button, FormControl, Input, InputLabel } from '@material-ui/core'
import LockOutlinedIcon from '@material-ui/icons/LockOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link, withRouter } from 'react-router-dom'
import firebase ,{auth} from '../../../firebase/firebase' ;
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";


const useStyles = theme => ({
    main: {
        width: 'auto',
        display: 'block', // Fix IE 11 issue.
        marginLeft: theme.spacing(3),
        marginRight: theme.spacing(3),
        [theme.breakpoints.up(400 + theme.spacing(3) * 2)]: {
            width: 400,
            marginLeft: 'auto',
            marginRight: 'auto',
        },
    },
    paper: {
        marginTop: theme.spacing(8),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(),
        backgroundColor: theme.palette.secondary.main,
    },
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(),
    },
    submit: {
        marginTop: theme.spacing(3),
    },
});


//
// class MovieList extends React.Component {
//     constructor(props) {
//         super(props);
//         // State initialize
//         this.state = {
//
//         };
//     }
//
//     // render() {
//     //     return (
//     //         this.List()
//     //         //this.state.flag === true ? <PaintingExtraDetails data={this.state.extra_details_paint}/> : this.List()
//     //     );
//     // }
//
// }


function LoginPage(props) {
    const { classes } = props


    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [password, setPassword] = useState('')



    return (
        <main className={classes.main}>
            <Paper className={classes.paper}  style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                borderRadius: "25px"}}>
                <Avatar className={classes.avatar}>
                    <LockOutlinedIcon />
                </Avatar>
                <Typography component="h1" variant="h5">
                    התחברות
                </Typography>
                <form className={classes.form} onSubmit={e => e.preventDefault() && false}>

                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="phone"
                                name="phone"
                                autoComplete="off"
                                autoFocus value={phone}
                                onChange={e => setPhone(e.target.value)}
                                variant="outlined"
                                // required
                                fullWidth
                                label="פלאפון"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                id="email" name="email"
                                autoComplete="off"
                                value={email} onChange={e => setEmail(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                label="Email"
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                inputProps={{style: {textAlign: 'center'}}}
                                name="password"
                                type="password"
                                id="password"
                                autoComplete="off"
                                value={password} onChange={e => setPassword(e.target.value)}
                                variant="outlined"
                                required
                                fullWidth
                                label="סיסמא"
                            />
                        </Grid>
                    </Grid>
                    <Button
                        id="LoginBtn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        onClick={login}
                        className={classes.submit}>
                       כניסה
                    </Button>

                    <Button
                        id="registerBtn"
                        type="submit"
                        fullWidth
                        variant="contained"
                        id="registerBtn"
                        component={Link}
                        to="/SignUp"
                        className={classes.submit}>
                        הרשמה
                    </Button>
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        id="HomeBtn"
                        component={Link}
                        to="/"
                        className={classes.submit}>
                        חזרה לעמוד הראשי
                    </Button>
                </form>
            </Paper>
        </main>
    )




    async function login() {
        try {
            var user = await auth.signInWithEmailAndPassword(email, password).catch(function(error) {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // ...
            });
            console.log(user.user.email)


            // await firebase.login(email, password)
            props.history.push({
                pathname: '/User',
                data: user.user // your data array of objects
            })
            // props.history.push('/User')

        } catch(error) {
            alert(error.message)
        }
    }
}



export default withRouter(withStyles(useStyles)(LoginPage))

// export default MovieList;