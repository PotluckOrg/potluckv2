import React from 'react'
import {connect} from 'react-redux'
import Modal from './Modal'
import { addToBasket, removeFromBasket, returnToMyMarketThunk, removeFromMyMarket, createContractWeb3 } from '../store'



const ItemCard = (props) => {
    console.log('PROPS ON THE CARD', props)
    const { currentUser, items, item, itemOwnerId, modalBody, modalIcon } = props
    let modalButton
    const inPantry = props.path === '/pantry'
    const inMarket = props.path === '/market'
    const inBasket = props.path === '/basket'
    const buttonText = inPantry || inMarket ? <i className="fa fa-plus" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true" />

    const cardBody = singleItem => {
        const clickHandler = (inPantry || inMarket) ? event => props.handleAddToBasket(event, singleItem, currentUser.id) : event => props.handleRemoveFromBasket(event, singleItem.id, currentUser.id)
        console.log('clickHandler', clickHandler)
        return (
            <div key={singleItem.id} className="row card-body-wrapper">
                <div className="col-3">
                    <img src={`${singleItem.iconUrl}`} className="card-icon" />
                </div>
                <div className="card-text-wrapper col-7 d-inline-flex flex-column justify-content-center">
                    <h5 className="card-title">{singleItem.name}</h5>
                    <p className="card-text">{singleItem.description}</p>
                    <h6>On offer by {singleItem.user.username}</h6>
                </div>
                <div className="col-2" onClick={clickHandler}>{buttonText}</div>
            </div>
        )
    }

    const display = items ? items.map(ownersItem => cardBody(ownersItem)) : cardBody(item)

    return (
        <div className="card w-100">
            <div className="card-body">
                {display}
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        currentUser: state.user,
    }
}

const mapDispatch = (dispatch, ownProps) => {

    return {
        handleAddToBasket: (event, singleItem, userId) => {
                dispatch(addToBasket(singleItem, userId))
                dispatch(removeFromMyMarket(singleItem.id))
        },
        handleRemoveFromBasket: (event, itemId, userId) => {
                dispatch(removeFromBasket(itemId, userId))
                dispatch(returnToMyMarketThunk(itemId))
        },
    }
}

export default connect(mapState, mapDispatch)(ItemCard)
