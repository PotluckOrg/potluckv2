import axios from 'axios'

/**
 * ACTION TYPES
 */
const GET_COMPLETE_CONTRACTS = 'GET_COMPLETE_CONTRACTS'
const GET_COMPLETE_TRADE = 'GET_COMPLETE_TRADE'


/**
 * INITIAL STATE
 */
const defaultCompletedContracts = {completedContracts: [], trade: {}}
/**
 * ACTION CREATORS
 *
 */
export const getCompletedContracts = contracts => ({ type: GET_COMPLETE_CONTRACTS, contracts })
export const getCompleteTrade = trade => ({type: GET_COMPLETE_TRADE, trade})

/**
 * THUNK CREATORS
 */
export const fetchCompletedContracts = () => dispatch =>
      axios.get('/api/contracts/completed')
        .then(res => dispatch(getCompletedContracts(res.data)))
        .catch(err => console.log(err))


  export const getContractUsersAndItems = (contract) => dispatch =>
      axios.get(`/api/contractassociations/ledger/${contract.id}`)
        .then( res => dispatch(getCompleteTrade(res.data)))
        .catch( err => console.log(err))

/**
 * REDUCER
 */
export default function(state = defaultCompletedContracts, action) {
  switch (action.type) {
    case GET_COMPLETE_CONTRACTS:
        return {completedContracts: action.contracts}
    case GET_COMPLETE_TRADE:
        return {trade: action.trade}

    default:
      return state
  }
}
