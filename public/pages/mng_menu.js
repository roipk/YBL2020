// import {homepage} from './home.js'
// import {viewStudentFeedback, viewInstructorFeedback} from './mng_show_feedback.js'
// import {viewReport} from './mng_attend_report.js'


function mngLoadMenu(permission) {
    $("#loginCode_form").submit(function (event) {
      if (!$("#loginCode_form").valid()) return;
  
      $("#data-change").replaceWith(`
      <section id="data-change">
        <div id="Manager" class="sec-design"> 
        <form id="Manager" class="form-design" name="student_form">
        <button  id="report-button" class="btn btn-info" onClick="viewReport()">צפייה בדו"ח נוכחות<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewStudentFeedback()">צפייה במשובי חניכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewInstructorFeedback()">צפייה במשובי מדריכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="go-back" class="btn btn-info" onClick="homepage()">התנתק</button>
        </form>
        </div>
    </section>
    `);
    });
}

// export {loadMenu};