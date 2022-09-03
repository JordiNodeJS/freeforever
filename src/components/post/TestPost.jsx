import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase.config'

const URL_DATABASE = 'pTqkGJannWhJmKcblu4hcapyJ0t1/record/posts'
const URL_DATABASE2 = 'WhAC5UsBAMb38mNr0YAw8qcsndy1/record/posts'
const URL_DATABASE3 = 'ee24xXkAM1g9dipY2uq7Wp9X5Mb2/record/posts'
const URL_DATABASE4 = 'superUserOne'

const fetchPosts = async database => {
  const posts = []
  // const ref = collection(db, `${uid}/record/posts`)
  const ref = collection(db, database)
  const postSnapShot = await getDocs(ref)

  postSnapShot.forEach(doc => {
    posts.push({
      id: doc.id,
      ...doc.data(),
    })
  })

  return posts
}
  const notes = await fetchPosts(URL_DATABASE)
  const notes2 = await fetchPosts(URL_DATABASE2)
  const notes3 = await fetchPosts(URL_DATABASE3)
  const notes4 = await fetchPosts(URL_DATABASE4)

  console.log(notes)
  console.log(notes2)
  console.log(notes3)
  console.log(notes4)

// Add a new document in collection "cities"
const docRef = doc(db, 'cities', 'NY')
await setDoc(docRef, {
  name: 'New York',
  state: 'CA',
  country: 'USA',
})

console.log('docRef', docRef)

const TestPost = () => {
  return (
    <div>
      <ul>
        {notes.map(note => (
          <li key={note.id}>
            <pre>
              <code>{JSON.stringify(note, null, 4)}</code>
            </pre>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default TestPost
