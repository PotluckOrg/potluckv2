import React from 'react'
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {withRouter, Link} from 'react-router-dom'
import { auth, fetchInbox } from '../store'

/**
 * COMPONENT
 */
const AuthForm = (props) => {
  const {name, displayName, handleSubmit, error} = props

  let link = location.pathname === '/login' ? <Link to="/signup" >Need an account? Sign Up</Link> : <Link to="/login" >Already a user? Log In</Link>

  return (
    <div className="login">
      <form onSubmit={handleSubmit} name={name}>
      <h3>{displayName}</h3>
        <div>
          <label htmlFor="email"><small>Email</small></label>
          <input name="email" type="text" />
        </div>
        <div>
          <label htmlFor="password"><small>Password</small></label>
          <input name="password" type="password" />
        </div>
        <div>
          <button className="btn btn-primary" type="submit">{displayName}</button>
        </div>
        <div className="container-fluid" >
        {link}
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */
const mapLogin = (state) => {
  return {
    name: 'login',
    displayName: 'Login',
    error: state.user.error
  }
}

const mapSignup = (state) => {
  return {
    name: 'signup',
    displayName: 'Sign Up',
    error: state.user.error
  }
}

const mapDispatch = (dispatch) => {
  return {
    handleSubmit (evt) {
      evt.preventDefault()
      const formName = evt.target.name
      const email = evt.target.email.value
      const password = evt.target.password.value
      console.log('formname, email, password', evt.target.name, evt.target.email.value, evt.target.password.value )
      dispatch(auth(email, password, formName))
    }
  }
}

export const Login = connect(mapLogin, mapDispatch)(AuthForm)
export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

/**
 * PROP TYPES
 */
AuthForm.propTypes = {
  name: PropTypes.string.isRequired,
  displayName: PropTypes.string.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  error: PropTypes.object
}
