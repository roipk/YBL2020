import React from "react";
import firebase, {auth} from '../../../firebase/firebase'
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withRouter} from 'react-router'
import User from './student/Users'

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            user:{},
            error:false,

        };



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
        auth.signOut();
        window.location.href = '/';
    }

    render() {
        if(this.state.isLoad && this.state.user) {
            return (
                <div>
                    {this.userPage()}
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={this.logout}>
                        Logout
                    </Button>

                    <Link to={{
                        pathname:`/Users/${this.state.user.name}`,
                        state: this.state }}>
                        <button className="btn btn-info">go to new user</button>
                    </Link>
                </div>
            );
        }
        else if(!this.state.isLoad)
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

    userPage()
    {
        const { user , isLoaded , error} = this.state
        if(error)
            return (<h1>{error}</h1>)

        return(
            <div>
                hello {user.email}
            {/*    <span>*/}
            {/*    {isLoaded ? <Users user={user} isLoaded={isLoaded}/> : <div/>}*/}
            {/*</span>*/}
            </div>
        )
    }

}


export  default  UserPage;