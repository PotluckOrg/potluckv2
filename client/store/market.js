import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_ITEMS = 'GET_ITEMS'
const ADD_MARKET_ITEM = 'ADD_MARKET_ITEM'
const REMOVE_MARKET_ITEM = 'REMOVE_MARKET_ITEM'

/**
 * INITIAL STATE
 */
const defaultMarket = []
/**
 * ACTION CREATORS
 *
 */
export const getItems = items => ({ type: GET_ITEMS, items})
export const returnToMyMarket = item => ({ type: ADD_MARKET_ITEM, item })
export const removeFromMyMarket = itemId => ({ type: REMOVE_MARKET_ITEM, itemId })

/**
 * THUNK CREATORS
 */

export const fetchAllItems = () =>
  dispatch => {
  axios.get('/api/items')
    .then(res => dispatch(getItems(res.data || defaultMarket)))
    .catch(err => console.log(err))
}

export const returnToMyMarketThunk = (itemId) => dispatch => {
  console.log
      axios
        .get(`/api/items/${itemId}`)
        .then(res => dispatch(returnToMyMarket(res.data)))
        .catch(err => console.log(err))
  }

  export function addPantryItemToDB(allItemInfo) {
    return function (dispatch) {
        axios.post('/api/items', allItemInfo)
            .then(res => {
                console.log('RES>DATA', res.data)
                const itemId = res.data.id
                return dispatch(returnToMyMarketThunk(itemId))
            })
            .catch(err => console.error(err))
    }
}


/**
 * REDUCER
 */
export default function(state = defaultMarket, action) {
  switch (action.type) {
    case GET_ITEMS:
      return [...state, ...action.items]

    case ADD_MARKET_ITEM:
        return [...state, action.item]

    case REMOVE_MARKET_ITEM:
    return state.filter(item => {
        return item.id !== +action.itemId
      })

    default:
      return state
  }
}
