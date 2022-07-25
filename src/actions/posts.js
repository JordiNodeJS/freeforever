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
    id: uid,
    author: name,
    title: 'My new post',
    body: 'Post body',
    date: new Date().getTime(),
  }
  const userCollectionRef = collection(db, `${name.split(' ').join('')}_${uid}/record/posts`)
    const newPostRef = await addDoc(userCollectionRef, { newPost})
    console.log(newPostRef)
    dispatch(activePost(newPostRef.id, newPost))

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

const activePost = (id, post) => {
  return {
    type: types.postsActive,
    payload: {
      id,
      ...post,
    },
  }
}
