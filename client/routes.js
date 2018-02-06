import React, { Component } from 'react'
import { connect } from 'react-redux'
import { Route, Switch, Router } from 'react-router-dom'
import PropTypes from 'prop-types'
import history from './history'
import {Main, Login, Signup, UserHome, Market, Basket, Inbox, Account, MessageInbox, Pantry, RequestTicket, Ledger} from './components'
import {me, fetchContracts, fetchAllItems, fetchCompletedContracts} from './store'


/**
 * COMPONENT
 */
class Routes extends Component {
  componentDidMount() {
    this.props.loadInitialData()
  }

  render() {
    const {isLoggedIn} = this.props

    return (
      <Router history={history}>
        <Main>
          <Switch>
            {/* Routes placed here are available to all visitors */}
            <Route path="/login" component={Login} />
            <Route path="/signup" component={Signup} />
            {
              isLoggedIn &&
              <Switch>
              {/* Routes placed here are available to logged in users */}
              <Route path="/market" component={Market} />
              <Route path="/community" component={Ledger} />
              <Route path="/basket" component={Basket} />
              <Route path="/inbox" component={Inbox} />
              <Route path="/account" component={Account} />
              <Route path="/messageinbox" component={MessageInbox} />
              <Route path="/pantry" component={Pantry} />
              <Route path="/:id" component={RequestTicket} />
              </Switch>
            }
            {/* Displays our Login component as a fallback */}
            <Route component={Login} />
          </Switch>
        </Main>
      </Router>
    )
  }
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    // Being 'logged in' for our purposes will be defined has having a state.user that has a truthy id.
    // Otherwise, state.user will be an empty object, and state.user.id will be falsey
    isLoggedIn: !!state.user.id,
    currentUser: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    loadInitialData () {
      dispatch(me())
      dispatch(fetchContracts())
      dispatch(fetchCompletedContracts())
      dispatch(fetchAllItems())
    }
  }
}

export default connect(mapState, mapDispatch)(Routes)
// export default Routes

/**
 * PROP TYPES
 */
Routes.propTypes = {
  loadInitialData: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
