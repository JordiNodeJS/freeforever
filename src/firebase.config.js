import firebase from 'firebase/compat/app'
import "firebase/compat/firestore"
import "firebase/compat/auth";



const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

firebase.initializeApp(firebaseConfig)
const db = firebase.firestore()

const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

export {googleAuthProvider, db, firebase }
// https://firebase.google.com/docs/web/modular-upgrade