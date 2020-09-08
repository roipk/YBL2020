// import {homepage} from './home.js'
// import {loadMenu} from './guide_menu.js'

function instractorFeedback() {
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
      <div id="loginPhone" class="sec-design1">
        
        <form id="student_form" class="form-design" name="student_form">
  
          <div id="name-group" class="form-group">
            <label id="insert-student" class="title-input" for="name">הכנס את התאריך בו התקיים המפגש:</label>
            <input type="date" class="form-control" name="insert-student" id="insert-student" max=${today} required>
          </div>
          <div id="name-group" class="form-group">
          <label id="insert-name" class="title-input" for="name"> נושא המפגש:</label>
          <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Your Answer" minlength="10" required>
        </div>
        <div id="name-group" class="form-group">
        <label id="insert-name" class="title-input" for="name"> מה היה במפגש:</label>
        <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Your Answer" minlength="10" required>
      </div>
      <div id="name-group" class="form-group">
      <label id="insert-name" class="title-input" for="name">עם אילו הצלחות/דילמות נפגשתי בפגש:</label>
      <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Your Answer" minlength="10" required>
    </div>
    <div id="name-group" class="form-group">
    <label id="insert-name" class="title-input" for="name"> נקודות חשובות למפגש הבא:</label>
    <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Your Answer" minlength="10" required>
  </div>
  
  <div id ="box" class="chekbox"
     
  
     
     <label id="insert-name" class="title-input" for="name">באיזו מידה אתה מרגיש שהצלחת להעביר את נושא הפעילות:</label>
     <br/>
      <form name="form1" class="chekbox" onSubmit="return checkRadio()">
      <input type="radio" name="time" value="1"/>במידה מועטה<br/>
      <input type="radio" name="time" value="2"/>במידה בינונית<br/>
      <input type="radio" name="time" value="3"/>במידה רבה<br/>
      </br>
     </form>
     <div id="name-group" class="form-group">
     <label id="insert-name" class="title-input" for="name">שאלות ומחשבות לשיחת הדרכה הבאה:</label>
     <input type="text" class="form-control" name="firstName" id="firstName" placeholder="Your Answer" minlength="10" required>
   </div>
  
  </div>
  <button type="submit" id="confirm-form" class="btn btn-info" onClick="fBConfirmation()">שלח משוב<spanclass="fa fa-arrow-right"></span></button>
  <button id="go-back" class="btn btn-info" onClick="guideLoadMenu()">חזור לתפריט</button>
  
      
            
      </form>
    </div>
  </section>
        `
  );
}

  
function fBConfirmation(){
  $("#data-change").replaceWith(
    `
      <section id="data-change">
      <div id="instactorReport" class="sec-design">
        <form id="InstactorStudentReport" class="form-design" name="student_form" method="POST">
          <div id="name-group" class="form-group">
            <label id="insert-student" class="title-input" for="name">המשוב התקבל בהצלחה (:</label>
          </div>
          <button type="submit" id="confirm-form" class="btn btn-info" onClick="loadMenu()" >חזור לתפריט<span
              class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="homepage()">התנתק</button>
        </form>
      </div>
    </section>
          `
  );
}
// export {instractorFeedback};