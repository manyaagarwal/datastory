import 'firebase/auth'; 
import 'firebase/firestore'; 
import 'firebase/storage';
import FirebaseModule from 'firebase/app'; 

let firebaseInitialized = false; 

let firebaseConfig = {
    apiKey: "AIzaSyAZpRjt0UxDjm4y5AouJ4C-N6oQ37eXRK4",
    authDomain: "datastory-a3e39.firebaseapp.com",
    databaseURL: "https://datastory-a3e39.firebaseio.com",
    projectId: "datastory-a3e39",
    storageBucket: "datastory-a3e39.appspot.com",
    messagingSenderId: "665569053665",
    appId: "1:665569053665:web:02146f6e905b51d3afa0a0"
  };

FirebaseModule.initializeApp(firebaseConfig); 

firebaseInitialized = true; 

let db; 
let auth;
let storage;

if(firebaseInitialized){ 
    db = FirebaseModule.firestore();
    auth = FirebaseModule.auth();
    storage = FirebaseModule.storage();
}

export const Firebase = firebaseInitialized ? FirebaseModule : null;
export const FirebaseAuth = firebaseInitialized ? auth : null;
export const FirebaseDB = firebaseInitialized ? db : null;
export const FirebaseStorage = firebaseInitialized ? storage : null;