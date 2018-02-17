import firebase from 'firebase';

const config = {
  apiKey: "AIzaSyDX0Pd2NRjBrNfWNX0uDTAgAnC5h-pH_zg",
  authDomain: "humane-league-fan.firebaseapp.com",
  databaseURL: "https://humane-league-fan.firebaseio.com",
  projectId: "humane-league-fan",
  storageBucket: "",
  messagingSenderId: "643589694508"
};

firebase.initializeApp(config);



export const auth = firebase.auth();
export const db = firebase.database();
export default firebase;