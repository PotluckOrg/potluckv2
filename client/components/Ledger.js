import React, {Component} from 'react'
import {connect} from 'react-redux'
import LedgerCard from './LedgerCard'


class Ledger extends Component {


  componentWillUdate(nextProps) {
    if (nextProps.foodContracts !== this.prevProps.foodContracts) {
      let tradedUsers = getContractUsers(foodContract.contractAddress)
        this.trade = {
        user1: {
          username: tradedUsers[0].username,
          comments: tradedUsers[0].comments
        },
        user2: {
          username: tradedUsers[1].username,
          comments: tradedUsers[1].comments
        }
      }
    }
  }

    render () {
      let {foodContracts} = this.props.foodContracts
        return (
          <div>
            <h3>Communit Board</h3>
            <ul className="ledger-list">
                {foodContracts &&
                    foodContracts.map(contract => {
                        return (
                            <li key={contract.id} className="item-card">
                                <LedgerCard trade={this.trade} />
                            </li>
                        )
                    })
                }
            </ul>
          </div>
      )
    }
}

const mapState = (state) => {
    return {
        foodContracts: state.foodContracts
    }
}

const mapDispatch = (dispatch) => {
  return {
    getContractUsers() {
      dispatch(fetchContractUsers(foodContract.contractAddress))
    }
  }
}

export default connect(mapState, mapDispatch)(Ledger)
