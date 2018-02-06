import React from 'react'
import {connect} from 'react-redux'
import {getContractUsersAndItems} from '../store'

const LedgerCard = (props) => {
  const {contract, newTrade, getRelatedUsersAndItems} = props
  //getRelatedUsersAndItems(contract)
  console.log("NEWTRADE: ", newTrade)
    //const trade = props.trade
    // const trade = {
    //     user1: {
    //             name: "Ruth",
    //             comments: "Just got sme delicious apples!"
    //           },
    //     user2: {
    //             name: "Lemona",
    //             comments: "TY Lemon for the lettuce <3"
    //     }

    return (
        <div className="card w-100">
        <h1>Cards!</h1>
        </div>
    )
}

const mapState = (state) => {
    return {
      newTrade: state.ledger.trade
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
