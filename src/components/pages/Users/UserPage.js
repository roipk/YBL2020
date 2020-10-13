import React from "react";
import  {auth} from '../../../firebase/firebase'
import {Button} from "@material-ui/core";


import ClipLoader from "react-spinners/ClipLoader";




// const override = css`
//   display: block;
//   margin: 0 auto;
//   border-color: red;
// `;


export function BackPage(prop,data)
{
    prop.history.push({
        pathname: `${prop.history.goBack()}`,
        data: data,
    })
}
export function NextPage(prop,path,data)
{
    prop.history.push({
        pathname: `${prop.location.pathname}/${path}`,
        data: data,
    })
    console.log(data)
}


class UserPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoad:false,
            user: props.location,
            error:false,
            loading: true,
            rule:"Manager",
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

        // if(this.state.user.email)
        //     console.log("this is email : "+this.state.user.email)
            return (
                <div className="sec-design">
                {!this.state.user.email? (null):(
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



                        <button onClick={() => this.loadUser("Student")}>Enter Student</button>
                        <button onClick={() => this.loadUser("Guide")}>Enter Guide</button>
                        <button onClick={() => this.loadUser("Manager")}>Enter Manager</button>
                        <button onClick={() => this.loadTempPage("TempStudent")}>Enter TempStudent</button>
                        <button onClick={() => this.loadTempPage("TempGuide")}>Enter TempGuide</button>
                        <button onClick={() => this.loadTempPage("TempManager")}>Enter TempManager</button>

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
                )}
                </div>
            );
    }

    loadUser(page)
    {
        this.props.history.push({
            pathname: `/${page}/${this.state.user.email}`,
            data: this.state.user // your data array of objects
        })
    }
    loadTempPage(page)
    {
        this.props.history.push({
            pathname: `/${page}`,
            data: this.state.user // your data array of objects
        })
    }

    userPage()
    {
        const { user , error} = this.state
        if(error)
            return (<h1>{error}</h1>)

        return(
            <div>
               שלום {user.displayName}
            {/*    <span>*/}
            {/*    {isLoaded ? <Users user={user} isLoaded={isLoaded}/> : <div/>}*/}
            {/*</span>*/}
            </div>
        )
    }

}


export  default  UserPage;