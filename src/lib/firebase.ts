// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyDZadCa4Ie85r3XRiqKBschGDW1pW0Qp6A',
  authDomain: 'tech-net-b3733.firebaseapp.com',
  projectId: 'tech-net-b3733',
  storageBucket: 'tech-net-b3733.appspot.com',
  messagingSenderId: '502481846510',
  appId: '1:502481846510:web:39d99441ee30c0781433ff',
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
