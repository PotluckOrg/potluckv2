import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CONTRACTS = 'GET_CONTRACTS'
const ADD_CONTRACT = 'ADD_CONTRACT'


/**
 * INITIAL STATE
 */
const defaultContracts = []
/**
 * ACTION CREATORS
 *
 */
export const getContracts = contracts => ({ type: GET_CONTRACTS, contracts })
export const addContract = contract => ({ type: ADD_CONTRACT, contract })

/**
 * THUNK CREATORS
 */
export const fetchContracts = () => dispatch => {
      axios
        .get('/api/contracts')
        .then(res => dispatch(getContracts(res.data)))
        .catch(err => console.log(err))
        // let data = defaultMarket.find(item => item.id === itemId)
        // dispatch(returnToMyMarket(data))
  }

export const createContractApi = (contractAddress, currentUserId, soliciteeId, items) => dispatch => {
      // all params are successfully reaching this point
      axios
      .post('/api/contracts', {contractAddress, currentUserId, soliciteeId, items})
      .then(res => dispatch(getContracts(res.data)))
      .catch(err => console.log(err))
      // let data = defaultMarket.find(item => item.id === itemId)
      // dispatch(returnToMyMarket(data))
}

/**
 * REDUCER
 */
export default function(state = defaultContracts, action) {
  switch (action.type) {
    case GET_CONTRACTS:
        return [...state, ...action.contracts]
    case ADD_CONTRACT:
        return [...state, action.contract]

    default:
      return state
  }
}
