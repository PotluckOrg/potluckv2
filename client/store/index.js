import {createStore, combineReducers, applyMiddleware} from 'redux'
import createLogger from 'redux-logger'
import thunkMiddleware from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import user from './user'
import basket from './basket'
import market from './market'
import geth from './geth'
import requests from './contract'
import message from './message'
import contractAssociations from './contractassociations'
import offer from './offer'
import itemForm from './item-form'
import pantry from './pantry'

const reducer = combineReducers({user, basket, market, requests, geth, message, contractAssociations, offer, itemForm, pantry})
const middleware = composeWithDevTools(applyMiddleware(
  thunkMiddleware,
  createLogger({collapsed: true})
))
const store = createStore(reducer, middleware)

export default store
export * from './user'
export * from './basket'
export * from './market'
export * from './geth'
export * from './contract'
export * from './message'
export * from './contractassociations'
export * from './offer'
export * from './item-form'
export * from './pantry'
