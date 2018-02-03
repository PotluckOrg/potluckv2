import axios from 'axios'

/**
 * ACTION TYPES
 */
const START_GETH = 'START_GETH'
const STOP_GETH = 'STOP_GETH'

/**
 * INITIAL STATE
 */
const defaultNodesRunning = []
/**
 * ACTION CREATORS
 *
 */
export const startGeth = () => ({ type: START_GETH })
export const stopGeth = () => ({ type: STOP_GETH })
/**
 * THUNK CREATORS
 */
export const startGethInst = (user) =>
    axios.post(`/geth-start-script/${user.ipcAddr}/${user.port}`)
      .then(res => console.log(res.data))
      .catch(err => console.log(err))

export const stopGethInst = (user) =>
      axios.post(`/geth-stop-script/${user.ipcAddr}`)
        .then(res => console.log(res.data))
        .catch(err => console.log(err))

export const checkPeers = (user) =>
        axios.post(`/geth-stop-script/${user.ipcAddr}`)
          .then(res => console.log(res.data))
          .catch(err => console.log(err))
/**
 * REDUCER
 */
export default function(state = defaultNodesRunning, action) {
  switch (action.type) {

    default:
      return state
  }
}
