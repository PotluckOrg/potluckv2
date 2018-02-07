import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_COMPLETE_TRADE = 'GET_COMPLETE_TRADE'


/**
 * INITIAL STATE
 */
const defaultCompletedTrade = []
/**
 * ACTION CREATORS
 *
 */
export const getCompleteTrade = trade => ({type: GET_COMPLETE_TRADE, trade})

/**
 * THUNK CREATORS
 */

  export const getContractUsersAndItems = (contract) => dispatch =>
      { console.log("contract: ", contract)
        return axios.get(`/api/contractassociations/ledger/${contract.id}`)
        .then( res => dispatch(getCompleteTrade(res.data)))
        .catch( err => console.log(err))}

/**
 * REDUCER
 */
export default function(state = defaultCompletedTrade, action) {
  switch (action.type) {
    case GET_COMPLETE_TRADE:
        return [...state, action.trade]

    default:
      return state
  }
}
