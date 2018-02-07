import React from  'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addPantryItemToDB, createItemForm } from '../store'

const AddPantryItem = (props) => {
  const {user, name, description, handleChange, handleSubmit} = props

  return (
    <div>
      <form id="submit-review" onSubmit={(event) => props.handleSubmit(user, event)}>
        <div>Name:
          <br />
          <input
            label="item-name"
            type="text"
            name="name"
            value={name}
            onChange={handleChange}
          />
        </div> 

        <br />
        <div>Item description:
          <br />
          <textarea
            label="item-description"
            rows="5"
            cols="52"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Leave a description of your item"
          />
        </div>

        <br />
        <button type="Submit" >Add item</button>
      </form>
    </div>
  )
}

const mapState = (state) => {
  return {
    user: state.user,
    name: state.itemForm.name,
    description: state.itemForm.description,
  }
}


const mapDispatch = (dispatch, ownProps) => {
  return {
    handleChange (event) {
      const changedInputVals = {}
      changedInputVals[event.target.name] = event.target.value
      dispatch(createItemForm(changedInputVals))
    },
    handleSubmit (user, event) {
      event.preventDefault()
      const name = event.target.name.value
      const description = event.target.description.value
      const userId = user.id
      dispatch(addPantryItemToDB({name, description, userId}))
      dispatch(createItemForm({
        name: '',
        description: '',
        userId: ''
      }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddPantryItem))
