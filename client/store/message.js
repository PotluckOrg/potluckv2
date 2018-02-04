import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_USER_RECIPIENT_MESSAGES = 'GET_USER_RECIPIENT_MESSAGES'
const GET_ALL_MESSAGES = 'GET_ALL_MESSAGES'

/**
 * INITIAL STATE
 */
const defaultRecipientMessages = []

/**
 * ACTION CREATORS
 */
const getUserRecipientMessages = (messages) => ({ type: GET_USER_RECIPIENT_MESSAGES, messages })

const getAllMessages = (messages) => ({ type: GET_USER_RECIPIENT_MESSAGES, messages })


/**
 * THUNK CREATORS
 */


export const fetchMessagesByRecipientId = (recipientId) =>
    dispatch =>
        axios.get(`/api/messages/${recipientId}`)
            .then(res => {
                dispatch(getUserRecipientMessages(res.data))
            })
            .catch(err => console.log(err))


export function fetchAllMessages() {
    return function thunk(dispatch) {
        axios.get('/api/messages')
            .then(res => {
                dispatch(getAllMessages(res.data))
            })
    }
}


/**
 * REDUCER
 */
export default function (state = defaultRecipientMessages, action) {
    switch (action.type) {
        case GET_USER_RECIPIENT_MESSAGES:
            return action.messages
        case GET_ALL_MESSAGES:
            return action.messages
        default:
            return state
    }
}