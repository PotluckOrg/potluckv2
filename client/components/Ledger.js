import React, {Component} from 'react'
import { connect } from 'react-redux'
import LedgerCard from './LedgerCard'
import {fetchAllTrades} from '../store'


class Ledger extends Component {
        constructor(props) {
          super(props)
      }

    componentWillMount() {
        this.props.loadAllTrades(this.props.contracts)
    }

    render () {
      const {allTrades} = this.props
      return (
        <div>
          <h3>Communit Board</h3>
          <ul className="ledger-list">
            { allTrades.length > 0 ?
              allTrades.map(trade => {
                return (
                  <li key={trade.comment} className="item-card">
                    <LedgerCard trade={trade} />
                  </li>
                )
              })
              : <h1>No recent Trades have been created.</h1>
            }
          </ul>
        </div>
      )
    }
}

const mapState = (state) => {
  console.log("STATE: ", state)
  return {
    allTrades: state.trade,
    contracts: state.ledger
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadAllTrades (completedContracts) {
      dispatch(fetchAllTrades(completedContracts))
    }
  }
}

export default connect(mapState, mapDispatch)(Ledger)
