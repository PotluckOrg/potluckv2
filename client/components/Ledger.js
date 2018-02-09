import React, {Component} from 'react'
import { connect } from 'react-redux'
import LedgerCard from './LedgerCard'
import {fetchAllTrades} from '../store'
import toast from 'toastr'


class Ledger extends Component {
        constructor(props) {
          super(props)
      }

      componentDidMount () {
        // console.log("MOUNTED", this.props)
        // if (this.props.allTrades.length && this.props.allTrades.length !== this.props.contracts.length){
        //   console.log("IN IF", this.props.contracts, this.props.allTrades)
        //   this.props.loadAllTrades(this.props.contracts)
        // } else {
        //   //DO NOTHING
        //   console.log("DO NOTHING")
        //   return
        // }
      }

    render () {
      const {allTrades, inbox} = this.props
      toast.options.positionClass = "toast-top-right"
      if (inbox['1']) {
        toast.warning('You have pending requests!')
      }
      return (
        <div>
      {/*<h3>Community Board</h3>*/}
          <ul className="ledger-list">
            { allTrades.length > 0 ?
              allTrades.map((trade, index) => {
                return (
                  <li key={index} className="item-card">
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
  return {
    allTrades: state.trade,
    contracts: state.ledger,
    inbox: state.inbox
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
