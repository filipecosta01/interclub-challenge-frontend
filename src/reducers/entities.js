import _ from 'lodash'
import sortBy from 'sort-by'

// ------------------------------------
// Constants
// ------------------------------------
export const MERGE_MEMBERS = 'MERGE_MEMBERS'
export const FILTER_MEMBERS = 'FILTER_MEMBERS'

// ------------------------------------
// Actions
// ------------------------------------
export const mergeMembers = (members = {}) => ({
  type: MERGE_MEMBERS,
  members
})

export const filterMembers = (search = '') => ({
  type: FILTER_MEMBERS,
  search
})

// ------------------------------------
// Action Handlers
// ------------------------------------
const ACTION_HANDLERS = {
  [MERGE_MEMBERS]: (state, { members }) => ({
    ...state,
    members: {
      ...state.members,
      all: {
        ...state.members.all,
        ...members
      },
      filtered: {
        ...state.members.filtered
      }
    }
  }),
  [FILTER_MEMBERS]: (state, { search }) => {
    const allMembers = Object.values(state.members.all)
    let filteredMembers = []

    if (!isNaN(search)) {
      filteredMembers = allMembers.filter(member => member.number === _.toNumber(search))
    } else {
      // Get the search and try to split plus remove special caracters
      const tokens = search
        .split(' ')
        .map(token => _.trim(token))
        .map(token => _.deburr(token))
        .map(token => _.toLower(token))
        .filter(token => token.length > 0)

      filteredMembers = allMembers
        .map((member) => {
          const memberName = [member['first_name'], member['last_name']].join(' ')
          const matchesByName = memberName
            .split(' ')
            .map(element => _.trim(element))
            .map(element => _.deburr(element))
            .map(element => _.toLower(element))
            .filter(element => element.length > 0)
            .filter(element => tokens.filter(token => element.startsWith(token)).length > 0)
            .length

          return ({
            member,
            matches: matchesByName
          })
        })
        .filter(element => element.matches > 0)
        .map(element => element.member)
    }

    return {
      ...state,
      members: {
        ...state.members,
        filtered: {
          ...filteredMembers.sort(sortBy('first_name', 'last_name', 'number'))
        }
      }
    }
  }
}

// ------------------------------------
// Reducer
// ------------------------------------
export const initialState = {
  /**
   * Application wide entities
   */
  members: {
    all: {},
    filtered: {}
  }
}

export default function entitiesReducer(state = initialState, action) {
  const handler = ACTION_HANDLERS[action.type]
  return handler ? handler(state, action) : state
}
