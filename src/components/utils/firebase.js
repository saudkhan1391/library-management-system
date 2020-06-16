import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';
const firebaseConfig = {
    apiKey: "AIzaSyAHLTSuTxK7BNIM1vUkaX5yP0jaQ7I2S6Y",
    authDomain: "demoapp2-5c1fe.firebaseapp.com",
    databaseURL: "https://demoapp2-5c1fe.firebaseio.com",
    projectId: "demoapp2-5c1fe",
    storageBucket: "demoapp2-5c1fe.appspot.com",
    messagingSenderId: "883587269905",
    appId: "1:883587269905:web:663b6ba7632396d53f38b0",
    measurementId: "G-X47BNT7NLC"
  };
let InitFirebase;
// if (!firebase.apps.length) {
//     InitFirebase = firebase.initializeApp(firebaseConfig);
// }
// 
try{
    InitFirebase = firebase.initializeApp(firebaseConfig);
    console.log( "database in utils",firebase.database());
}catch(e){
    console.log("error in utils firebase", e);
}
export default InitFirebase;