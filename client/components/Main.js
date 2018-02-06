import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, stopGethInst, checkGethPeers} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {
  const {children, handleClick, handlePeersClick, isLoggedIn, user, stopGeth, checkPeers} = props
  return (
    <div>
      <h1 id="title">POTLUCK</h1>
      <nav>
        {
          isLoggedIn
            ? <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/market">Market</Link>
              <Link to="/basket"><i className="fas fa-shopping-basket" />({props.basket && props.basket.length})</Link>
              <Link to="/inbox"><i className="fas fa-envelope" />({props.user.contracts ? props.user.contracts.length : 0})</Link>
              <Link to="/account"><i className="fas fa-cog" /></Link>
              <Link to="/messageinbox">Messages</Link>
              <Link to="/pantry"><img src="./icons/489212-200.png" className="menu-icon" /></Link>
              <a href="/" onClick={(event) => handleClick(event, user, stopGeth)}>Logout</a>
              <a href="#" onClick={(event) => handlePeersClick(event, user, checkPeers)}>CheckPeers</a>
            </div>
            : <div>
                {/* The navbar will show these links before you log in */}
                <Link to="/login">Login</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
        }
      </nav>
      <hr />
      {children}
    </div>
  )
}

/**
 * CONTAINER
 */
const mapState = (state) => {
  return {
    isLoggedIn: !!state.user.id,
    basket: state.basket,
    user: state.user
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (evt, user, stopGeth) {
      dispatch(logout())
      stopGeth(user)
    },
    handlePeersClick (evt, user, checkPeers) {
      checkPeers(user)
    },
    stopGeth (user) {
      dispatch(stopGethInst(user))
    },
    checkPeers (user) {
      dispatch(checkGethPeers(user))
    }
  }
}

// The `withRouter` wrapper makes sure that updates are not blocked
// when the url changes
export default withRouter(connect(mapState, mapDispatch)(Main))

/**
 * PROP TYPES
 */
Main.propTypes = {
  children: PropTypes.object,
  handleClick: PropTypes.func.isRequired,
  isLoggedIn: PropTypes.bool.isRequired
}
