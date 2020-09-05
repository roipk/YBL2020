import {loadMenu} from './stud_menu.js'
import {homepage} from './home.js'

function studentFeedback(){
 
    $("#data-change").replaceWith(
      `
      <section id="data-change">
      <div id="loginPhone" class="sec-design1">
        
        <form id="student_feed" class="form-design" name="student_feed">
  
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
          <button type="submit" id="confirm-form" class="btn btn-info" onClick="${fBConfirmation()}">דווח נוכחות ושלח משוב<spanclass="fa fa-arrow-right"></span></button>
          <button id="go-back" class="btn btn-info" onClick="${loadMenu()}">חזור</button>
  
        
              
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
            <button id="go-back" class="btn btn-info" onClick="${homepage()}">התנתק</button>
          </form>
        </div>
      </section>
            `
    );
  }

export {studentFeedback};