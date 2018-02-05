import React from 'react'
import ItemCard from './ItemCard'
import Pantry from './Pantry'
import {updateContract} from '../store'
import {connect} from 'react-redux'

const RequestTicket = (props) => {
    const { items, contractId, sender, senderPantry, updateContractHandler } = props
    return (
        <div className="request-ticket">
            <h5>Let's make a swap!</h5>
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
          updateContractHandler: (item) => {
            dispatch(updateContract(item))
          }
      }
  }

  export default connect(mapState, mapDispatch)(RequestTicket)
