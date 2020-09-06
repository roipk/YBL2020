// import {homepage} from './home.js'

function login(permission) {
    console.log(permission)
    $("#data-change").replaceWith(
      `
      <section id="data-change">
        <div id="loginPhone" class="sec-design">
          <form id="loginPhone_form" class="form-design" name="loginPhone_form" >
  
            <div id="name-group" class="form-group">
              <label id="insert-phone" class="title-input" for="phone">הכנס מספר טלפון להזדהות:</label>
              <input type="text" class="form-control" name="phoneNumber" id="phoneNumber"  placeholder="Phone Number" 
              required>
            </div>
  
            <button type="submit" id="confirm" onClick="loadCode(${permission})" class="btn btn-info">שלח קוד לנייד<span
                class="fa fa-arrow-right"></span></button>
            <div id="recaptcha-container"></div>
  
            <button id="go-back" class="btn btn-info" onClick="homepage()">חזור</button>
  
          </form>
        </div>
      </section>
      `
    );
  }

function loginEmail(permission) {
    $("#data-change").replaceWith(
      `
      <section id="data-change">
        <div id="loginPhone" class="sec-design">
          <form id="loginPhone_form" class="form-design" name="loginPhone_form" >
  
            <div id="name-group" class="form-group">
              <label id="insert-phone" class="title-input" for="phone">אימייל:</label>
              <input type="email" class="form-control" name="email" id="email"  required>
            </div>
            <div id="name-group" class="form-group">
                <label id="insert-phone" class="title-input" for="phone">סיסמא:</label>
                <input type="password" class="form-control" name="password" id="password" required>
            </div>
            <button type="submit" id="confirm" onClick="" class="btn btn-info">התחבר<span
                class="fa fa-arrow-right"></span></button>
            <div id="recaptcha-container"></div>
  
            <button id="go-back" class="btn btn-info" onClick="homepage()">חזור</button>
  
          </form>
        </div>
      </section>
      `
    );
  } 

  function loadCode(permission) {
    $("#loginPhone_form").submit(function (event) {
      if (!$("#loginPhone_form").valid()) return;
  
      var name = loginPhone_form.firstName.value;
      var phoneNum = loginPhone_form.phoneNumber.value;
  
        connectedUserName = name;
        $("#data-change").replaceWith(
          `
          <section id="data-change">
          <div id="loginCode" class="sec-design">
          <form id="loginCode_form" class="form-design" name="loginCode_form" method="POST">
          
          <div id="name-group" class="form-group">
          <label id="insert-code" class="title-input" for="code">הכנס את הקוד שנשלח לך לנייד:</label>
          <input type="text" class="form-control" name="insert-code" id="insert-code" placeholder="Code" pattern="[0-9]{6}" required>
          </div>
          
          <button type="submit" id="confirm" onClick="" class="btn btn-info">התחבר<span
          class="fa fa-arrow-right"></span></button>
          </form>
          </div>
          </section>
          `
          );
        
    });
  
  }


  // export {login, loginEmail};
  