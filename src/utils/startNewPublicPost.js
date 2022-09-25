import { db } from '../firebase.config'
import { collection, addDoc, updateDoc } from 'firebase/firestore'

/**
 * It creates a new document in the public collection, then updates the document with the id of the
 * document
 */
export const startNewPublicPost = async newPublicPost => {
  const userCollectionRef = collection(db, `public`)
  const newPostRef = await addDoc(userCollectionRef, newPublicPost)

  await updateDoc(newPostRef, { id: newPostRef.id, ...newPublicPost })
}
