// ------------------------------------
// Constants
// ------------------------------------
export const MERGE_MEMBERS = 'MERGE_MEMBERS'

// ------------------------------------
// Actions
// ------------------------------------
export const mergeMembers = (members = {}) => ({
  type: MERGE_MEMBERS,
  members
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MERGE_MEMBERS]: (state, { members }) => ({
    ...state,
    members: {
      ...state.members,
      ...members
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
  members: {}
}

export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
