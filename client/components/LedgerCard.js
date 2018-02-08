import React, {Component} from 'react'
import {connect} from 'react-redux'

const LedgerCard = (props) => {

      const {trade} = props
      let tradeItemImgsUser1 = trade.user1.itemImgs.map( (item, index) => <img className="ledger-item-img" src={item} key={index} />)
      let tradeItemImgsUser2 = trade.user2.itemImgs.map( (item, index) => <img className="ledger-item-img" src={item} key={index} />)
        return (
          <div className="card w-100">
          { trade.user1 ?
            <div className="card-body">
            <h5 className="card-title">{trade.user1.name} traded
            {tradeItemImgsUser1} for {trade.user2.name}'s
              {tradeItemImgsUser2}
              !</h5>
            <p className="card-text">
            {trade.user1.name} : {trade.user1.comments}
            </p>
            <p className="card-text">
            {trade.user2.name} : {trade.user2.comments}</p>

            </div>
            : <h1>No Recent Trades!</h1>
            }
          </div>
      )
}

const mapState = (state) => {
    return {
    }
}

const mapDispatch = (dispatch) => {
    return {
      getRelatedUsersAndItems(contract) {
        dispatch(getContractUsersAndItems(contract))
      }
  }
}

export default connect(mapState, mapDispatch)(LedgerCard)

