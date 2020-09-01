function loadHome() {
  $("#data-change").replaceWith(
    `
    <section id="data-change">
      <div id="loginPhone" class="sec-design">
        <form id="loginPhone_form" class="form-design" name="loginPhone_form" onsubmit="return loadCode()" method="POST">

          <div id="name-group" class="form-group">
            <label id="insert-name" class="title-input" for="name"> הכנס שם מלא:</label>
            <input type="text" class="form-control" name="firstName" id="firstName" placeholder="First Name" minlength="2" required>
          </div>

          <div id="name-group" class="form-group">
            <label id="insert-phone" class="title-input" for="phone">הכנס מספר טלפון להזדהות:</label>
            <input type="text" class="form-control" name="phoneNumber" id="phoneNumber"  placeholder="Phone Number" 
            required>
          </div>

          <button type="submit" id="confirm" onClick="loadCode()" class="btn btn-info">שלח קוד לנייד<span
              class="fa fa-arrow-right"></span></button>
          <div id="recaptcha-container"></div>

          <button id="go-back" class="btn btn-info" onClick="loadHome()">חזור</button>

        </form>
      </div>
    </section>
    `
  );
}

function loadCode() {
  $("#loginPhone_form").submit(function (event) {
    if (!$("#loginPhone_form").valid()) return;

    var name = loginPhone_form.firstName.value;
    var phoneNum = loginPhone_form.phoneNumber.value;
      $("#data-change").replaceWith(
        `
        <section id="data-change">
        <div id="loginCode" class="sec-design">
        <form id="loginCode_form" class="form-design" name="loginCode_form" method="POST">
        
        <div id="name-group" class="form-group">
        <label id="insert-code" class="title-input" for="code">הכנס את הקוד שנשלח לך לנייד:</label>
        <input type="text" class="form-control" name="insert-code" id="insert-code" placeholder="Code" pattern="[0-9]{6}" required>
        </div>
        
        <button type="submit" id="confirm" onClick="loadMenu()"  class="btn btn-info">התחבר<span
        class="fa fa-arrow-right"></span></button>
        </form>
        </div>
        </section>
        `
        );
  });
}

function enterFail(){
  $("#data-change").replaceWith(
    `
    <section id="data-change">
      <div id="loginPhone" class="sec-design">
        <form id="loginPhone_form" class="form-design" name="loginPhone_form" onsubmit="return loadCode()" method="POST">
        <center>אחד או יותר מהנתונים שהזנת שגוי/ים. נסה שנית:</center>
        <center>
        <button type="submit" id="confirm" onClick="loadPhone(1)" class="btn btn-info">כניסת חניך<span
         class="fa fa-arrow-right"></span></button>
        <div id="recaptcha-container"></div>

        <button type="submit" id="confirm" onClick="loadPhone(2)" class="btn btn-info">כניסת מדריך<span
         class="fa fa-arrow-right"></span></button>
        <div id="recaptcha-container"></div>

          <button type="submit" id="confirm" onClick="loadPhone(3)" class="btn btn-info">כניסת מנהל<span
              class="fa fa-arrow-right"></span></button>
          <div id="recaptcha-container"></div>
          </center>

        </form>
      </div>
    </section>
    `
  );
}
//142.158.176
function loadMenu(permission) {
  $("#loginCode_form").submit(function (event) {
    if (!$("#loginCode_form").valid()) return;

  if(permission == 1){ //The user is student
    $("#data-change").replaceWith(`
    <section id="data-change">
      <div id="instructor" class="sec-design"> 
        <form id="instructor_menu" class="form-design" name="student_form" method="POST">
          <button  id="feedback-button" class="btn btn-info" onClick="presenceReporting()">דיווח נוכחות<span
          class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
  `);
  }

  else if(permission == 2){ //The user is instructor
    $("#data-change").replaceWith(`
    <section id="data-change">
      <div id="instructor" class="sec-design"> 
        <form id="instructor_menu" class="form-design" name="student_form" method="POST">
          <button  id="feedback-button" class="btn btn-info" onClick="loadInstactorReport()">אישור דו"ח נוכחות<span
          class="fa fa-arrow-right"></span></button>
          <button id="report-button" class="btn btn-info" onClick="instractorFeedback()">מילוי משוב<span
          class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
  `);
  }

  else{ //The user is manager
   $("#data-change").replaceWith(`
     <section id="data-change">
       <div id="Manager" class="sec-design"> 
        <form id="Manager" class="form-design" name="student_form" method="POST">
        <button  id="report-button" class="btn btn-info" onClick="viewReport()">צפייה בדו"ח נוכחות<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewStudentFeedback()">צפייה במשובי חניכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewInstructorFeedback()">צפייה במשובי מדריכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
      </form>
     </div>
    </section>
   `);
  }
});
}

function loadMenu2(permission) {
  if(permission == 1){ //The user is student
    $("#data-change").replaceWith(`
    <section id="data-change">
      <div id="instructor" class="sec-design"> 
        <form id="instructor_menu" class="form-design" name="student_form" method="POST">
          <button  id="feedback-button" class="btn btn-info" onClick="presenceReporting()">דיווח נוכחות<span
          class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
  `);
  }

  else if(permission == 2){ //The user is instructor
    $("#data-change").replaceWith(`
    <section id="data-change">
      <div id="instructor" class="sec-design"> 
        <form id="instructor_menu" class="form-design" name="student_form" method="POST">
          <button  id="feedback-button" class="btn btn-info" onClick="loadInstactorReport()">אישור דו"ח נוכחות<span
          class="fa fa-arrow-right"></span></button>
          <button id="report-button" class="btn btn-info" onClick="instractorFeedback()">מילוי משוב<span
          class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
  `);
  }

  else{ //The user is manager
   $("#data-change").replaceWith(`
     <section id="data-change">
       <div id="Manager" class="sec-design"> 
        <form id="Manager" class="form-design" name="student_form" method="POST">
        <button  id="report-button" class="btn btn-info" onClick="viewReport()">צפייה בדו"ח נוכחות<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewStudentFeedback()">צפייה במשובי חניכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewInstructorFeedback()">צפייה במשובי מדריכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
      </form>
     </div>
    </section>
   `);
  }
}

function presenceReporting(){

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
    <div id="loginPhone" class="sec-design">
      
      <form id="student_form" class="form-design" name="student_form" method="POST">

        <div id="name-group" class="form-group">
          <label id="insert-student" class="title-input" for="name">בחר את תאריך המפגש: </label>
          <input type="date" class="form-control" id="insert-date" name="insert-date" max=${today} required>
          
        </div>

        <div id="name-group" class="form-group">
        <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
        <input type="text" class="form-control" name="instName" id="instName" placeholder="Name" minlength="2" required>
      </div>
     

        <button type="submit" id="confirm-form" class="btn btn-info" onClick="saveDate()">המשך<spanclass="fa fa-arrow-right"></span></button>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${1})">חזור</button>
            
      </form>
  </section>
        `
  );
}

//  <form id="student_form" class="form-design" name="student_form" method="POST"> 286

function saveDate(){
  $("#student_form").submit(function (event) {
    if (!$("#student_form").valid()) return;
    studentData[studentDataCounter][0] = document.getElementById("insert-date").value;
    var instName = document.getElementById("instName").value;
    studentData[studentDataCounter][1] = instName;
    studentData[studentDataCounter][7] = connectedUserName;
    presenceFeedback();
  });
}

function presenceFeedback(){
 
  $("#data-change").replaceWith(
    `
    <section id="data-change">
    <div id="loginPhone" class="sec-design1">
      
      <form id="student_feed" class="form-design" name="student_feed" method="POST">

     <div id="name-group" class="form-group">
     <label id="insert-name" class="title-input" for="name"> באיזה נושא המפגש עסק:</label>
     <input type="text" class="form-control" name="subject" id="subject" placeholder="Your Answer" minlength="10" required>
   </div>
<div id ="box" class="chekbox"
      <label id="insert-name" class="title-input" for="name"> באיזה מידה המפגש היום חידש לך/למדת דברים חדשים:</label>
     <br/>
      <form name="form1" class="chekbox" onSubmit="return checkRadio()">
      <input type="radio" name="Q1" value="0"/>במידה מועטה<br/>
      <input type="radio" name="Q1" value="5"/>במידה בינונית<br/>
      <input type="radio" name="Q1" value="10"/>במידה רבה<br/>
      </br>
     </form>

     <label id="insert-name" class="title-input" for="name"> באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד:</label>
     <br/>
      <form name="form1" class="chekbox" onSubmit="return checkRadio()">
      <input type="radio" name="Q2" value="0"/>במידה מועטה<br/>
      <input type="radio" name="Q2" value="5"/>במידה בינונית<br/>
      <input type="radio" name="Q2" value="10"/>במידה רבה<br/>
      </br>
     </form>

     
     <label id="insert-name" class="title-input" for="name"> באיזה מידה נושא המפגש היה רלוונטי עבורך:</label>
     <br/>
      <form name="form1" class="chekbox" onSubmit="return checkRadio()">
      <input type="radio" name="Q3" value="0"/>במידה מועטה<br/>
      <input type="radio" name="Q3" value="5"/>במידה בינונית<br/>
      <input type="radio" name="Q3" value="10"/>במידה רבה<br/>
      </br>
     </form>
     <div id="name-group" class="form-group">
     <label id="insert-name" class="title-input" for="name"> מה את/ה לוקח/ת מהמפגש היום:</label>
     <input type="text" class="form-control" name="Q4" id="Q4" placeholder="Your Answer" minlength="10" required>
   </div>

</div>
        <button type="submit" id="confirm-form" class="btn btn-info" onClick="saveStudentFeedback()">דווח נוכחות ושלח משוב<spanclass="fa fa-arrow-right"></span></button>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${1})">חזור</button>

      
            
      </form>
    </div>
  </section>
        `
  );
}

function saveStudentFeedback(){
  console.log(studentDataCounter);
 // $("#student_feed").submit(function (event) {
 //   if (!$("#student_feed").valid()) return;
  var sum1=0;
  var sum2=0;
  var sum3=0;
  var classSubject = document.getElementById("subject").value;
  studentData[studentDataCounter][2] = classSubject;
  
  var radios1 = document.getElementsByName('Q1');
  var radios2 = document.getElementsByName('Q2');
  var radios3 = document.getElementsByName('Q3');

  for (var i = 0, length = radios1.length; i < length; i++) {
    if (radios1[i].checked) {
      // do whatever you want with the checked radio
      console.log("Q1 "+radios1[i].value)
      sum1+=parseInt(radios1[i].value)
      console.log("sum1= "+sum1)

      // only one radio can be logically checked, don't check the rest
      break;
    }
  }

  for (var i = 0, length = radios2.length; i < length; i++) {
    if (radios2[i].checked) {
      console.log("Q2 "+radios2[i].value)
      sum2+=parseInt(radios2[i].value)
      console.log("sum2= "+sum2)

      break;
    }
  }

  for (var i = 0, length = radios3.length; i < length; i++) {
    if (radios3[i].checked) {
      console.log("Q3 "+radios3[i].value)
      sum3+=parseInt(radios3[i].value)
      console.log("sum3= "+sum3)

      break;
    }
  }
  
  var answer=document.getElementById('Q4').value;
  studentData[studentDataCounter][3] =sum1;
  studentData[studentDataCounter][4] =sum2;
  studentData[studentDataCounter][5] =sum3;
  studentData[studentDataCounter][6] =answer;

//   var obj = {
//     table: []
//  };
//     obj.table.push(feedback);
//     var json = JSON.stringify(obj);
//     var fs = require('fs');
// fs.writeFile('myjsonfile.json', json, 'utf8', callback);
  studentDataCounter++;
  console.log(studentData[0][7]);

  confirmation();
//});
}

function confirmation(){
 // $("#student_feed").submit(function (event) {
 //   if (!$("#student_feed").valid()) return;
  $("#data-change").replaceWith(
    `
      <section id="data-change">
      <div id="instactorReport" class="sec-design">
        <form id="InstactorStudentReport" class="form-design" name="student_form" method="POST">
          <div id="name-group" class="form-group">
            <label id="insert-student" class="title-input" for="name">הדיווח התקבל בהצלחה (:</label>
          </div>
          <button type="submit" id="confirm-form" class="btn btn-info" onClick="loadMenu2(${1})" >חזור לתפריט<span
              class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
          `
  );
//});
}

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
      
      <form id="student_form" class="form-design" name="student_form" method="POST">

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
<button id="go-back" class="btn btn-info" onClick="loadMenu2(${2})">חזור לתפריט</button>

    
          
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
          <button type="submit" id="confirm-form" class="btn btn-info" onClick="loadMenu2(${2})" >חזור לתפריט<span
              class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
          `
  );
}
function studentList(){

  var selectDate = new Date();
  selectDate = document.getElementById("insert-date2").value;
  attendanceReport[numOfConfirmRep][0] = selectDate;
  attendanceReport[numOfConfirmRep][1] = connectedUserName;
  //var howMany = 0;
  var names = new Array(studentDataCounter);
   for(var i = 0; i < studentDataCounter; i++){
     if((studentData[i][0] == selectDate) && (studentData[i][1]) == connectedUserName){
       console.log("hihi" + i);
       names[howMany] = studentData[i][7];
       howMany++;
     }
   }

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
            <label id="insert-student" class="title-input" for="name">הכנס את תאריך המפגש:</label>
            <input type="date" class="form-control" name="insert-student" id="insert-date2" value=${selectDate} max=${today}>
            <button id="viewReport" class="btn btn-info" onClick="studentList()">הצג<span
              class="fa fa-arrow-right"></span></button>
          </div>
          <div id="name-group" class="form-group" dir="rtl">
            <label id="insert-message" class="title-input">אשר את נוכחות החניכים במפגש:</label><br>
            <div id="stList" class="checkboxes">

            </div>
          </div>

          <button type="submit" id="confirm-form" class="btn btn-info" onClick="repConfirmation()" >שלח<span
              class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadMenu2(${2})">חזור</button>
        </form>
      </div>
    </section>
          `
  );
 
  for(var i =0; i< howMany; i++){
    var node = document.createElement("input");
    node.setAttribute("type", "checkbox");
    //node.setAttribute("id",`"${names[i]}"`);
    node.setAttribute("id",`"${i}"`);
    node.setAttribute("value", `${names[i]}`);
    node.setAttribute("name", "checkTheSt");
    var textnode = document.createElement("label");
    textnode.innerHTML=names[i];
    var newline=document.createElement("br");
    document.getElementById("stList").appendChild(node);
    document.getElementById("stList").appendChild(textnode);
    document.getElementById("stList").appendChild(newline);
  }
   
}

function repConfirmation(){
 
  var studentsNames = "";
  var coffee = document.forms[0];
  for(var i = 2; i<=(howMany+2); i++){
    if(coffee[i].checked){
      studentsNames += coffee[i].value + `</br>`;
      console.log(coffee[i].value);
    }
  }
  attendanceReport[numOfConfirmRep][2] = studentsNames;
  numOfConfirmRep++;
  howMany = 0;
  //var test = document.getElementById().length;
  //var test =document.InstactorStudentReport.checkTheSt.length;
  //console.log(test);
  //for(var i = 0; i < InstactorStudentReport.checkTheSt.length; i++){
  //  if(InstractorStudentReport.checkTheSt[i].checked) studentsNames += InstractorStudentReport.checkTheSt[i].value + " "; 
  //}
  /*
  attendanceReport[numOfConfirmRep][2] = studentsNames;

  console.log(attendanceReport[numOfConfirmRep][0]);
  console.log(attendanceReport[numOfConfirmRep][1]);
  console.log(attendanceReport[numOfConfirmRep][2]);
  numOfConfirmRep++;
*/
  $("#data-change").replaceWith(
    `
      <section id="data-change">
      <div id="instactorReport" class="sec-design">
        <form id="InstactorStudentReport" class="form-design" name="student_form" method="POST">
          <div id="name-group" class="form-group">
            <label id="insert-student" class="title-input" for="name">יומן הנוכחות אושר בהצלחה</label>
          </div>
          <button type="submit" id="confirm-form" class="btn btn-info" onClick="loadMenu2(${2})" >חזור לתפריט<span
              class="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="loadHome()">התנתק</button>
        </form>
      </div>
    </section>
          `
  );
}

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
        <form id="InstactorStudentReport" class="form-design" name="student_form" method="POST">
          <div id="name-group" class="form-group">
            <label id="insert-student" class="title-input" for="name">הכנס את תאריך המפגש:</label>
            <input type="date" class="form-control" name="insert-student" id="insert-date2" max=${today}>
            <button id="viewReport" class="btn btn-info" onClick="studentList()">הצג<span
              class="fa fa-arrow-right"></span></button>
          </div>
          <div id="name-group" class="form-group" dir="rtl">
            <label id="insert-message" class="title-input">אשר את נוכחות החניכים במפגש:</label><br>
            <div id="stList" class="checkboxes">
            </div>
          </div>

          <button id="go-back" class="btn btn-info" onClick="loadMenu2(${2})">חזור</button>
        </form>
      </div>
    </section>
          `
  );
}



function loadFeedBack() {

  // var code = document.forms["loginCode_form"]["insert-code"].value;

  //if (isNaN(code)) {
  //  alert("הקוד צריך להכיל רק ספרות");
  //  return false;
  // }

  $("#loginCode_form").submit(function (event) {
    if (!$("#loginCode_form").valid()) return;
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
          <div id="loginPhone" class="sec-design">
            
            <form id="student_form" class="form-design" name="student_form" method="POST">
    
              <div id="name-group" class="form-group">
                <label id="insert-student" class="title-input" for="name">הכנס תאריך:</label>
                <input type="date" class="form-control" name="insert-student" id="insert-student" max=${today} required>
              </div>
              <div id="name-group" class="form-group">
                <label class="title-input" for="instructor">בחר מדריך:</label>
                <select name="instructor" id="instructor">
                  <option value="yoni">יוני</option>
                  <option value="moshe">משה</option>
                  <option value="daniella">דניאלה</option>
                </select>
              </div>
              <div id="name-group" class="form-group">
                <label id="insert-message" class="title-input" for="phone">הכנס משוב:</label>
                <textarea type="text" class="form-control" name="insert-code" id="insert-message-textarea" placeholder="feedback"
                  required></textarea>
              </div>
    
              <button type="submit" id="confirm" class="btn btn-info">שלח<span
                  class="fa fa-arrow-right"></span></button>
            </form>
          </div>
        </section>
              `
    );

  });
}







//--------------------------------------------------------

function loadFeedBack() {
  //   $("form[name='loginPhone_form']").validate({
  //     rules: {
  //       name: {
  //         required: true,
  //         minlength: 1,
  //       },
  //       phone: {
  //         required: true,
  //         minlength: 10,
  //         maxlength: 10,
  //       },
  //     },
  //     messages: {
  //         name: {
  //           required: "אנא הכנס את שמך",
  //           minlength: "שם חייב להכיל לפחות תו אחד",
  //         },
  //         phone: {
  //           required: "אנא הכנס את מספר הפלאפון שלך",
  //           minlength: "פלאפון חייב להכיל 10 ספרות",
  //           maxlength: "פלאפון חייב להכיל 10 ספרות",
  //         },
  //       },
  //   });
  $("#loginCode_form").submit(function (event) {
    if (!$("#loginCode_form").valid()) return;
    $("#data-change").replaceWith(
      `
          <section id="data-change">
          <div id="loginPhone" class="sec-design">
            
            <form id="student_form" class="form-design" name="student_form" method="POST">
    
              <div id="name-group" class="form-group">
                <label id="insert-student" class="title-input" for="name">הכנס תאריך:</label>
                <input type="date" class="form-control" name="insert-student" id="insert-student" required>
              </div>
              <div id="name-group" class="form-group">
                <label class="title-input" for="instructor">בחר מדריך:</label>
                <select name="instructor" id="instructor">
                  <option value="yoni">יוני</option>
                  <option value="moshe">משה</option>
                  <option value="daniella">דניאלה</option>
                </select>
              </div>
              <div id="name-group" class="form-group">
                <label id="insert-message" class="title-input" for="phone">הכנס משוב:</label>
                <textarea type="text" class="form-control" name="insert-code" id="insert-message-textarea" placeholder="feedback"
                  required></textarea>
              </div>
    
              <button type="submit" id="confirm" class="btn btn-info">שלח<span
                  class="fa fa-arrow-right"></span></button>
            </form>
          </div>
        </section>
              `
    );

  });
}





function loadManagerMenu() {//////////////////////////////////
  flag = false;
  $("#data-change").replaceWith(`
  <section id="data-change">
    <div id="Manager" class="sec-design"> 
      <form id="Manager" class="form-design" name="student_form" method="POST">
        <button  id="report-button" class="btn btn-info" onClick="viewReport()">צפייה בדו"ח נוכחות<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewStudentFeedback()">צפייה במשובי חניכים<span
        class="fa fa-arrow-right"></span></button>
        <button id="feedback-button" class="btn btn-info" onClick="viewInstructorFeedback()">צפייה במשובי מדריכים<span
        class="fa fa-arrow-right"></span></button>
      </form>
    </div>
  </section>
`);
}

function viewReport() {
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
          <input type="date" class="form-control" name="insert-date" id="insert-date" max=${today}>
          <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
          <input type="text" class="form-control" name="instName" id="instName" placeholder="Name" minlength="2" required>
          <button id="viewReport" class="btn btn-info" onClick="printReport()">הצג<span
            class="fa fa-arrow-right"></span></button>
        </div>
        <div id="name-group" class="form-group" dir="rtl">
          <label id="insert-message" class="title-input">החניכים שנכחו במפגש:</label><br>
          <div  class="report">
          </div>
        </div>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${3})">חזור</button>
      </form>
    </div>
  </section>
        `
  );
}
function printReport(){
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
          <button id="viewReport" class="btn btn-info" onClick="printReport()">הצג<span
            class="fa fa-arrow-right"></span></button>
        </div>
        <div id="name-group" class="form-group" dir="rtl">
          <label id="insert-message" class="title-input">החניכים שנכחו במפגש:</label><br>
          <div  id="report" class="report">
          </div>
        </div>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${3})">חזור</button>
      </form>
    </div>
  </section>
        `
  );
  console.log("IM here1");

    for (var i=0;i<numOfConfirmRep; i++){
      console.log("IM here2");
      if(attendanceReport[i][0]==selectDate && attendanceReport[i][1]==guide){
        console.log("IM here3");

        var list=document.createElement("p");
        list.innerHTML=attendanceReport[i][2];
        console.log(attendanceReport[i][0]);
        console.log(attendanceReport[i][1]);
        console.log(attendanceReport[i][2]);
        document.getElementById("report").appendChild(list);
        break;
      }
    }
}
//<select name="instactors" class="form-control" id="instactor-select">
//<option value="">-בחר מדריך מהרשימה-</option>
function viewStudentFeedback() {
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
    <div id="studentFeedback" class="sec-design">
      <form id="studentFeedback" class="form-design" name="student_form" method="POST">
        <div id="name-group" class="form-group">
          <label id="insert-student" class="title-input" for="name">שלום מנהל,
          על מנת לצפות במשוב בחר תאריך:          
          </label>
          <input type="date" class="form-control" name="insert-date" id="insert-date" max=${today} required> 
          <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
          <input type="text" class="form-control" name="instName" id="instName" placeholder="Name" minlength="2" required>
            <button id="viewReport" class="btn btn-info" onClick="showFeedback()">הצג<span
            class="fa fa-arrow-right"></span></button>
          </div>
        <div id="name-group" class="form-group" dir="rtl">
          <div  class="report" id="report">
            <table id="feedList">
              <tr>
                <th>נושא המפגש</th>
                <th>באיזה מידה המפגש היום חידש לך/למדת דברים חדשים:</th>
                <th>באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד:</th>
                <th>באיזה מידה נושא המפגש היה רלוונטי עבורך:</th>
                <th>שאלות ומחשבות לשיחת הדרכה הבאה</th>
              </tr>

            </table>
          </div>
        </div>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${3})">חזור</button>
      </form>
    </div>
  </section>
        `
  );
}
function showFeedback(){ 
  var selectDate = document.getElementById("insert-date").value;
  var guide = document.getElementById("instName").value;
  console.log(guide);
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
    <div id="managerStudentFeedback" class="sec-design">
      <form id="studentFeedback" class="form-design" name="student_form" method="POST">
        <div id="name-group" class="form-group">
          <label id="insert-student" class="title-input" for="name">שלום מנהל,
          על מנת לצפות במשוב בחר תאריך:          
          </label>
          <input type="date" class="form-control" name="insert-date" id="insert-date" max=${today}  value=${selectDate} required> 
          <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
          <input type="text" class="form-control" name="instName" id="instName" value="${guide}" minlength="2" required>
            <button id="viewReport" class="btn btn-info" onClick="showFeedback()">הצג<span
            class="fa fa-arrow-right"></span></button>
          </div>
        <div id="name-group" class="form-group" dir="rtl">
          <div  class="report" id="report">
            <table id="feedList">
              <tr>
                <th>נושא המפגש</th>
                <th>באיזה מידה המפגש היום חידש לך/למדת דברים חדשים:</th>
                <th>באיזה מידה אתה מרגיש שהמפגש יעזור לך בעתיד:</th>
                <th>באיזה מידה נושא המפגש היה רלוונטי עבורך:</th>
                <th>מה את/ה לוקח/ת מהמפגש היום</th>
              </tr>

            </table>
          </div>
        </div>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${3})">חזור</button>
      </form>
    </div>
  </section>
        `
  );


    for(var i=0 ; i<studentDataCounter;i++){
      if(studentData[i][1]==guide && studentData[i][0]==selectDate){
        var tr=document.createElement("tr");
        var td1=document.createElement("td");
        td1.innerHTML=studentData[i][2];
        var td2=document.createElement("td");
        td2.innerHTML=studentData[i][3];
        var td3=document.createElement("td");
        td3.innerHTML=studentData[i][4];
        var td4=document.createElement("td");
        td4.innerHTML=studentData[i][5];
        var td5=document.createElement("td");
        td5.innerHTML=studentData[i][6];
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        document.getElementById("feedList").appendChild(tr);
      }
    }
}

function viewInstructorFeedback() {
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
    <div id="studentFeedback" class="sec-design">
      <form id="studentFeedback" class="form-design" name="student_form" method="POST">
        <div id="name-group" class="form-group">
          <label id="insert-student" class="title-input" for="name">שלום מנהל,
          על מנת לצפות במשוב בחר תאריך:          
          </label>
          <input type="date" class="form-control" name="insert-student" id="insert-student" max=${today}>
            <button id="viewReport" class="btn btn-info">הצג<span
            class="fa fa-arrow-right"></span></button>
          </div>
        <div id="name-group" class="form-group" dir="rtl">
          <div  class="report">
          </div>
        </div>
        <button id="go-back" class="btn btn-info" onClick="loadMenu2(${3})">חזור</button>
      </form>
    </div>
  </section>
        `
  );
}
onLoad = function () {
  loadHome();
};

//--------------------------------------------------------

$("document").ready(onLoad);