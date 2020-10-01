import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firebase-firestore'

const firebaseConfig = {
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
export const auth = firebase.auth();
export const db = firebase.firestore();

export default firebase;


export async function RegisterUser(email,user) {
    await db.collection("waitforapproval").doc(email).set(user);
    return;
}
export async function DeleteUser(email,) {
    await db.collection("waitforapproval").doc(email).delete();
    return;
}

export async function CreateUser(user) {
    console.log(user)
    var res = await auth.createUserWithEmailAndPassword(user.email,user.phone)
    auth.currentUser.updateProfile({displayName:user.fname+" "+ user.lname})
    await  db.collection(user.type).doc(res.user.uid).set(user)
    var team=await db.collection('Teams').doc(user.team.id);
    team.set({
        name: user.teamName,
        guide: db.doc('guides/'+res.user.uid)
    })

    // await db.collection("waitforapproval").doc(user.email).delete();
    await DeleteUser(user.email)
    console.log("done the user is ready")
    return true;
}

//
// class Firebase {
//     constructor() {
//         firebase.initializeApp(firebaseConfig)
//         this.auth = firebase.auth()
//         this.db = firebase.firestore()
//     }
//
//     login(email, password) {
//         return this.auth.signInWithEmailAndPassword(email, password)
//     }
//
//     logout() {
//         return this.auth.signOut()
//     }
//
//     async register(name, email, password) {
//         await this.auth.createUserWithEmailAndPassword(email, password)
//         return this.auth.currentUser.updateProfile({
//             displayName: name
//         })
//     }
//
//
//
//     isInitialized() {
//         return new Promise(resolve => {
//             this.auth.onAuthStateChanged(resolve)
//         })
//     }
//
//     getCurrentUsername() {
//         return firebase.auth().currentUser //&& this.auth.currentUser.displayName
//     }
//
// }

// export default Firebase;