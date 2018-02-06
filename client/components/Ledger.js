import React from 'react'
import {connect} from 'react-redux'
import LedgerCard from './LedgerCard'


const Ledger = (props) => {

    const {completedContracts} = props

  // componentWillUdate(nextProps) {
  //   if (nextProps.completedContracts !== this.prevProps.completedContracts) {
  //     let newTrade = getContractUsersAndItems()
  //     console.log(newTrade)
  //   }
  // }

    return (
          <div>
            <h3>Communit Board</h3>
            <ul className="ledger-list">
                {completedContracts.length > 0 ?
                    completedContracts.map(contract => {
                        return (
                            <li key={contract.id} className="item-card">
                                <LedgerCard contract={contract} />
                            </li>
                        )
                    })
                    : <h1>No contracts have been created.</h1>
                }
            </ul>
          </div>
    )
}

const mapState = (state) => {
    return {
        completedContracts: state.ledger
    }
}

const mapDispatch = (dispatch) => {
  return {

    }
}

export default connect(mapState, mapDispatch)(Ledger)
