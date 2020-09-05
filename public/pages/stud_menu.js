// import {homepage} from './home.js'
// import {attendReport} from './stud_attend.js'

function studLoadMenu(permission) {
    $("#loginCode_form").submit(function (event) {
      if (!$("#loginCode_form").valid()) return;
  
      $("#data-change").replaceWith(`
      <section id="data-change">
        <div id="instructor" class="sec-design"> 
            <form id="instructor_menu" class="form-design" name="student_form">
            <button  id="feedback-button" class="btn btn-info" onClick="attendReport()">דיווח נוכחות<span
            class="fa fa-arrow-right"></span></button>
            <button id="go-back" class="btn btn-info" onClick="homepage()">התנתק</button>
            </form>
        </div>
        </section>
    `);
    });
}

// export {loadMenu};