import axios from 'axios'
import { fetchAllTrades } from './index';

/**
 * ACTION TYPES
 */
const GET_COMPLETE_CONTRACTS = 'GET_COMPLETE_CONTRACTS'


/**
 * INITIAL STATE
 */
const defaultCompletedContracts = []
/**
 * ACTION CREATORS
 *
 */
export const getCompletedContracts = contracts => ({ type: GET_COMPLETE_CONTRACTS, contracts })

/**
 * THUNK CREATORS
 */
export const fetchCompletedContracts = () => dispatch =>
      axios.get('/api/contracts/completed')
        .then(res => {
           dispatch(getCompletedContracts(res.data))
           return res
           })
        .then( res => dispatch(fetchAllTrades(res.data)))
        .catch(err => console.log(err))

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
