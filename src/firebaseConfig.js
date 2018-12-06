import firebase from 'firebase'

var config = {
    apiKey: "AIzaSyAhWs1eWG8-ewry4u7yAdaKr1XPmCwu1AY",
    authDomain: "cwiczenia-fde2d.firebaseapp.com",
    databaseURL: "https://cwiczenia-fde2d.firebaseio.com",
    projectId: "cwiczenia-fde2d",
    storageBucket: "cwiczenia-fde2d.appspot.com",
    messagingSenderId: "815383616927"
  }
firebase.initializeApp(config)

export const auth = firebase.auth()
export const database = firebase.database()
export const googleProvider = new firebase.auth.GoogleAuthProvider()
