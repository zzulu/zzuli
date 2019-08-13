import firebase from 'firebase/app';
import 'firebase/firestore';

export const db = firebase
  .initializeApp({ projectId: 'zzuli-a' })
  .firestore()

export const serverTimestamp = firebase.firestore.FieldValue.serverTimestamp();
