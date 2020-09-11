import React from 'react'
import { Typography, Paper, Avatar, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import {Link, Switch} from 'react-router-dom'
import {auth} from "../../../firebase/firebase";

const styles = theme => ({
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
        marginTop: theme.spacing(40),
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: `${theme.spacing(2)}px ${theme.spacing(3)}px ${theme.spacing(3)}px`,
    },
    avatar: {
        margin: theme.spacing(),
        backgroundColor: theme.palette.secondary.main,
    },
    submit: {
        marginTop: theme.spacing(3),
    },
})

function HomePage(props) {
    const { classes } = props
    test();

     async function test(){
        await auth.onAuthStateChanged(user => {
            if(user) {
                props.history.push({
                    pathname: '/User',
                    data: user // your data array of objects
                })
            }
        })
    }

    return (
        <main className={classes.main}>
            <Paper className={classes.paper}style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                borderRadius: "25px"}}>
                {/*<Avatar className={classes.avatar}>*/}
                {/*    <VerifiedUserOutlined />*/}
                {/*</Avatar>*/}
                <Button
                    id="LoginBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/login"
                    className={classes.submit}>
                    כניסת משתמשים
                </Button>
                <Button
                    id="registerBtn"
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    component={Link}
                    to="/SignUp"
                    className={classes.submit}>
                    הרשמה
                </Button>

            </Paper>
        </main>
    )
}

export default withStyles(styles)(HomePage)