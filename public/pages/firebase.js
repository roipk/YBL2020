var firebaseConfig = {
    apiKey: "AIzaSyD91v4LsW6wytMO6tJoUE7xyVz6BLTm5jk",
    authDomain: "ybl-project-b5e04.firebaseapp.com",
    databaseURL: "https://ybl-project-b5e04.firebaseio.com",
    projectId: "ybl-project-b5e04",
    storageBucket: "ybl-project-b5e04.appspot.com",
    messagingSenderId: "288673703911",
    appId: "1:288673703911:web:e0cc3b8ea3fc61019c3f42",
    measurementId: "G-1RWZH22PZ6"
};
firebase.initializeApp(firebaseConfig);
firebase.analytics();


const auth = firebase.auth();
var ref = firebase.database().ref("students");
console.log(ref);

ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var id=childData.uid;
        console.log(childData);

    });
});
console.log();

function writeUserData(phone, name, email, pass) {
    console.log(phone);
    if (checkIfUserExist(phone) != true){
        
        firebase.database().ref('waitforapproval/' + phone).set({
            name: name,
            email: email,
            phone : phone,
            password : pass,
            active : false
        }).then( res => {
            alert(name + "פרטיך נשלחו בהצלחה ");

        }).catch( err => {
            console.log(err);
        });
    }
}

function checkIfUserExist(phone, name, email, pass){
    firebase.database().ref(`waitforapproval/${phone}`).once("value", snapshot => {
        if (snapshot.exists()){
            console.log(snapshot);
            alert("משתמש רשום, אנא המתן לאישור מנהל");
        }
        else{
            firebase.database().ref(`students/${phone}`).once("value", snapshot => {
                if (snapshot.exists()){
                    alert("מספר הטלפון כבר קיים במערכת");
                }
                else{
                    firebase.database().ref(`guide/${phone}`).once("value", snapshot => {
                        if (snapshot.exists()){
                            alert("מספר הטלפון כבר קיים במערכת");
                        }
                        else{
                            firebase.database().ref(`managers/${phone}`).once("value", snapshot => {
                                if (snapshot.exists()){
                                    alert("מספר הטלפון כבר קיים במערכת");
                                }
                                else{
                                    writeUserData(phone, name, email, pass);
                                }
                            });
                        }
                    });
                }
             });
        }
     });



    
}