import { types } from '../types'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { loadPosts } from '../helpers/loadPosts'


export const startNewPost = () => async (dispatch, getState) => {
  const {
    auth: { uid, name },
  } = getState()
  
  const auth = getState().auth
  
  const newPost = {
    uid: uid,
    author: name,
    title: 'My new post',
    body: 'Post body',
    date: new Date().getTime(),
  }
  const userCollectionRef = collection(db, `${uid}/record/posts`) //${name.split(' ').join('')}_${uid}
  const newPostRef = await addDoc(userCollectionRef, newPost )

    console.log(name, uid)
    console.log(auth)
    console.log('newPostRef', newPostRef)
    console.log('newPostRef.id', newPostRef.id)

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

export const startFetchPosts = uid => async dispatch => {
  const notes = await loadPosts(uid)
  dispatch(setPosts(notes))
}


export const setPosts = posts => ({
  type: types.postsFetch,
  payload: posts,
}
)

const activePost = (id, post) => ({
  type: types.postsActive,
  payload: {
    id,
    ...post,
  },
})


