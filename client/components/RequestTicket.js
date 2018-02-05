import React from 'react'
import ItemCard from './ItemCard'
import Pantry from './Pantry'

const RequestTicket = (props) => {
    const { items, contractId, sender, senderPantry } = props
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
        </div>
    )
}

const mapState = (state) => {
  return {
    //state items here
  }
}
const mapDispatch = (dispatch) => {
  return {
          updateContractHandler: (item, contractAddress) => {
            dispatch(updateContract(item, contractAddress)) // sends update to contract via web3, and then gets all contracts
            // will request ticket automatically update?
            // need to send message to the user who initiated the contract
          }
      }
  }

export default connect(mapState, mapDispatch)(RequestTicket)
