import React from 'react'
import { connect } from 'react-redux'
import { fetchAllItems } from '../store'


const InboxCard = (props) => {
    const { request } = props
    const item = props.items.find(item => {
        return item.id === request.contractAssociation.itemId
    })

    let card;

    if (request.status === 'Pending') {
        card = 
            <div className="card-body">
                <h5 className="card-title">{request.userId}</h5>
                <h5 className="card-title">User you're trading with: {item.name}</h5>
                <h5 className="card-title">Item you'll receive: {item.name}</h5>
                <h5 className="card-title">Item you're trading: {item.name}</h5>
                <p>Item description: {item.description}</p>
                <button>Confirm that you've received your food!</button>
            </div>
    }

    if (request.status === 'Completed') {
        card = 
            <div className="card-body">
                <h5 className="card-title">{request.userId}</h5>
                <h5 className="card-title">You completed a trade with:  {item.name}</h5>
            </div>
    }


    return (
        <a href={`/${request.id}`} className="card-link">
            <div className="card w-100">
                <div className="card-body">
                   {card}
                </div>
            </div>
        </a>
    )
}

const mapState = (state) => {
    return {
        items: state.market
    }
}

const mapDispatch = (dispatch, ownProps) => {
    dispatch(fetchAllItems())
    return {}
}

export default connect(mapState, mapDispatch)(InboxCard)
