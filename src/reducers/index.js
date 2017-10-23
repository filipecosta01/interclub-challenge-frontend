import { combineReducers } from 'redux'

import memberReducer from './member'
import entitiesReducer from './entities'

const rootReducer = combineReducers({
  member: memberReducer,
  entities: entitiesReducer
})

export default rootReducer
