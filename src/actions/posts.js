import { types } from '../types'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'


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
}
export const activePost = (id, post) => ({
  type: types.postsActive,
  payload: {
    id,
    ...post,
  },
})

export const startFetchPosts = uid => async dispatch => {
  const notes = await loadPosts(uid)
  dispatch(setPosts(notes))
}


const setPosts = posts => ({
  type: types.postsFetch,
  payload: posts,
}
)

const loadPosts = async uid => {
  const posts = []
  const ref = collection(db, `${uid}/record/posts`)
  const postSnapShot = await getDocs(ref)

  postSnapShot.forEach(doc => {
    posts.push({
      id: doc.id,
      ...doc.data(),
    })
  })



  console.log('posts', ' => ', posts)
  return posts
}





