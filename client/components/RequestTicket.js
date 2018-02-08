import React, { Component } from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Pantry from './Pantry'
import { fetchContractAssociations, updateContract, removeFromOffer, removeFromMyMarket, updateContractStatus, fetchInbox, completeSwapHandler, updateContractAssociation} from '../store'

const RequestTicket = (props) => {
    const { items, contractId, currentUser, offer, updateContractHandler, requests, contracts, approveSwapHandler} = props

    const contractInQuestion = contracts.find(contract => +contract.id === +contractId)


    let senderId
    if (requests.length > 0 && contractId){ senderId = requests[contractId].otherUserId}
    const senderItems = items.filter(item => item.userId === senderId)
    const sender = senderItems[0].user

    const request = requests[contractId]

    const reqAssociation = request.associations.find(assoc => assoc.userId !== currentUser.id)

    const resAssociation = request.associations.find(assoc => assoc.userId === currentUser.id)

    let reqItemIds
    if (reqAssociation.itemIds) {
      reqItemIds = reqAssociation.itemIds.split(", ")
    }
    let reqContractItems
    if (reqItemIds) {
      reqContractItems = reqItemIds.map(oneItemId => {
      return items.find(item => +item.id === +oneItemId)
    })
  }

    return (
        <div className="request-ticket">
            <h5>Lets make a swap!</h5>
            <p>Status: {contractInQuestion.status} </p>
            <div className="requested-items">
                <h3>Requested from you:</h3>
                <ul className="request-ticket-card"  >
                    {reqContractItems &&
                            <li>
                                <ItemCard itemOwnerId={currentUser.id} items={reqContractItems} path={props.match.path} inRequest="true" />

                                {
                                  contractInQuestion.status === 'SecondReview' &&
                                  <button type="button" className="btn btn-primary" onClick={() => approveSwapHandler(contractId)}> Accept Trade
                                  </button>
                                }

                                {
                                  contractInQuestion.status === 'Pending' &&
                                  (
                                    <form onSubmit={(event) => completeSwapHandler(event, contractId, currentUser)}>
                                    Comment on your trade:<br />
                                    <input type="text" name="comment" />
                                    <button type="submit" className="btn btn-primary" > Accept Trade
                                    </button>
                                    </form>
                                  )

                                }
                            </li>
                    }
                </ul>
                <h3>Your request:</h3>
                {offer &&
                    <div>
                        <ItemCard itemOwnerId={senderId} items={offer} path={props.match.path} inRequest="true" />
                        <button type="button" className="btn btn-primary" onClick={() => updateContractHandler(offer, contractInQuestion, sender, senderId, currentUser)}>
                            <i className="fas fa-arrow-circle-right" />
                        </button>
                    </div>
                }

            </div>
            <hr />
                <div className="sender-pantry">
                <Pantry senderId={senderId} path={props.match.path} />
            </div>

        </div>


    )
}

const mapState = (state, ownProps) => {
    return {
        items: state.market,
        requests: state.inbox,
        currentUser: state.user,
        contractId: ownProps.match.params.id,
        offer: state.offer,
        contracts: state.requests
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        updateContractHandler: (items, contract, sender, senderId, currentUser) => {
          const solicitor = sender
          dispatch(updateContract(items, contract, solicitor, senderId, currentUser))
          items.forEach(item => {
            // dispatch(removeFromOffer(item.id))
            dispatch(removeFromMyMarket(item.id))
        })
            // sends update to contract via web3, and then gets all contracts
             // will request ticket automatically update?
          // need to send message to the user who initiated the contract
        },
         approveSwapHandler: (contractId) => {
           dispatch(updateContractStatus(contractId, {status: 'Pending'}))
           dispatch(fetchInbox())
         },
         completeSwapHandler: (event, contractId, currentUser) => {
           event.preventDefault()
          dispatch(updateContractStatus(contractId, {status: 'Pending'}))
          dispatch(updateContractAssociation(contractId, currentUser, event.target.comment.value))
          dispatch(fetchInbox())
        }

    }
}

export default connect(mapState, mapDispatch)(RequestTicket)
