import {homepage} from './home.js'
import {instractorFeedback} from './guide_feedback.js'
import {loadInstactorReport} from './guide_attend_report.js'

function loadMenu(permission) {
    $("#loginCode_form").submit(function (event) {
      if (!$("#loginCode_form").valid()) return;
  
      $("#data-change").replaceWith(`
      <section id="data-change">
        <div id="instructor" class="sec-design"> 
            <form id="instructor_menu" class="form-design" name="student_form" method="POST">
            <button  id="feedback-button" class="btn btn-info" onClick="${loadInstactorReport()}">אישור דו"ח נוכחות<span
            class="fa fa-arrow-right"></span></button>
            <button id="report-button" class="btn btn-info" onClick="${instractorFeedback()}">מילוי משוב<span
            class="fa fa-arrow-right"></span></button>
            <button id="go-back" class="btn btn-info" onClick="${homepage()}">התנתק</button>
            </form>
        </div>
        </section>
    `);
    });
}

export {loadMenu};