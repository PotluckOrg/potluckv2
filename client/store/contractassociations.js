import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CONTRACT_ASSOCIATIONS = 'GET_CONTRACT_ASSOCIATIONS'


/**
 * INITIAL STATE
 */
const defaultContractAssociations = []
/**
 * ACTION CREATORS
 *
 */
export const getContractAssociations = associations => ({ type: GET_CONTRACT_ASSOCIATIONS, associations })

/**
 * THUNK CREATORS
 */
export const fetchContractAssociations = (contractId) => dispatch => {
      axios
        .get(`/api/contractassociations/${contractId}`)
        .then(res => {
            return dispatch(getContractAssociations(res.data))
        })
        .catch(err => console.log(err))
  }

  export const updateContractAssociation = (contractId, currentUser, comment) => dispatch => {
    axios.get(`/api/contractassociations/comment/${contractId}`, {currentUser, comment})
      .then( res => dispatch(getContractAssociations(res.data)))
      .catch(err => console.log(err))
  }

/**
 * REDUCER
 */
export default function(state = defaultContractAssociations, action) {
  switch (action.type) {
    case GET_CONTRACT_ASSOCIATIONS:
        return [...action.associations]

    default:
      return state
  }
}
