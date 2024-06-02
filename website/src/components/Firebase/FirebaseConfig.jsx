import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyAVkz2uwsXtpMMinTrRzHp7rM9cdGLxU_U",
    authDomain: "jp-website-410806.firebaseapp.com",
    projectId: "jp-website-410806",
    storageBucket: "jp-website-410806.appspot.com",
    messagingSenderId: "172010537526",
    appId: "1:172010537526:web:2e76ff27bf1430896a4e97",
    measurementId: "G-H62JRFHG5J"
  };

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export { analytics };