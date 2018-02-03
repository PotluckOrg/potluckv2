import axios from 'axios'

/**
 * ACTION TYPES
 */
const START_GETH = 'START_GETH'
const STOP_GETH = 'STOP_GETH'

/**
 * INITIAL STATE
 */
const defaultGethInst = false
/**
 * ACTION CREATORS
 *
 */
export const startGeth = () => ({ type: START_GETH })
export const stopGeth = () => ({ type: STOP_GETH })
/**
 * THUNK CREATORS
 */
export const startGethInst = (user) => dispatch =>
    axios.get(`/geth-start-script/${user.ipcAddr}/${user.port}`)
      .then(res => dispatch(startGeth()))
      .catch(err => console.log(err))

export const stopGethInst = (user) => dispatch =>
      axios.get(`/geth-stop-script/${user.ipcAddr}`)
        .then(res => dispatch(stopGeth()))
        .catch(err => console.log(err))

export const checkPeers = (user) =>
        axios.get(`/geth-stop-script/${user.ipcAddr}`)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function(state = defaultGethInst, action) {
  switch (action.type) {

    case START_GETH:
      return true
    case STOP_GETH:
      return false
    default:
      return state
  }
}
