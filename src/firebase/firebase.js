import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/firebase-auth'

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

export const db = firebase.firestore();
export const auth = firebase.auth();
export default firebase
