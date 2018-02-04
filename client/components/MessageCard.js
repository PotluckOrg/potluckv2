import React from 'react'
import {connect} from 'react-redux'
// import { addToBasket, removeFromBasket, returnToMyMarketThunk, removeFromMyMarket } from '../store'

const MessageCard = (props) => {

    const message = props.message
   
    return (
        <div className="card w-100">
            <div className="card-body">
                { /*<img src={`${item.iconUrl}`} className="card-icon" height="75" width="75" /> */}
                <h5 className="card-title">{message.subject}</h5>
                <p className="card-text">{message.messageBody}</p>
                <button className="btn" onClick={(() => {console.log('CLICK')})}>Send message</button>
            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        user: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {

    return {
        // handleAddToBasket: (event, item, userId) => {
        //         dispatch(addToBasket(item, userId))
        //         dispatch(removeFromMyMarket(item.id))
        // },
        // handleRemoveFromBasket: (event, itemId, userId) => {
        //         dispatch(removeFromBasket(itemId, userId))
        //         dispatch(returnToMyMarketThunk(itemId))
        // }
    }
}

export default connect(mapState, mapDispatch)(MessageCard)
