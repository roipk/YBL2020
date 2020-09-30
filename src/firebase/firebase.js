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
    console.log(user)
    console.log(email)
    await db.collection("waitforapproval").doc(email).set(user);
    return;
}
export async function DeleteUser(email,) {
    await db.collection("waitforapproval").doc(email).delete();
    return;
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