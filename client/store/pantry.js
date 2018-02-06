import axios from 'axios'

// ACTION TYPES

export const ADD_PANTRY_ITEM = 'ADD_PANTRY_ITEM'

const defaultItems = []


// ACTION CREATOR

export const addPantryItem = item => ({
    type: ADD_PANTRY_ITEM,
    item
})


// const getReviewsByProductId = (reviews) => {
//     return {
//         type: GET_REVIEWS_BY_PRODUCT_ID,
//         reviews
//     }
// }

// THUNK CREATOR

export function addPantryItemToDB(allItemInfo) {
    return function (dispatch) {
        axios.post('/api/items', allItemInfo)
            .then(res => {
                console.log('RES>DATA', res.data)
            })
            // .then(newItem => {
            //     dispatch(fetchItemsByUserId(newItem.userId))
            // })
            .catch(err => console.error(err))
    }
}

// export function fetchItemsByUserId(userId) {
//     return function thunk(dispatch) {
//         axios.get(`/api/items/`)
//         .then(res => {
//             dispatch(getReviewsForAllProducts(res.data))
//         })
//     }
// }

// REDUCER 

export default function (state = defaultItems, action) {
    switch (action.type) {
        case ADD_PANTRY_ITEM:
            return {
                ...state,
                ...action.item
            }
        default:
            return state
    }
}
