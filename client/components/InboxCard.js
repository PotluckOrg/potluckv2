import React from 'react'
import { connect } from 'react-redux'
import { fetchAllItems, fetchContractAssociations } from '../store'


const InboxCard = (props) => {
    const { request, requests, contracts, currentUser, items, inbox, otherUserId } = props

    let displayMessage

    const item = items.find(singleItem => +singleItem.userId === +otherUserId)

    const contract = contracts.find(oneContract => +request.id === +oneContract.id)

    let message = ((currentContract) => {
      switch (currentContract.status) {
        case 'Created':
          return `You have a new request from ${item.user.username}`
        case 'FirstReview': // user2 is looking over user1's initial trade request
          return `${item.user.username} is considering your request!`
        case 'SecondReview': // user1 reviews updated request and will confirm the trade with "Let's Swap!"
          return `${item.user.username} has responded - confirm your trade!`
        case 'Pending': // after user1 has confirmed the trade with "Let's Swap"
          return `You and ${item.user.username} have agreed to trade...`
        // case 'Completed':
        default:
          return `Your trade with ${item.user.username}`
      }
    })

    if (request && item) displayMessage = message(contract)

    // SWITCH on contract.status
    // find one item in the current request that belongs to the other user, so that we can interpolate that user's username into the message

    // if (request && item) message = `You have a new request from ${item.user.username}`

    //add different messages based off of contract status

    return (
                <div className="card w-100">
                    <div className="card-body">
                        {displayMessage}
                    </div>
                </div>
            )
}

const mapState = (state) => {
    return {
        items: state.market,
        requests: state.inbox,
        currentUser: state.user,
        contracts: state.requests
    }
}

const mapDispatch = (dispatch, ownProps) => {
    // dispatch(fetchAllItems())
    return {}
}

export default connect(mapState, mapDispatch)(InboxCard)
