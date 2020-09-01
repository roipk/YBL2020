var firebaseConfig = {
    apiKey: "AIzaSyCkADIn_Q54_aqu0sdgcorA0sG2MU4OFbs",
    authDomain: "ybl2020.firebaseapp.com",
    databaseURL: "https://ybl2020.firebaseio.com",
    projectId: "ybl2020",
    storageBucket: "ybl2020.appspot.com",
    messagingSenderId: "867453336807",
    appId: "1:867453336807:web:24e36cf68be1f035d43642",
    measurementId: "G-DKG2V8E9KB"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(
    "recaptcha-container",
    {
      size: "normal",
      callback: function(response) {
        submitPhoneNumberAuth()
      }
    }
  );



  function submitPhoneNumberAuth() {
    $("#loginPhone_form").submit(function (event) {
      if (!$("#loginPhone_form").valid()) return;
      var phoneNumber = document.getElementById("phoneNumber").value;
      var appVerifier = window.recaptchaVerifier;
      firebase
        .auth()
        .signInWithPhoneNumber(phoneNumber, appVerifier)
        .then(function(confirmationResult) {
          window.confirmationResult = confirmationResult;
        })
        .catch(function(error) {
          console.log(error);
        }); 
    });
  }