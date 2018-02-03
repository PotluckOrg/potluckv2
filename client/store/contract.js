import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_CONTRACTS = 'GET_CONTRACTS'

/**
 * INITIAL STATE
 */
const defaultContracts = []
/**
 * ACTION CREATORS
 * 
 */
export const getContracts = contracts => ({ type: GET_CONTRACTS, contracts })

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

/**
 * REDUCER
 */
export default function(state = defaultContracts, action) {
  switch (action.type) {
    case GET_CONTRACTS:
        return [...state, ...action.contracts]

    default:
      return state
  }
}