import { connect } from 'react-redux'

import { getMembers } from '../reducers/member'

import AppView from '../views/App'

const mapStateToProps = (state, props) => ({
  error: state.member.error,
  members: state.entities.allMembers,
  isLoading: state.member.isLoading,

  filteredMembers: state.member.filteredMembers
})

const mapAcionCreators = {
  getMembers
}

export default connect(mapStateToProps, mapAcionCreators)(AppView)
