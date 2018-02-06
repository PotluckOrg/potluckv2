import axios from 'axios'
import history from '../history'
import {createContractApi} from './contract'

/**
 * ACTION TYPES
 */
const ADD_OFFER_ITEM = 'GET_OFFER_ITEM'
const REMOVE_OFFER_ITEM = 'REMOVE_OFFER_ITEM'


/**
 * INITIAL STATE
 */
const defaultOffer = []
/**
 * ACTION CREATORS
 *
 */
export const addToOffer = item => ({ type: ADD_OFFER_ITEM, item })
export const removeFromOffer = itemId => ({ type: REMOVE_OFFER_ITEM, itemId })

/**
 * THUNK CREATORS
 */
export const updateContract = (items, contract, solicitorId, currentUser) => dispatch => {
    let contractAddress = contract.contractAddress
    let allItems = items.map(item => item.name).join(', ');
    axios.post('/web3/contract', {allItems, currentUser, contractAddress})
    .then(res => {
      console.log("** MADE IT THROUGH UpdateContract **")
      console.log('OFFER STUFF', contract.id, currentUser.id, solicitorId)
      console.log("RES: ", res.data)
      items.forEach(item => {
          console.log('ITEM IN OFFER', item)
        // dispatch(createContractAssociations(contract.id, currentUser.id, solicitorId, item.id))
      })
    //   dispatch(fetchContracts())
      console.log("END OF CREATE CONTRACT")
    })
    .catch(err => console.log(err))
  }
/**
 * REDUCER
 */
export default function(state = defaultOffer, action) {
  switch (action.type) {
    case ADD_OFFER_ITEM:
        return [...state, action.item]

    case REMOVE_OFFER_ITEM:
    return state.filter(item => {
        return item.id !== +action.itemId
      })

    default:
      return state
  }
}
