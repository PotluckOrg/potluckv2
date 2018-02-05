import React from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Pantry from './Pantry'
import { fetchContractAssociations, updateContract } from '../store'

const RequestTicket = (props) => {
    console.log('PROPS FROM request ticket', props)
    const request = props.currentUser.contracts.find(contract => +contract.id === +props.match.params.id)

    const { items, contractId, associations, currentUser, offer, updateContractHandler } = props
    let itemsRequested = []


    let lengthCheck = associations.length
    let message, item, filteredAssociations, sender, associationsBySender


    if (lengthCheck) {
        filteredAssociations = associations.filter(association => association.userId === currentUser.id)
        items.filter(item => item.id === filteredAssociations[0].itemId)

        associationsBySender = associations.filter(association => association.userId !== currentUser.id)
        console.log('associationsBySender', associationsBySender)
        sender = associationsBySender[0].userId
    }

 

    // UPDATE ASSOCIATIONS MODEL TO MAKE ASSOCIATIONS FOR MULTIPLE ITEMS
    filteredAssociations.map(association => {
        let item = items.find(item => item.id === association.itemId)
        itemsRequested.push(item)
    })

    let card;

    return (
        <div className="request-ticket">
            <h5>Let's make a swap!</h5>
            <p>Status: {request.status} </p>
            <div className="requested-items">
                <ul className="request-ticket-card"  >
                    {itemsRequested &&
                        itemsRequested.map(item => {
                            return <li key={item.id}><ItemCard itemOwnerId={item.userId} item={item} path={props.match.path} /></li>
                        })
                    }
                </ul>
                {(offer ? (
                    <div>
                        <h3>Offer</h3>
                        <div className="btn" onClick={() => updateContractHandler([{name: '1 eggplant', id: 1, description: 'lol', userId: currentUser.id}], request, sender, currentUser )}>
                        Want an Eggplant?</div>
                    
                    </div>
                ) : null)}
                
            </div>
            <hr />
            <div className="sender-pantry">
                <Pantry senderId={sender} path={props.match.path} />
            </div>
        </div>
    )
}

const mapState = (state, ownProps) => {
    return {
        items: state.market,
        requests: state.contracts,
        currentUser: state.user,
        associations: state.contractAssociations,
        contractId: ownProps.match.params.id,
        offer: state.offer
    }
}

const mapDispatch = (dispatch, ownProps) => {

    return {
        updateContractHandler: (items, dummyContract, sender, currentUser) => {
        const solicitorId = sender.id
        dispatch(updateContract(items, dummyContract, currentUser, solicitorId)) 
            // sends update to contract via web3, and then gets all contracts
             // will request ticket automatically update?
          // need to send message to the user who initiated the contract
         }

    }
}



export default connect(mapState, mapDispatch)(RequestTicket)
