/* 
    {
        posts: [],
        activePost: {
            id: 'firebase-id',
            title: '',
            body: '',
            imageUrl: '',
            date: date.now(),
            },
    }
*/
import { types } from '../types'

export const postsReducer = (state = { posts: [], activePost: null }, action) => {
  switch (action.type) {
    case types.postsActive:
      return {
        ...state,
        activePost: {...action.payload },
      }
    case types.fetchPosts:
      return {
        ...state,
        posts: action.payload,
      }
    case types.createPost:
      return {
        ...state,
        posts: [action.payload, ...state.posts],
      }
    case types.updatePost:
      return {
        ...state,
        posts: state.posts.map(post => (post.id === action.payload.id ? action.payload : post)),
      }
    case types.deletePost:
      return {
        ...state,
        posts: state.posts.filter(post => post.id !== action.payload),
      }
    default:
      return state
  }
}
