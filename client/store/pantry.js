import axios from 'axios'
import { returnToMyMarket } from './market'

// ACTION TYPES

export const ADD_PANTRY_ITEM = 'ADD_PANTRY_ITEM'
export const GET_ITEMS_BY_USER_ID = 'GET_ITEMS_BY_USER_ID'

const defaultItems = []


// ACTION CREATOR

export const addPantryItem = item => ({
    type: ADD_PANTRY_ITEM,
    item
})


const getItemsByUserId = (items) => {
    return {
        type: GET_ITEMS_BY_USER_ID,
        items
    }
}


// REDUCER 

export default function (state = defaultItems, action) {
    switch (action.type) {
        case ADD_PANTRY_ITEM:
            return {
                ...state,
                ...action.item
            }

        case GET_ITEMS_BY_USER_ID:
            return {
                ...state,
                items: action.items
            }
        default:
            return state
    }
}
