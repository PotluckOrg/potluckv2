import React from 'react'
import {connect} from 'react-redux'

const LedgerCard = (props) => {
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
            <div className="card-body">
                <h5 className="card-title">{props.trade.user1.username} just <i className="far fa-handshake" /> with {props.trade.user2.username} !</h5>
                <p className="card-text">
                {props.trade.user1.username} : {props.trade.user1.comment}
                </p>
                <p className="card-text">
                {props.trade.user2.username} : {props.trade.user2.comment}</p>

            </div>
        </div>
    )
}

const mapState = (state) => {
    return {
        contract: state.contacts
    }
}

const mapDispatch = (dispatch, ownProps) => {

    return {
    }
}

export default connect(mapState, mapDispatch)(LedgerCard)
