import React from "react";
import firebase, {auth} from '../../../firebase/firebase'
import {Button} from "@material-ui/core";
import { withRouter } from 'react-router'

class test extends React.Component {
    constructor(props) {
        super(props);
        const name=""
        this.state = {
            wait:true
        };



    }

   async componentDidMount() {
        // console.log("work")
       auth.onAuthStateChanged(user=>{
           if(user)
           {
               this.setState({
                   wait:false,
                   user:user,
               })
               // console.log("in")
           }
           else {
               this.setState({
                   wait: false,
               })
               window.location.href = '/Login';

           }
           this.render()
       })

    }


    async  logout() {
       auth.signOut();
        window.location.href = '/';
    }

    render() {

        if(!this.state.wait && this.state.user) {
            return (
                <div>

                    {this.userPage(this.state.user)}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.logout}>
                        Logout
                </Button>
                </div>
            );
        }
        else if(this.state.wait)
        {
            return (<div>
                   whait for user
                </div>
            )
        }
        else
        {
            return (<div>
                not found user need log out

            </div>
            )
        }
    }

    userPage(user)
    {
        return(
            <div>hello {user.email} </div>
        )
    }


}

export  default  test;