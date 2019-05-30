import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCo809TblgI6Wg-6g3FZHOCLPNmiAUcqpY",
    authDomain: "becky-robinson-project-5.firebaseapp.com",
    databaseURL: "https://becky-robinson-project-5.firebaseio.com",
    projectId: "becky-robinson-project-5",
    storageBucket: "",
    messagingSenderId: "816168745422",
    appId: "1:816168745422:web:7ac7f4af6eb71cef"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;