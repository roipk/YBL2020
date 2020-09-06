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
    firebase.database().ref('users/' + phone).set({
        username: name,
        email: email,
        phone : phone,
        password : pass
    });
}