import React from 'react'
import { connect } from 'react-redux'
import { fetchAllItems, fetchContractAssociations } from '../store'


const InboxCard = (props) => {
    const { request, requests, currentUser, items, inbox, otherUserId } = props
    let message, item 

    item = items.find(singleItem => +singleItem.userId === +otherUserId)
    
    if (request && item) message = `You have a new request from ${item.user.username}`

    //add different messages based off of contract status

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
        items: state.market,
        requests: state.inbox,
        currentUser: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    // dispatch(fetchAllItems())
    return {}
}

export default connect(mapState, mapDispatch)(InboxCard)
