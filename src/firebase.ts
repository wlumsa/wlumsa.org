import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

export const firebaseConfig = {
    apiKey: "AIzaSyCc8svDI8fWLGiCRFtp30wriwO5v_9T1jA",
    authDomain: "wlumsa-website-f73df.firebaseapp.com",
    projectId: "wlumsa-website-f73df",
    storageBucket: "wlumsa-website-f73df.appspot.com",
    messagingSenderId: "277258390440",
    appId: "1:277258390440:web:323d7d684891ff7bd6eb9d",
    measurementId: "G-47ZQGSCJM6"
  };

export const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
const db = getFirestore(app);


export default db;