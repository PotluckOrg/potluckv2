import React from 'react'
import {connect} from 'react-redux'
import { addToBasket, removeFromBasket, returnToMyMarketThunk, removeFromMyMarket } from '../store'

const ItemCard = (props) => {
    console.log('PROPS ON THE CARD', props)
    // const user = props.user
    const user = {
        id: 1,
        name: 'Jamie Hopper'
    }
    const singleItem = props.item
    const items = props.items
    const inPantry = props.path === '/pantry'
    const inMarket = props.path === '/market'
    const inBasket = props.path === '/basket'
    const buttonText = inPantry || inMarket ? <i className="fa fa-plus" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true" />
    const clickHandler = inPantry || inMarket ? event => props.handleAddToBasket(event, singleItem, user.id) : event => props.handleRemoveFromBasket(event, item.id, user.id)
    const cardBody = item => {
        return (
            <div key={item.id} className="row card-body-wrapper">
                <div className="col-3">
                    <img src={`${item.iconUrl}`} className="card-icon" />
                </div>
                <div className="card-text-wrapper col-7 d-inline-flex flex-column justify-content-center">
                    <h5 className="card-title">{item.name}</h5>
                    <p className="card-text">{item.description}</p>
                </div>
                <div className="col-2" onClick={clickHandler}>{buttonText}</div>
            </div>
        )
    }

    const display = items ? items.map(ownersItem => cardBody(ownersItem)) : cardBody(singleItem)
    console.log('items', items)
    console.log('DISPLAY', display)

    return (
        <div className="card w-100">
            <div className="card-body">
                {display}
            </div>
        </div>
    )
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

export default connect(null, mapDispatch)(ItemCard)
