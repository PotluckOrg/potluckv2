import React from 'react'
import {connect} from 'react-redux'
import { addToBasket, removeFromBasket, returnToMyMarketThunk, removeFromMyMarket } from '../store'

const ItemCard = (props) => {
    const user = props.currentUser
    const item = props.item
    const inPantry = props.path === '/pantry'
    const inMarket = props.path === '/market'
    const buttonText = inPantry || inMarket ? <i className="fa fa-plus" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true" />
    const clickHandler = inPantry || inMarket ? event => props.handleAddToBasket(event, item, user.id) : event => props.handleRemoveFromBasket(event, item.id, user.id)
    return (
        <div className="card w-100">
            <div className="card-body">
                <img src={`${item.iconUrl}`} className="card-icon" height="75" width="75" />
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <h6>On offer by {item.user.username}</h6>
                <button className="btn" onClick={clickHandler}>{buttonText}</button>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        items: state.items,
        currentUser: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {

    return {
        handleAddToBasket: (event, item, userId) => {
                dispatch(addToBasket(item, userId))
                dispatch(removeFromMyMarket(item.id))
        },
        handleRemoveFromBasket: (event, itemId, userId) => {
                dispatch(removeFromBasket(itemId, userId))
                dispatch(returnToMyMarketThunk(itemId))
        }
    }
}

export default connect(mapState, mapDispatch)(ItemCard)
