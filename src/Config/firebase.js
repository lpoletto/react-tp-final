import * as firebase from 'firebase';


// Your web app's Firebase configuration
const firebaseConfig = {
  /*apiKey: "AIzaSyAw1NKc9lctz-g2PNINeUS6VGKvFsLIJuo",
  authDomain: "modulo3-tp1.firebaseapp.com",
  databaseURL: "https://modulo3-tp1.firebaseio.com",
  projectId: "modulo3-tp1",
  storageBucket: "modulo3-tp1.appspot.com",
  messagingSenderId: "115673523450",
  appId: "1:115673523450:web:4e3ba0154cc7c4cfb19543"*/

  apiKey: "AIzaSyCaQ9EOXY1AQTEhscGhyoITH_U0EU4HAWM",
  authDomain: "react-firebase-login-36b9e.firebaseapp.com",
  databaseURL: "https://react-firebase-login-36b9e.firebaseio.com",
  projectId: "react-firebase-login-36b9e",
  storageBucket: "react-firebase-login-36b9e.appspot.com",
  messagingSenderId: "1009251232553",
  appId: "1:1009251232553:web:1d7eef49cbb2ff4eae2538",
  measurementId: "G-H5JYBY7588" 
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

db.settings({
  timestampsInSnapshots: true
});

//firebase.auth = firebase.auth();
firebase.db=db;
export default firebase;
