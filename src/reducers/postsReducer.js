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

/**
 * It's a reducer function that takes in a state and an action and returns a new state based on the
 * action.type.
 * @param [state] - the current state of the reducer
 * @param action - {
 * @returns The state is being returned.
 */
export const postsReducer = (state = { posts: [], publicPosts: [], activePost: null }, action) => {
  switch (action.type) {
    case types.postsActive:
      return {
        ...state,
        activePost: { ...action.payload },
      }
    case types.postsFetch:
      return {
        ...state,
        posts: [...action.payload],
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

    case types.postsPublicFetch:
      return {
        ...state,
        publicPosts: [...action.payload],
      }

    case types.postsLogoutCleanUp:
      return {
        ...state,
        posts: [],
        activePost: null,
      }

    default:
      return state
  }
}
