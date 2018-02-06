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
export const updateContract = (items, contract, solicitorId, currentUser) => dispatch => {
    let contractAddress = contract.contractAddress
    let allItems = items.map(item => item.name).join(', ');
    let itemIds = []
    items.forEach(itemObj => {itemIds.push(itemObj.id)})
    itemIds = itemIds.join(', ')
    axios.post('/web3/contract', {allItems, currentUser, contractAddress})
    .then(res => {
      console.log('----Reached other side of web3/contract POST----')
      console.log('contract.id, currentUser.id, solicitorId: ', contract.id, currentUser.id, solicitorId)
      console.log("RES.DATA (contractAddress): ", res.data)
      dispatch(updateContractAssoc(contract.id, solicitorId, itemIds))
      dispatch(updateContractStatus(contract.id))
      console.log("** MADE IT THROUGH UpdateContract **")
 //   dispatch(fetchContracts())
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
