import React from 'react'
import {connect} from 'react-redux'
import { withRouter, Link } from 'react-router-dom'


const Account = (props) => {

    const user = props.currentUser


    return (
        <div>
            {/*<h2>Account</h2>*/}
            <h3>Welcome, {user.username}</h3>
            <h3>Potluck points: {user.rating}</h3>
            <a href="/" onClick={(event) => handleClick(event, user, stopGeth)}>Logout</a>

        </div>
    )
}

const mapState = (state) => {
    return {
        currentUser: state.user
    }
}

const mapDispatch = (dispatch, ownProps) => {
    return {

    }
}

// delete me later

export default connect(mapState, mapDispatch)(Account)
