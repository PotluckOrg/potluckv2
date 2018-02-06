import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import Modal from './Modal'

import { createContractWeb3, removeFromBasket, removeFromMyMarket } from '../store'



const Basket = (props) => {
    let display, hasItems, hasItemsByOwner, cardDisplay = []
    let itemsByOwner = new Map()

    const items = props.basket
    const itemOwners = new Set()
    items.forEach(item => itemOwners.add(item.userId))
    const modalIcon = <i className="fas fa-arrow-circle-right" />
    const modalBody = 'Your request has been sent!'
    const currentUser = props.currentUser

    itemOwners.forEach((v1, v2, set) => {
        itemsByOwner.set(v1, items.filter(item => item.userId === v2))
    })

    itemsByOwner.forEach((ownersItems, itemOwner, map) => {
        let cardBody = (
            <div key={ itemOwner }>
                <ItemCard itemOwnerId={itemOwner} items={ownersItems} path={props.match.path} />
                <button type="button" className="btn btn-primary" onClick={event => props.sendRequestHandler(event, ownersItems, itemOwner, currentUser)}>
                    {modalIcon}
                </button>
            </div>)
        cardDisplay.push(cardBody)
        })

    if (!items.length) {
        display = (
            <div>
                <p>Your basket is empty.</p>
                <Link to="/market" className="btn"> Go To Market <i className="fas fa-arrow-circle-right" /></Link>
            </div>
        )
    } else {
        hasItems = true
        display = (
            <div>
                <div className="basket-wrapper" >
                    {cardDisplay && cardDisplay}
                </div>
            </div>
        )
    }

    return (
        <div>
            {display}
                {items.length &&
                    <button type="button" className="btn btn-primary" onClick={event => props.sendBatchRequestHandler(event, items, currentUser)}>
                        {modalIcon}
                    </button>
                }
                <Modal name="request" body={modalBody} />
        </div>
    )
}

const mapState = (state) => {
    return {
        basket: state.basket,
        currentUser: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        sendRequestHandler: (event, items, itemOwner, currentUser) => {
                const soliciteeId = itemOwner
                console.log("mapDispatch UserIpcAddr: ", currentUser)
                console.log('ITEMS', items)
                dispatch(createContractWeb3(items, currentUser, soliciteeId))
                items.forEach(item => {
                    dispatch(removeFromBasket(item.id))
                    dispatch(removeFromMyMarket(item.id))
                })

                //should items keep a state? pending
        },
        sendBatchRequestHandler: (event, items, currentUser) => {

        }
    }
}

export default connect(mapState, mapDispatch)(Basket)
