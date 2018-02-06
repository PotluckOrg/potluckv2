import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_COMPLETE_CONTRACTS = 'GET_COMPLETE_CONTRACTS'
const ADD_CONTRACT = 'ADD_CONTRACT'


/**
 * INITIAL STATE
 */
const defaultCompletedContracts = []
/**
 * ACTION CREATORS
 *
 */
export const getContracts = contracts => ({ type: GET_COMPLETE_CONTRACTS, contracts })
export const addContract = contract => ({ type: ADD_CONTRACT, contract })

/**
 * THUNK CREATORS
 */
export const fetchCompletedContracts = () => dispatch => {
      axios
        .get('/api/contracts/completed')
        .then(res => dispatch(getContracts(res.data)))
        .catch(err => console.log(err))
        // let data = defaultMarket.find(item => item.id === itemId)
        // dispatch(returnToMyMarket(data))
  }

/**
 * REDUCER
 */
export default function(state = defaultCompletedContracts, action) {
  switch (action.type) {
    case GET_COMPLETE_CONTRACTS:
        return action.contracts

    default:
      return state
  }
}
