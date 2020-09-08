import React, { Fragment } from 'react'
import { Link } from "react-router-dom";
import "./HomePage.css"


class HomePage extends React.Component {

    constructor(){
        super();
        this.state = {

            }
        };



    render() {
        return (

            <Fragment>
                <section id="data-change">
                    <div className="sec-design">
                        <form className="form-design">
                            <div>כניסת משתמשים:</div>
                            <div>
                                {/*<button type="submit" id="confirm1" className="btn btn-info">כניסת*/}
                                {/*    חניך<span className="fa fa-arrow-right"></span></button>*/}

                                {/*<button type="submit" id="confirm2" className="btn btn-info">כניסת*/}
                                {/*    מדריך<span className="fa fa-arrow-right"></span></button>*/}

                                {/*<button type="submit" id="confirm3"  className="btn btn-info">כניסת*/}
                                {/*    מנהל<span className="fa fa-arrow-right"></span></button>*/}

                                {/*<button type="submit" id="confirm4" className="btn btn-info">הרשם<span*/}
                                {/*    className="fa fa-arrow-right"></span></button>*/}

                                <button type="submit" id="confirm5" className="btn btn-info" onClick={test}>כניסה
                                    ישירה חניך<span className="fa fa-arrow-right"></span></button>
                                <Link to={{
                                    pathname:`/login`}}>
                                    <button className="btn btn-info">כניסה</button>
                                </Link>


                                <Link to={{
                                    pathname:`/signup`}}>
                                    <button className="btn btn-info">הרשמה</button>
                                </Link>
                            </div>
                        </form>
                    </div>
                </section>
            </Fragment>
        )
    }


}

function test() {


}

export default HomePage;