import React from 'react'
import { connect } from 'react-redux'
import { fetchAllItems } from '../store'


const InboxCard = (props) => {
    const { request } = props
    let message
    
    const item = props.items.find(item => {
        return item.id === request.contractAssociation.itemId
    })

    //add different messages based off of contract status
    if (request) message = `You have a new request from ${item.user.username}`

    return (
        <div className="card w-100">
            <div className="card-body">
                {message}
            </div>
        </div>
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
