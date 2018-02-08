import axios from 'axios'
import { getCompletedContracts } from './index';

/**
 * ACTION TYPES
 */
const GET_COMPLETE_TRADE = 'GET_COMPLETE_TRADE'


/**
 * INITIAL STATE
 */
const defaultCompletedTrades = []
/**
 * ACTION CREATORS
 *
 */
export const getCompleteTrade = trade => ({type: GET_COMPLETE_TRADE, trade})

/**
 * THUNK CREATORS
 */

  export const fetchAllTrades = (completedContracts) => dispatch =>
      {
        let promises = completedContracts.map( contract =>
            {
             return (
              axios.get(`/api/contractassociations/ledger/${contract.id}`)
              )
            })
        axios.all(promises)
        .then( axios.spread((...args) => {
          return args.map( res => dispatch(getCompleteTrade(res.data)))
        }))
        .catch( err => console.log(err))
      }


/**
 * REDUCER
 */
export default function(state = defaultCompletedTrades, action) {
  switch (action.type) {
    case GET_COMPLETE_TRADE:
        return [...state, action.trade]

    default:
      return state
  }
}
