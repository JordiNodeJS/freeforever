import { types } from '../types'
import { db } from '../firebase.config'
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore'
import { toast } from 'react-toastify'
import { startNewPublicPost } from '../utils'

// Create a new post in the firebase database. This is an action creator that returns a thunk
/**
 * It takes an object, adds a few properties to it, then adds it to a collection in Firestore. 
 * 
 * The function is called from a component that has a form. 
 * 
 * The form is a redux-form. 
 * 
 * The form is submitted with a button. 
 * 
 * The button is a react-bootstrap button. 
 * 
 * The button is disabled until the form is valid. 
 * 
 * The form is valid when all the fields are filled out. 
 * 
 * The form is invalid when any of the fields are empty. 
 * 
 * The form is invalid when any of the fields are empty. 
 * 
 * The form is invalid when any of the fields are empty. 
 * 
 * The form is invalid when any of the fields are empty. 
 * 
 * The form is invalid when any of the fields
 */
export const startNewPost = entry => async (dispatch, getState) => {
  const {
    auth: { uid, name },
  } = getState()

  delete entry.id

  const newPost = { ...entry, uid, author: name }

  const userCollectionRef = collection(db, `${uid}/record/posts`) //${name.split(' ').join('')}_${uid}
  const newPostRef = await addDoc(userCollectionRef, newPost)

  dispatch(activePost(newPostRef.id, newPost))

  await updateDoc(newPostRef, { id: newPostRef.id, ...newPost })

  startNewPublicPost(newPost)

  toast.success('Post ADDED!', {
    onClose: () =>
      setTimeout(() => {
        window.location.href = 'postentries'
      }, 1600),
  })

  dispatch(startFetchPosts(uid))
  dispatch(startFetchPublic())

}

// formating the basic action
export const activePost = (id, post) => ({
  type: types.postsActive,
  payload: {
    id,
    ...post,
  },
})

/**
 * It's an action creator that returns a thunk. The thunk is an async function that fetches all posts
 * from the database and dispatches an action to update the state with the fetched posts.
 */
export const startSavePost = post => async (dispatch, getState) => {
  const { uid } = getState().auth
  const userCollectionRef = collection(db, `${uid}/record/posts`)
  const postRef = doc(userCollectionRef, post.id)
  post.image = post.image ?? 'https://via.placeholder.com/300/09f/fff.png'

  await updateDoc(postRef, post)

  dispatch(startFetchPosts(uid))

  toast.success('Post saved!')
}

// Fetching all posts. This is an action creator that returns a thunk
/**
 * It takes a uid, fetches the posts, and then dispatches the setPosts action creator with the posts
 */
export const startFetchPosts = uid => async dispatch => {
  const notes = await fetchPosts(uid)
  dispatch(setPosts(notes))
}

// Fetching public posts. This is an action creator that returns a thunk
export const startFetchPublic = uid => async dispatch => {
  const notes = await fetchPosts(uid)
  dispatch(setPublicPost(notes))
}

// startUploadFile. Thunk
//  It takes a file, uploads it to firebase storage, and then updates the activePost with the fileUrl.

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

// uploadFile to Cloudinary.
/**
 * It takes a file, creates a form data object, appends the file to the form data object, appends the
 * upload preset to the form data object, appends the cloud name to the form data object, then sends
 * the form data object to the cloudinary API
 * @returns The secure_url is being returned.
 */
const fileUpload = async file => {
  const URL_UPLOAD = `https://api.cloudinary.com/v1_1/${
    import.meta.env.VITE_API_CLOUDINARY_CLOUDNAME
  }/image/upload`
  const data = new FormData()
  data.append('file', file)
  data.append('upload_preset', 'react-post')
  data.append('cloud_name', import.meta.env.VITE_API_CLOUDINARY_CLOUDNAME)

  try {
    const res = await fetch(URL_UPLOAD, {
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

// Delete posts from Firebase. Thunk.
/**
 * It deletes a post from the database and then fetches all posts from the database.
 */
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
  payload: post.id,
})

const setPosts = posts => ({
  type: types.postsFetch,
  payload: posts,
})

const setPublicPost = posts => ({
  type: types.postsPublicFetch,
  payload: posts
})


/**
 * Fetch all posts from the database and return them as an array of objects.
 * @returns An array of objects.
 */
const fetchPosts = async uid => {
  const posts = []
  const ref = collection(db, uid == null ? 'public' : `${uid}/record/posts`)
  const postSnapShot = await getDocs(ref)

  postSnapShot.forEach(doc => {
    posts.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return posts
}
