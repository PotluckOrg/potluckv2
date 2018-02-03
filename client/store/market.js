import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const ADD_MARKET_ITEM = 'ADD_MARKET_ITEM'
const REMOVE_MARKET_ITEM = 'REMOVE_MARKET_ITEM'

/**
 * INITIAL STATE
 */
const defaultMarket = [
    {
        id: 1,
        name: '1/2 Bag of Carrots',
        description: 'A delicious half bag of organic carrots!',
        iconUrl: './icons/carrot.svg',
        userId: 1
    },
    {
        id: 2,
        name: '2 Lemons',
        description: 'Two lemons looking for a home.',
        iconUrl: './icons/lemon.svg',
        userId: 1
    },
    {
        id: 3,
        name: '4 Pears',
        description: 'These four pears are FOR you!',
        iconUrl: './icons/pear.svg',
        userId: 2
    },
    {
        id: 4,
        name: '1 Watermelon',
        description: 'Such a yummy watermelon!',
        iconUrl: './icons/watermelon.svg',
        userId: 2
    },
]
/**
 * ACTION CREATORS
 *
 */
export const returnToMyMarket = item => ({ type: ADD_MARKET_ITEM, item })
export const removeFromMyMarket = itemId => ({ type: REMOVE_MARKET_ITEM, itemId })

/**
 * THUNK CREATORS
 */
export const returnToMyMarketThunk = (itemId) => dispatch => {
    //   axios
    //     .get(`/api/items/${itemId}`)
    //     .then(res => dispatch(returnToMyMarket(res.data)))
    //     .catch(err => console.log(err))
        let data = defaultMarket.find(item => item.id === itemId)
        dispatch(returnToMyMarket(data))
  }

/**
 * REDUCER
 */
export default function(state = defaultMarket, action) {
  switch (action.type) {
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
