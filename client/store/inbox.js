import axios from 'axios'
import history from '../history'

/**
 * ACTION TYPES
 */
const GET_INBOX = 'GET_INBOX'
const CLEAR_INBOX = 'CLEAR_INBOX'

/**
 * INITIAL STATE
 */
const defaultInbox = {}

/**
 * ACTION CREATORS
 */
export const getInbox = inbox => ({ type: GET_INBOX, inbox })
export const clearInbox = () => ({ type: CLEAR_INBOX })

/**
 * THUNK CREATORS
 */
export const fetchInbox = () => dispatch =>
  axios
    .get('/api/inbox')
    .then(res => {
        console.log('I AM THE RES.DATA', res.data)
        dispatch(getInbox(res.data || defaultInbox))
    })
    .catch(err => console.log(err))

export const updateInbox = updatedItem => dispatch =>
  axios
    .put('/api/inbox/update', updatedItem)
    .then(() => dispatch(fetchInbox()))
    .then(() => dispatch(fetchTotals()))
    .catch(err => console.log(err))

export const removeContract = contractId => dispatch =>
  axios
    .put('/api/inbox/delete', { contractId })
    .then(() => axios.get('/api/inbox'))
    .then(res => dispatch(getInbox(res.data)))
    .catch(err => console.log(err))


/**
 * REDUCER
 */
export default function(state = defaultInbox, action) {
  switch (action.type) {
    case GET_INBOX:
      return action.inbox

    case CLEAR_INBOX:
      return Object.assign({}, defaultInbox)

    default:
      return state
  }
}
