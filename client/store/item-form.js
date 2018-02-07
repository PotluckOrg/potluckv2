import axios from 'axios'
import {returnToMyMarketThunk} from './market'

// ACTION TYPES

export const CREATE_PANTRY_ITEM = 'CREATE_PANTRY_ITEM'

const inputValues = {
    name: '',
    description: '',
    userId: 0,
}

// ACTION CREATOR

export const createItemForm = change => ({
    type: CREATE_PANTRY_ITEM,
    change
})

// THUNK CREATOR

// export function addPantryItemToDB(allItemInfo) {
//     return function (dispatch) {
//         axios.post('/api/items', allItemInfo)
//             .then(res => {
//                 console.log('RES>DATA', res.data)
//                 const itemId = res.data.id
//                 dispatch(returnToMyMarketThunk(itemId))
//             })
//             .catch(err => console.error(err))
//     }
// }

// REDUCER 

export default function (state = inputValues, action) {
    switch (action.type) {
        case CREATE_PANTRY_ITEM:
            return {
                ...state,
                ...action.change
            }
        default:
            return state
    }
}
