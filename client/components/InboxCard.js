import React from 'react'
import { connect } from 'react-redux'
import { fetchAllItems, fetchContractAssociations } from '../store'


const InboxCard = (props) => {
    const { request, associations, currentUser, items } = props
    let message, item, filteredAssociations
    
    // const item = props.items.find(item => {
    //     return item.id === request.contractAssociation.itemId
    // })
    let lengthCheck = associations.length

    if (lengthCheck && items) {
        filteredAssociations = associations.filter(association => association.userId !== currentUser.id)
        item = items.find(item => item.id === filteredAssociations[0].itemId)
        if (request) message = `You have a new request from ${item.user.username}`
    }

    //add different messages based off of contract status
 
    return (
            lengthCheck &&
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
        associations: state.contractAssociations,
        currentUser: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    // dispatch(fetchAllItems())
    dispatch(fetchContractAssociations(ownProps.request.id))
    return {}
}

export default connect(mapState, mapDispatch)(InboxCard)
