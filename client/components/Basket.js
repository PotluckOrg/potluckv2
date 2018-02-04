import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import Modal from './Modal'
import { createContractWeb3, removeFromBasket, removeFromMyMarket } from '../store'

const Basket = (props) => {
    console.log('basket Props', props)
    let display, hasItems, cardDisplay = []
    let itemsByOwner = new Map()

    const items = props.basket
    const itemOwners = new Set()
    items.forEach(item => itemOwners.add(item.userId))
    const buttonIcon = <i className="fas fa-arrow-circle-right" />
    const modalBody = 'Your request has been sent!'
    const currentUser = props.currentUser

    itemOwners.forEach((v1, v2, set) => {
        itemsByOwner.set(v1, items.filter(item => item.userId === v2))
    })

    itemsByOwner.forEach((ownersItems, itemOwner, map) => {
        cardDisplay.push(<ItemCard key={itemOwner} items={ownersItems} path={props.match.path} />)
    })

    if (!items.length) {
        hasItems = false
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
            <div onClick={event => props.sendRequestHandler(event, items, currentUser)} >
                <Modal name="batch-request" isVisible={hasItems} icon={buttonIcon} body={modalBody} />
            </div>
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
        sendRequestHandler: (event, items, currentUser) => {
                let allItems = items.map(item => item.name).join(', ')
                const soliciteeId = items[0].userId
                console.log("mapDispatch UserIpcAddr: ", currentUser)
                console.log('ALLITEMS', allItems)
                // The modal failed to appear when I tried to format the item as just a string?!
                dispatch(createContractWeb3(allItems, currentUser, soliciteeId))
                items.forEach(item => {
                    dispatch(removeFromBasket(item.id))
                    dispatch(removeFromMyMarket(item.id))
                })
                //should items keep a state? pending
        }
    }
}

export default connect(mapState, mapDispatch)(Basket)
