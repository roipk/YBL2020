import {loadMenu} from './mng_menu.js'

function viewReport(){
    var selectDate = document.getElementById("insert-date").value;
    var guide = document.getElementById("instName").value;
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
        <form id="InstactorStudentReport" class="form-design" name="student_form" method="POST">
          <div id="name-group" class="form-group">
            <label id="insert-student" class="title-input" for="name">שלום מנהל,
            על מנת לצפות בדוח נוכחות מאושר בחר תאריך:
            </label>
            <input type="date" class="form-control" name="insert-date" id="insert-date" max=${today} value="${selectDate}">
            <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
            <input type="text" class="form-control" name="instName" id="instName" minlength="2" value="${guide}" required>
            <button id="viewReport" class="btn btn-info" onClick="">הצג<span
              class="fa fa-arrow-right"></span></button>
          </div>
          <div id="name-group" class="form-group" dir="rtl">
            <label id="insert-message" class="title-input">החניכים שנכחו במפגש:</label><br>
            <div  id="report" class="report">
            </div>
          </div>
          <button id="go-back" class="btn btn-info" onClick="${loadMenu()}">חזור</button>
        </form>
      </div>
    </section>
          `
    );
    
  }

export {viewReport};