// Import the functions you need from the SDKs you need
import {initializeApp} from 'firebase/app';
import {getStorage} from 'firebase/storage';
import {getAnalytics} from 'firebase/analytics';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyDbkcQ27Inp_4vSKD-2VIIKWCKe4ls_R_g',
  authDomain: 'justjio.firebaseapp.com',
  projectId: 'justjio',
  storageBucket: 'justjio.appspot.com',
  messagingSenderId: '168508052727',
  appId: '1:168508052727:web:30be58830bd1a5531eeff2',
  measurementId: 'G-LZRCM4QZBV',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const storage_bucker = getStorage(app);
