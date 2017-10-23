import { API_BASE, xhr } from '../../utils'

export const MemberAPI = {
  listAllMembers() {
    return xhr(`${API_BASE}/list-members`, {
      method: 'GET'
    })
  }
}

export default MemberAPI