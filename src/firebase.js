import firebase from "firebase"
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyB2aAW3iCsil6lw_VAlkopDEON_iPIKHJs",
    authDomain: "covid19-tracker-6ae25.firebaseapp.com",
    projectId: "covid19-tracker-6ae25",
    storageBucket: "covid19-tracker-6ae25.appspot.com",
    messagingSenderId: "543319031064",
    appId: "1:543319031064:web:47ab79955ccd4902fd326d"
};

// init app
const firebaseApp = firebase.initializeApp(firebaseConfig)
// grab firestore
const db = firebaseApp.firestore();
// get auth ready 
const auth = firebase.auth()

// export db, auth so react component can use it 
export { db, auth }