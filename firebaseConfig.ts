import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';

export const firebaseConfig = {
  apiKey: 'AIzaSyBuqlDtsHuKUQxc23uPyCl1QMPSpFqbUmo',
  authDomain: 'myreactnative-14faa.firebaseapp.com',
  projectId: 'myreactnative-14faa',
  storageBucket: 'myreactnative-14faa.appspot.com',
  messagingSenderId: '829909991527',
  appId: '1:829909991527:web:8eb3da73e43d15b6a714c2',
  measurementId: 'G-L0RDP8YTXP',
  // databaseURL: 'https://myreactnative-14faa-default-rtdb.firebaseio.com/post',
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const db = firebase.firestore();
