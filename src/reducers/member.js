import { MemberAPI } from '../utils/api'
import { normalize } from 'normalizr'

import * as schemas from '../schemas'
import * as entities from './entities'

// ------------------------------------
// Constants
// ------------------------------------
export const GET_MEMBERS = 'GET_MEMBERS'
export const GET_MEMBERS_FAILURE = 'GET_MEMBERS_FAILURE'
export const GET_MEMBERS_SUCCESS = 'GET_MEMBERS_SUCCESS'

// ------------------------------------
// Actions
// ------------------------------------
export const getMembers = () => async dispatch => {
  dispatch({ type: GET_MEMBERS })

  // Set arbitraty timout so loading appears first...
  try {
    const response = await MemberAPI.listAllMembers()
    setTimeout(() => {
      return getMembersSuccess({ response, dispatch })
    }, 3000)
  } catch(error) {
    dispatch({ type: GET_MEMBERS_FAILURE, error })
  }
}

// ------------------------------------
// Actions
// ------------------------------------
export const getMembersSuccess = ({ response, dispatch }) => {
  const normalized = normalize(response, [ schemas.member ] )
  const { members } = normalized.entities

  dispatch(entities.mergeMembers(members))

  dispatch({ type: GET_MEMBERS_SUCCESS })

  return response
}

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [GET_MEMBERS]: state => ({
    ...state,
    error: null,
    isLoading: true
  }),
  [GET_MEMBERS_FAILURE]: (state, { error }) => ({
    ...state,
    error,
    isLoading: false,
    messages: {
      ...state.messages,
      membersLoadedFailure: true
    }
  }),
  [GET_MEMBERS_SUCCESS]: state => ({
    ...state,
    error: null,
    isLoading: false,
    messages: {
      ...state.messages,
      membersLoadedFailure: false
    }
  })
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  /**
   * Application wide entities
   */
  error: null,
  messages: {
    membersLoadedFailure: false,

    membersFilteredFailure: false,
    membersFilteredSuccess: false
  },
  isLoading: false
}

export default function memberReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
