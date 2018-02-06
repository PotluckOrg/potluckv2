import axios from 'axios'
import history from '../history'
import {createContractApi} from './contract'

/**
 * ACTION TYPES
 */
const ADD_BASKET_ITEM = 'GET_BASKET_ITEM'
const REMOVE_BASKET_ITEM = 'REMOVE_BASKET_ITEM'


/**
 * INITIAL STATE
 */
const defaultBasket = []
/**
 * ACTION CREATORS
 *
 */
export const addToBasket = item => ({ type: ADD_BASKET_ITEM, item })
export const removeFromBasket = itemId => ({ type: REMOVE_BASKET_ITEM, itemId })
/**
 * THUNK CREATORS
 */
export const createContractWeb3 = (items, currentUser, soliciteeId) =>
  dispatch => {
    console.log("ITEMS inside Web3 createContract", items);
    let allItems = items.map(item => item.name).join(', ');
    axios.post('/web3', {allItems, currentUser})
      .then(result => {
        // console.log('RESULT', result)
        const contractAddress = result.data
        // console.log('Web3 RESULT.data: ', result.data)
        dispatch(createContractApi(contractAddress, currentUser.id, soliciteeId, items))
        console.log("END OF CREATE CONTRACT")
      })
      .catch(err => console.log(err))
    }
/**
 * REDUCER
 */
export default function(state = defaultBasket, action) {
  switch (action.type) {
    case ADD_BASKET_ITEM:
        return [...state, action.item]

    case REMOVE_BASKET_ITEM:
    console.log("ACTION.ITEMID", action.itemId)
    return state.filter(item => {
        return item.id !== +action.itemId
      })

    default:
      return state
  }
}
