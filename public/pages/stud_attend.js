// import {loadMenu} from './stud_menu.js'
// import {studentFeedback} from './stud_feedback.js'

function attendReport(){
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
        <div id="attendreport" class="sec-design">
            
            <form id="student_form" class="form-design" name="student_form">
    
            <div id="name-group" class="form-group">
                <label id="insert-student" class="title-input" for="name">בחר את תאריך המפגש: </label>
                <input type="date" class="form-control" id="insert-date" name="insert-date" max=${today} required>
                
            </div>
    
            <div id="name-group" class="form-group">
            <label id="insert-name" class="title-input" for="name"> הזן את שם המדריך:</label>
            <input type="text" class="form-control" name="instName" id="instName" placeholder="Name" minlength="2" required>
            </div>
        
    
            <button type="submit" id="confirm-form" class="btn btn-info" onClick="studentFeedback()">המשך<spanclass="fa fa-arrow-right"></span></button>
            <button id="go-back" class="btn btn-info" onClick="studLoadMenu()">חזור</button>
                
            </form>
        </section>
          `
    );
  }


  // export {attendReport};