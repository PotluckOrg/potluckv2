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

export const createContractApi = (contractAddress, currentUserId, soliciteeId, itemId) => dispatch => {
      // all params are successfully reaching this point
      axios
      .post('/api/contracts', {contractAddress, currentUserId, soliciteeId, itemId})
      .then(res => dispatch(getContracts(res.data)))
      .catch(err => console.log(err))
      // let data = defaultMarket.find(item => item.id === itemId)
      // dispatch(returnToMyMarket(data))
}

export const updateContract = (items, contract, solicitorId, currentUser) => dispatch => {
  let contractAddress = contract.contractAddress
  let allItems = items.map(item => item.name).join(', ');
  return axios.post('/web3/contract', {allItems, contractAddress})
  .then(res => {
    console.log("** MADE IT THROUGH UpdateContract **")
    items.forEach(item => {
      dispatch(createContractAssociations(contract.id, currentUser.id, solicitorId, item.id))
    })
    dispatch(fetchContracts())
    console.log("END OF CREATE CONTRACT")
  })
  .catch(err => console.log(err))
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
