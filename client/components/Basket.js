import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import Modal from './Modal'
import { createContract, removeFromBasket, removeFromMyMarket } from '../store'

const Basket = (props) => {
    console.log('basket Props', props)
    let display, hasItem, hasItems
    const user = {
        id: 1,
        name: 'Jamie Hopper'
    }
    const items = props.basket
    const buttonIcon = <i className="fas fa-arrow-circle-right" />
    const modalBody = 'Your request has been sent!'
    // const user = props.user

    if (!items.length) {
        hasItems = false
        hasItem = false
        display = (
            <div>
                <p>Your basket is empty.</p>
                <Link to="/market" className="btn"> Go To Market <i className="fas fa-arrow-circle-right" /></Link>
            </div>
        )
    } else {
        hasItems = true
        hasItem = true
        display = (
            <div>
                <div className="basket-wrapper" >
                    {items &&
                        items.map(item => {
                            return (
                            <div key={item.id}>
                              <ItemCard item={item} />
                              <div onClick={event => props.sendRequestHandler(event, item, user.id)} >
                                  <Modal name={item.id} isVisible={hasItem} icon={buttonIcon} body={modalBody} />
                              </div>
                            </div>
                          )
                        })
                    }
                </div>
            </div>
        )
    }

    return (
        <div>
            {display}
            <div onClick={event => props.sendRequestHandler(event, items, user.id)} >
                <Modal name="request" isVisible={hasItems} icon={buttonIcon} body={modalBody} />
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        basket: state.basket
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        sendRequestHandler: (event, itemObj, userId) => {
                // let allItems = items.map(item => item.name).join(', ')
                const itemName = itemObj.name
                const item = {item: itemName}
                const itemId = itemObj.id
                console.log("mapDispatch UserId: ", userId)
                // The modal failed to appear when I tried to format the item as just a string?!
                console.log('I MADE IT HERE!', item)
                dispatch(createContract(item))
                // items.forEach(item => {
                    dispatch(removeFromBasket(itemId))
                    dispatch(removeFromMyMarket(itemId))
                // })
                //should items keep a state? pending
        }
    }
}

export default connect(mapState, mapDispatch)(Basket)
