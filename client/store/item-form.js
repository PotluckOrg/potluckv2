import axios from 'axios'

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



// REDUCER 

export default function (state = inputValues, action) {
    switch (action.type) {
        case CREATE_PANTRY_ITEM:
            // console.log('INSIDE of COMPOSE_REVIEW') // not logging
            return {
                ...state,
                ...action.change
            }
        default:
            return state
    }
}
