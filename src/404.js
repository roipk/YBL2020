import React from "react";


class notFound extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
        };
    }




    render() {
       return(
           <div id="instructor" className="sec-design" dir="rtl">
               <h2>דף זה לא קיים</h2>
               <button id="report-button" className="btn btn-info"onClick={()=>{
                   this.props.history.push({
                       pathname: `/`,
                   })
                   return
               }} >חזורה לדף הראשי<span
                   className="fa fa-arrow-right"></span></button>

           </div>
       )


    }
}


export  default  notFound;