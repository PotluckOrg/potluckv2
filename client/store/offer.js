import axios from 'axios'
import history from '../history'
import {updateContractAssoc, updateContractStatus} from './contract'

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
export const updateContract = (items, contract, solicitor, solicitorId, currentUser) => dispatch => {
    let contractAddress = contract.contractAddress
    console.log("contract in updateContract: ", contract)
    let allItems = items.map(item => item.name).join(', ');
    let itemIds = []
    items.forEach(itemObj => {itemIds.push(itemObj.id)})
    itemIds = itemIds.join(', ')
<<<<<<< HEAD
      dispatch(updateContractAssoc(contract.id, currentUser.id, itemIds))
      dispatch(updateContractStatus(contract.id, {status: 'SecondReview'}))
      history.push('/inbox')
    .catch(err => console.log(err))
=======
    dispatch(updateContractAssoc(contract.id, currentUser.id, itemIds))
    dispatch(updateContractStatus(contract.id, {status: 'SecondReview'}))
>>>>>>> c585a0979cfb49dcd25af0dab1c76e8268bca878
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
