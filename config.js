import { initializeApp } from "firebase/app";
import { getAuth, setPersistence, browserSessionPersistence } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyA1OP17wEALL8pckJv0CIVLRqeROB6T_l0",
    authDomain: "login-c36d3.firebaseapp.com",
    projectId: "login-c36d3",
    storageBucket: "login-c36d3.firebasestorage.app",
    messagingSenderId: "335291832103",
    appId: "1:335291832103:web:d790901cabd6b46fabfb02",
    measurementId: "G-G0016251YB"
  };

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

  // Set session persistence (clears on browser tab close)
setPersistence(auth, browserSessionPersistence)
.catch((error) => {
  console.error("Error setting persistence:", error);
});

  export default app;