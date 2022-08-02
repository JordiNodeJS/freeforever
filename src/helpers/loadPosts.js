import { db } from '../firebase.config'
import { collection, getDocs } from 'firebase/firestore'

export const loadPosts = async uid => {
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
