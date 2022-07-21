// import firebase from 'firebase/compat/app'
// import 'firebase/compat/firestore'
// import 'firebase/compat/auth'
// import { updateProfile } from 'firebase/auth'
import { initializeApp } from 'firebase/app';
import { getFirestore} from 'firebase/firestore';
import { getAuth, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleAuthProvider = new GoogleAuthProvider()

export const db = getFirestore(app);


// firebase.initializeApp(firebaseConfig)
// const db = firebase.firestore()

// const googleAuthProvider = new firebase.auth.GoogleAuthProvider()

// export { googleAuthProvider, db, firebase, updateProfile }
// https://firebase.google.com/docs/web/modular-upgrade
