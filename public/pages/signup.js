
import {homepage} from './home.js'
import {login} from './login.js'


function signup() {
    $("#data-change").replaceWith(
      `
      <section id="data-change">
        <div id="loginPhone" class="sec-design">
          <form id="loginPhone_form" class="form-design" name="loginPhone_form">
  
            <div id="name-group" class="form-group">
              <label id="insert-name" class="signup-input">שם מלא:</label>
              <input type="text" class="form-control" name="fullName" id="fullName" minlength="2" required>
            </div>
            <div id="name-group" class="form-group">
                <label id="insert-guideName" class="signup-input">שם המדריך:</label>
                <input type="text" class="form-control" name="guideName" id="guideName" minlength="2" required>
            </div>
            <div id="name-group" class="form-group">
              <label id="insert-mail" class="signup-input">אימייל:</label>
              <input type="email" class="form-control" name="email" id="email" required>
            </div>
            <div id="name-group" class="form-group">
                <label id="insert-phone" class="signup-input">מספר טלפון</label>
                <input type="text" class="form-control" name="phoneNumber" id="phoneNumber"  required>
            </div>
            <div id="name-group" class="form-group">
                <label id="insert-password" class="signup-input">בחר סיסמא:</label>
                <input type="password" class="form-control" name="password" id="password" required>
            </div>
            <button type="submit" id="confirm" onClick="login()" class="btn btn-info">הרשם<span
                class="fa fa-arrow-right"></span></button>
  
            <button id="go-back" class="btn btn-info" onClick="homepage()">חזור</button>
  
          </form>
        </div>
      </section>
      `
    );
  }



  export {signup};
  