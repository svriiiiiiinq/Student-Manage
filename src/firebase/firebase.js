import { initializeApp } from 'firebase/app';
import { getAuth, GoogleAuthProvider } from 'firebase/auth';


// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyByKZN8f8SQ5-5J3EQ9C5DRsSt7KBfN-RQ",
  authDomain: "login-5fe56.firebaseapp.com",
  projectId: "login-5fe56",
  storageBucket: "login-5fe56.appspot.com",
  messagingSenderId: "937602858388",
  appId: "1:937602858388:web:de327daf5802e09b196381",
  measurementId: "G-HK3SQDCV37"

};
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };