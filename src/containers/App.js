import { connect } from 'react-redux'

import { getMembers } from '../reducers/member'
import { filterMembers } from '../reducers/entities'

import AppView from '../views/App'

const getAllMembers = (state) => Object.values(state.entities.members.all)
const getFilteredMembers = (state) => Object.values(state.entities.members.filtered)

const mapStateToProps = (state, props) => ({
  error: state.member.error,
  isLoading: state.member.isLoading,
  members: getAllMembers(state),

  filteredMembers: getFilteredMembers(state)
})

const mapAcionCreators = {
  getMembers,
  filterMembers
}

export default connect(mapStateToProps, mapAcionCreators)(AppView)
