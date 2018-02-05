import React from 'react'
import ItemCard from './ItemCard'
import Pantry from './Pantry'
import {connect} from 'react-redux'
import {updateContract} from '../store'

const RequestTicket = (props) => {
    const dummyContract = {
      id: 1,
      contractAddress: '0xac4f4D4Ef8CEc4dd5cEEFAc935f414e3E562Aa33'
    }

    const { items, contractId, sender, senderPantry, currentUser } = props
    // const buttonIcon =
    return (
        <div className="request-ticket">
            <h5>Lets make a swap!</h5>
            <div className="requested-items">
                <ul>
                    {items &&
                        items.map(item => {
                            return <li key={item.id} item={item} />
                        })
                    }
                </ul>
            </div>
            <div className="sender-pantry">
                <Pantry userId={sender} />
            </div>
            <button type="button" className="btn btn-primary" onClick={event => props.updateContractHandler(event, dummyContract, items, sender, currentUser)}>Update Contract</button>
        </div>
    )
}

const mapState = (state) => {
  return {
    currentUser: state.user
  }
}
const mapDispatch = (dispatch) => {
  return {
          updateContractHandler: (items, dummyContract, sender, currentUser) => {
            const solicitorId = sender.id
            dispatch(updateContract(items, dummyContract, currentUser, solicitorId)) // sends update to contract via web3, and then gets all contracts
            // will request ticket automatically update?
            // need to send message to the user who initiated the contract
          }
      }
  }

export default connect(mapState, mapDispatch)(RequestTicket)
