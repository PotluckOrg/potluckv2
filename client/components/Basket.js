import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'
import ItemCard from './ItemCard'
import Modal from './Modal'
import { createContract, removeFromBasket, removeFromMyMarket } from '../store'

const Basket = (props) => {
    console.log('basket Props', props)
    let display, isVisible
    const user = {
        id: 1,
        name: 'Jamie Hopper'
    }
    const items = props.basket
    // const user = props.user

    if (!items.length) {
        isVisible = false
        display = (
            <div>
                <p>Your basket is empty.</p>
                <Link to="/market" className="btn"> Go To Market <i className="fas fa-arrow-circle-right" /></Link>
            </div>
        )
    } else {
        isVisible = true
        display = (
            <div>
                <div className="basket-wrapper" >
                    {items &&
                        items.map(item => {
                            return <ItemCard key={item.id} item={item} />
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
                <Modal name="request" isVisible={isVisible} />
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
        sendRequestHandler: (event, items, userId) => {
                let contractItem = items.map(item => item.name).join(', ')
                console.log('I MADE IT HERE!', contractItem, userId)
                //dispatch(createContract(contractItem, userId))
                items.forEach(item => {
                    dispatch(removeFromBasket(item.id))
                    dispatch(removeFromMyMarket(item.id))
                })
                //should items keep a state? pending 
        }
    }
}

export default connect(mapState, mapDispatch)(Basket)
