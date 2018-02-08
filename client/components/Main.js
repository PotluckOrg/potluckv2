import React from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {withRouter, Link} from 'react-router-dom'
import {logout, stopGethInst} from '../store'

/**
 * COMPONENT
 *  The Main component is our 'picture frame' - it displays the navbar and anything
 *  else common to our entire app. The 'picture' inside the frame is the space
 *  rendered out by the component's `children`.
 */
const Main = (props) => {

  const {children, handleClick, isLoggedIn, user, inbox, basket, stopGeth} = props

  return (
    <div>
      <h1 id="title">POTLUCK</h1>
      <nav>
        {
          isLoggedIn &&
             <div>
              {/* The navbar will show these links after you log in */}
              <Link to="/community">Community</Link>
              <Link to="/market">Market</Link>
              <Link to="/basket"><i className="fas fa-shopping-basket" />({basket.length})</Link>
              <Link to="/inbox"><i className="fas fa-envelope" />({Object.keys(inbox).length})</Link>
              <Link to="/account"><i className="fas fa-cog" /></Link>
              <Link to="/messageinbox">Messages</Link>
              <Link to="/pantry"><img src="./icons/489212-200.png" className="menu-icon" /></Link>
              <a href="/" onClick={(event) => handleClick(event, user, stopGeth)}>Logout</a>

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
    user: state.user,
    inbox: state.inbox
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleClick (evt, user, stopGeth) {
      dispatch(logout())
      stopGeth(user)
    },
    stopGeth (user) {
      dispatch(stopGethInst(user))
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
