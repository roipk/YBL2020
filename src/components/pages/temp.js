import React, { useEffect, useState } from 'react'
import { Typography, Paper, Avatar, CircularProgress, Button } from '@material-ui/core'
import VerifiedUserOutlined from '@material-ui/icons/VerifiedUserOutlined'
import withStyles from '@material-ui/core/styles/withStyles'
import firebase ,{auth,db}from '../../firebase/firebase'
import { withRouter } from 'react-router-dom'
import test from "./Users/test";

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
        marginTop:theme.spacing(8),
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








 function Dashboard(props) {
    const { classes } = props

    // console.log(classes.getState())

     var user = getUser()

    if(!user) {
        alert('Please login first')
        props.history.replace('/login')
        return null
    }
    user = user.email
     console.log(user)


    // useEffect(() => {
    //
    // })


    return (
        <main className={classes.main}>
            <Paper className={classes.paper}>
                <Avatar className={classes.avatar}>
                    <VerifiedUserOutlined />
                </Avatar>
                <Typography component="h1" variant="h5">
                    Hello {user}
                </Typography>
                {/*<Typography component="h1" variant="h5">*/}
                {/*    Your quote: {quote ? `"${quote}"` : <CircularProgress size={20} />}*/}
                {/*</Typography>*/}
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="secondary"
                    onClick={logout}
                    className={classes.submit}>
                    Logout
                </Button>
            </Paper>
        </main>
    )

    async function logout() {
        await firebase.logout()
        props.history.push('/')
    }


     async function getUser() {
        var t=""
         console.log("start")
        var test = await firebase.auth().onAuthStateChanged(user => {
             if (user) {
                 console.log("in")
                 console.log(user)
                 t = user;
             } else {
                 console.log(user)
                 t = null
             }
         })

         console.log(t)
         console.log("end")
     }

}



export default withRouter(withStyles(styles)(Dashboard))