function signup() {
  $("#data-change").replaceWith(
      `
      <section id="data-change">
        <div id="signup" class="sec-design">
          <form id="signup_form" class="form-design" name="signup_form" onsubmit="return sendDataToFirebase()" method="POST">
            <div id="name-group" class="form-group">
              <label id="insert-name" class="signup-input">שם מלא:</label>
              <input type="text" class="form-control" name="fullName" id="fullName" minlength="2" required>
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
            <button type="button" id="confirm" onClick="sendDataToFirebase()" class="btn btn-info" >הרשם<span
                class="fa fa-arrow-right"></span></button>
  
            <button id="go-back" class="btn btn-info" onClick="homepage()">חזור</button>
  
          </form>
        </div>
      </section>
      `
  );
}


function sendDataToFirebase() {
  console.log("in")
  var name = signup_form.fullName.value;
  var phoneNum = signup_form.phoneNumber.value;
  var email= signup_form.email.value;
  var password = signup_form.password.value;
  writeUserData(phoneNum,name,email,password);
}


// export {signup};
  