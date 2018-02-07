import React, {Component} from 'react'
import {connect} from 'react-redux'

const LedgerCard = (props) => {

      const {trade} = props
        return (
          <div className="card w-100">
          { trade.user1 ?
            <div className="card-body">
            <h5 className="card-title">{trade.user1.name} just <i className="far fa-handshake" /> with {trade.user2.name} !</h5>
            <p className="card-text">
            {trade.user1.name} : {trade.user1.comment}
            </p>
            <p className="card-text">
            {trade.user2.name} : {trade.user2.comment}</p>

            </div>
            : <h1>No Recent Trades!</h1>
            }
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

