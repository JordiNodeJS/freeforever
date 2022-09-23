import { db } from '../firebase.config'
import { collection, addDoc, updateDoc } from 'firebase/firestore'

export const startNewPublicPost = async newPublicPost => {
  const userCollectionRef = collection(db, `public`)
  const newPostRef = await addDoc(userCollectionRef, newPublicPost)

  await updateDoc(newPostRef, { id: newPostRef.id, ...newPublicPost })
}
