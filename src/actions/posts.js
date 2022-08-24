import { types } from '../types'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'

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
  const newPostRef = await addDoc(userCollectionRef, newPost)

  dispatch(activePost(newPostRef.id, newPost))
  dispatch(startFetchPosts(uid))
}
export const activePost = (id, post) => ({
  type: types.postsActive,
  payload: {
    id,
    ...post,
  },
})

export const startSavePost = post => async (dispatch, getState) => {
  const { uid } = getState().auth
  const userCollectionRef = collection(db, `${uid}/record/posts`)
  const postRef = doc(userCollectionRef, post.id)
  post.image = post.image ?? 'https://via.placeholder.com/300/09f/fff.png'
  
  await updateDoc(postRef, post)

  dispatch(startFetchPosts(uid))

  toast.success('Post saved!')

}

export const startFetchPosts = uid => async dispatch => {
  const notes = await fetchPosts(uid)
  dispatch(setPosts(notes))
}

// startUploadFile
export const startUploadFile = file => async (dispatch, getState) => {
  let { activePost: entry } = getState().posts
  console.log('entry', entry)
  const fileUrl = await fileUpload(file)
   entry = {
    ...entry,
    image: fileUrl,
  }
  dispatch(activePost(entry.id, entry))
}
// uploadFile to Cloudinary
const fileUpload = async file => {
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'react-post')
  data.append('cloud_name', import.meta.env.VITE_API_CLOUDINARY_CLOUDNAME)

  try {
    const res = await fetch(import.meta.env.VITE_API_CLOUDINARY_URL_UPLOAD, {
      method: 'POST',
      body: data,
    })
    toast.info('Uploading...', { autoClose: 500 })
    const { secure_url } = res.ok ? await res.json() : null 
    return secure_url

  } catch (error) {
    throw error
  }
}
// Delete posts from Firebase
export const startDeletePost = post => async (dispatch, getState) => {
  const { uid } = getState().auth
  const userCollectionRef = collection(db, `${uid}/record/posts`)
  const postRef = doc(userCollectionRef, post.id)
  await deleteDoc(postRef)

  
  dispatch(deletePost(post))
  dispatch(activePost(null))

  
  
  toast.success('Post deleted!')
  dispatch(startFetchPosts(uid))
}

const deletePost = post => ({
  type: types.postsDelete,
  payload: post.id
})

const setPosts = posts => ({
  type: types.postsFetch,
  payload: posts,
})

const fetchPosts = async uid => {
  const posts = []
  const ref = collection(db, `${uid}/record/posts`)
  const postSnapShot = await getDocs(ref)

  postSnapShot.forEach(doc => {
    posts.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return posts
}
