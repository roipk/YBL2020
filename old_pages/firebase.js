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
var db = firebase.firestore();
// console.log(ref);
//
// ref.on("value", function(snapshot) {
//     snapshot.forEach(function(childSnapshot) {
//         var childData = childSnapshot.val();
//         var id=childData.uid;
//         // console.log(childData);
//
//     });
// });

async function writeUserData(phone,name,email,pass) {

    var user =await checkIfUserExist(phone);
    console.log(user);
    if (!user) {

        const data = {
            name: name,
            email: email,
            phone: phone,
            password: pass,
            active: false
        };
        const res = await db.collection('waitforapproval').doc(phone).set(data);


        // firebase.database().ref('waitforapproval/' + phone).set({
        //     name: name,
        //     email: email,
        //     phone : phone,
        //     password : pass,
        //     active : false
        // }).then( res => {
        //
            alert(name + "הרשמתך בוצעה בהצלחה להמשך תהליך המנהל יצור איתך קשר");

        //
        // }).catch( err => {
        //     console.log(err);
        // });
    }
    else
    {
        // var user = await firebase.database().ref("waitforapproval" + phone).once("value");
        var user = await firebase.firestore().collection("waitforapproval").doc(phone).get();
        if(user.exists)
            alert("המספר קיים במערכת ממתין לאישור מנהל")
        else
            alert("המספר פלאפון קיים במערכת נא להתחבר ממספר אחר")
    }
}





async function checkIfUserExist(phone){
    var user;
    var path=["guide/","students/","waitforapproval/"]
    var i =0;
    for(; i<path.length; i++)
    {
        var user = await firebase.firestore().collection(path[i]).doc(phone).get();
        // user = await firebase.database().ref(path[i] + phone).once("value");
        if(user.exists)
        {
            return true;
        }
    }
    return  false; 
}

async function authUsers(role){
    var root = firebase.database().ref();
    var database = root.child('waitforapproval');
    database.once('value', function(snapshot){
        snapshot.forEach(function(data){
            var uid = data.key;
            firebase.database().ref(role+'/'+uid).set({
                name: data.val().name,
                email: data.val().email,
                phone : data.val().phone,                    
                password : data.val().password,
                active : true
            });
        });
    });
}