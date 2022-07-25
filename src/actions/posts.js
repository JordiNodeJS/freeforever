import { auth } from '../firebase.config'
import { types } from '../types'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'


export const startNewPost = () => async (dispatch, getState) => {
  const {
    auth: { uid, name },
  } = getState()
  console.log(name, uid)

  const newPost = {
    title: '',
    body: '',
    date: new Date().getTime(),
  }
  const userCollectionRef = collection(db, `${name}_${uid}/record/posts`)
    const newPostRef = await addDoc(userCollectionRef, {
        ...newPost,
        uid,
        name,
        })
    console.log(newPostRef)

//   const docRef = await db.collection(`${name}${uid}/record/posts`).add({
//     ...newPost,
//     uid,
//     name,
//     })
//     console.log(docRef)
    // dispatch(createPost(docRef.id, newPost))

//   const doc = db.collection(`${name}${uid}/record/posts`).add({
//     ...newPost,
//     uid,
//     name,
//     })
//     .then(docRef => {
//         console.log('Document written with ID: ', docRef.id)
//         dispatch(createPost({ ...newPost, id: docRef.id }))
//     }
//     )
//     .catch(error => {
//         console.error('Error adding document: ', error)
//     }
//     )


  //   if (auth.uid) {
  //     dispatch(setNewPost(true))
  //   }
}
