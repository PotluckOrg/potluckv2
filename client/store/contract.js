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

export const createContractApi = (contractAddress, currentUserId, soliciteeId, itemIds) => dispatch => {
    axios
      .post('/api/contracts', {contractAddress, currentUserId, soliciteeId, itemIds})
      .then(res => dispatch(getContracts(res.data)))
      .catch(err => console.log(err))
}

export const updateContractAssoc = (contractId, soliciteeId, itemIds) => dispatch => {
    axios
      .put(`/api/contractassociations/${contractId}`, {soliciteeId, itemIds})
      .then(res => dispatch(getContracts(res.data)))
      .catch(err => console.log(err))
}

export const updateContractStatus = contractId => dispatch => {
  axios
    .put(`/api/contracts/${contractId}`, {status: 'Pending'})
    .then(res => dispatch(getContracts(res.data)))
    .catch(err => console.log(err))
}

// when the request has made it back to the solicitor and they press 'Confirm Trade' button
// activates "approveSwap" function in contract via web3 route (state = 'Locked')
// updates contract status in database (to 'Pending')
export const completeTrade = (contractAddress, currentUser) => dispatch => {
  axios.post('/web3/complete', {contractAddress, currentUser})
  .then(res => {
    console.log('THIS IS THE RESULT FROM WEB3', res.data)
  })
}

// when each user confirms that items have been traded
// activates completeSwap() function in contract (internal counter increments once for each user inside contract, and after 2 changes the state to 'Completed')

// when BOTH users have done so, status of contract in DB needs to update to 'Completed' also

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
