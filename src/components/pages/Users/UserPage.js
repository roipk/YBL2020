import React from "react";
import firebase, {auth} from '../../../firebase/firebase'
import {Button} from "@material-ui/core";
import { Link } from "react-router-dom";
import { withRouter} from 'react-router'
import User from './student/Users'

// import { css } from "@emotion/core";
import ClipLoader from "react-spinners/ClipLoader";




// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;

class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            user:{},
            error:false,
            loading: true,
        };
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

                    <button onClick={() => this.loadPage(true)}>loading page</button>
                    <button onClick={() => this.loadPage(false)}>unloading page</button>

    {!this.state.loading? "":
                    <div  className="sweet-loading" >
        <ClipLoader style={{
                backgroundColor: "rgba(255,255,255,0.85)",
                borderRadius: "25px"}}
        //   css={override}
          size={150}
          color={"#123abc"}
        
        />
      </div>
                }
                    
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