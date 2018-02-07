import React, {Component} from 'react'
import {connect} from 'react-redux'
import {getContractUsersAndItems} from '../store'

class LedgerCard extends Component {

    componentDidMount () {
      //run this the first time only
      this.props.getRelatedUsersAndItems(this.props.contract)
    }

    componentWillReceiveProps (nextProps) {
      if (nextProps.allTrades !== this.props.allTrades){
        this.props.getRelatedUsersAndItems(this.props.contract)
      }
    }


    render () {
      const allTrades = []
      const {trade} = this.props
      if (trade) allTrades.push(trade)
        return (
          <div className="card w-100">
          { allTrades.length > 0 ?
            <div className="card-body">
            <h5 className="card-title">{trade.user1.username} just <i className="far fa-handshake" /> with {trade.user2.username} !</h5>
            <p className="card-text">
            {trade.user1.username} : {trade.user1.comment}
            </p>
            <p className="card-text">
            {trade.user2.username} : {trade.user2.comment}</p>

            </div>
            : <h1>No Recent Trades!</h1>
            }
          }
          </div>
      )
    }
}

const mapState = (state) => {
    return {
      allTrades: state.trade
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




