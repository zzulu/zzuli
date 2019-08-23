import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
  apiKey: process.env.VUE_APP_FIREBASE_API_KEY,
  authDomain: "zzuli-a.firebaseapp.com",
  projectId: "zzuli-a",
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();

export default firebase;
