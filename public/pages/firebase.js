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
// console.log(ref);

ref.on("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
        var childData = childSnapshot.val();
        var id=childData.uid;
        // console.log(childData);

    });
});

async function writeUserData(phone, name, email, pass) {
    console.log(phone);
    var user =await checkIfUserExist(phone);
    console.log(user);
    if (!user){

        firebase.database().ref('waitforapproval/' + phone).set({
            name: name,
            email: email,
            phone : phone,
            password : pass,
            active : false
        }).then( res => {
<<<<<<< refs/remotes/origin/master

            alert(name + "הרשמתך בוצעה בהצלחה להמשך תהליך המנהל יצור איתך קשר");

=======
            alert(name +  "פרטיך נשלחו בהצלחה ");
>>>>>>> update firebase file

        }).catch( err => {
            console.log(err);
        });
    }
    else
    {
        var user = await firebase.database().ref("waitforapproval" + phone).once("value");
        if(user.exists())
            alert("המספר קיים במערכת ממתין לאישור מנהל")
        else
            alert("המספר פלאפון קיים במערכת נא להתחבר ממספר אחר")
    }
}

<<<<<<< refs/remotes/origin/master
=======
function checkIfUserExist(phone, name, email, pass){
    firebase.database().ref(`waitforapproval/${phone}`).once("value", snapshot => {
        if (snapshot.exists()){
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
>>>>>>> update firebase file




async function checkIfUserExist(phone, name, email, pass){
    var user;
    var path=["guide/","students/","waitforapproval/"]
    var i =0;
    for(; i<path.length; i++)
    {
        user = await firebase.database().ref(path[i] + phone).once("value");
        if(user.exists())
        {
            return true;
        }
    }
    return  false;

    
}