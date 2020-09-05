import {homepage} from './home.js'
import {loadMenu} from './guide_menu.js'

function loadInstactorReport() {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth()+1; //January is 0!
    var yyyy = today.getFullYear();
    if(dd<10){
      dd='0'+dd
    } 
    if(mm<10){
      mm='0'+mm
    } 
    today = yyyy+'-'+mm+'-'+dd;
    $("#data-change").replaceWith(
      `
        <section id="data-change">
        <div id="instactorReport" class="sec-design">
          <form id="InstactorStudentReport" class="form-design" name="student_form">
            <div id="name-group" class="form-group">
              <label id="insert-student" class="title-input" for="name">הכנס את תאריך המפגש:</label>
              <input type="date" class="form-control" name="insert-student" id="insert-date2" max=${today}>
              <button id="viewReport" class="btn btn-info" onClick="">הצג<span
                class="fa fa-arrow-right"></span></button>
            </div>
            <div id="name-group" class="form-group" dir="rtl">
              <label id="insert-message" class="title-input">אשר את נוכחות החניכים במפגש:</label><br>
              <div id="stList" class="checkboxes">
              </div>
            </div>
            <button type="submit" id="confirm-form" class="btn btn-info" onClick="${repConfirmation()}">אשר<spanclass="fa fa-arrow-right"></span></button>
            <button id="go-back" class="btn btn-info" onClick="${loadMenu()}">חזור</button>
          </form>
        </div>
      </section>
            `
    );
  }


  
  function repConfirmation(){
    $("#data-change").replaceWith(
      `
        <section id="data-change">
        <div id="instactorReport" class="sec-design">
          <form id="InstactorStudentReport" class="form-design" name="student_form">
            <div id="name-group" class="form-group">
              <label id="insert-student" class="title-input" for="name">יומן הנוכחות אושר בהצלחה</label>
            </div>
            <button type="submit" id="confirm-form" class="btn btn-info" onClick="${loadMenu()}" >חזור לתפריט<span
                class="fa fa-arrow-right"></span></button>
            <button id="go-back" class="btn btn-info" onClick="${homepage()}">התנתק</button>
          </form>
        </div>
      </section>
            `
    );
  }
export {loadInstactorReport};