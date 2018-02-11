import React from  'react'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { addPantryItemToDB, createItemForm } from '../store'

const AddPantryItem = (props) => {
  const {user, name, description, handleChange, handleSubmit, iconUrl} = props

  return (
    <div>
      <form id="add-pantry-item" onSubmit={(event) => props.handleSubmit(user, event)}>
        <div>Name:
          <br />
          <input
          className="form-control"
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
            className="form-control"
            name="description"
            value={description}
            onChange={handleChange}
            placeholder="Leave a description of your item"
          />
        </div>
        <br />
        <div className="form-group">
          <label>Pick an image icon:</label>
          <select className="form-control" data-size="5" name="iconUrl" value={iconUrl} onChange={handleChange}>
            <option value="./icons/foodbunch2.svg">Food Bunch</option>
            <option value="./icons/apple.svg">Apple</option>
            <option value="./icons/artichoke.svg">Artichoke</option>
            <option value="./icons/avocado.svg">Avocado</option>
            <option value="./icons/banana.svg">Banana</option>
            <option value="./icons/carrot.svg">Carrot</option>
            <option value="./icons/cheese.svg">Cheese</option>
            <option value="./icons/corn.svg">Corn</option>
            <option value="./icons/eggs.svg">Eggs</option>
            <option value="./icons/grapes.svg">Grapes</option>
            <option value="./icons/ginger.svg">Ginger</option>
            <option value="./icons/leeks.svg">Leeks</option>
            <option value="./icons/lemon.svg">Lemon</option>
            <option value="./icons/lettuce.svg">Lettuce</option>
            <option value="./icons/lemon.svg">Lemon</option>
            <option value="./icons/milk.svg">Milk</option>
            <option value="./icons/mushroom.svg">Mushroom</option>
            <option value="./icons/onion.svg">Onion</option>
            <option value="./icons/orange.svg">Orange</option>
            <option value="./icons/pineapple.svg">Pineapple</option>
            <option value="./icons/potato.svg">Potato</option>
            <option value="./icons/pumpkin.svg">Pumpkin</option>
            <option value="./icons/strawberry.svg">Strawberry</option>
          </select>
        </div>
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
    iconUrl: state.itemForm.iconUrl
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
      const iconUrl = event.target.iconUrl.value
      dispatch(addPantryItemToDB({name, description, userId, iconUrl}))
      dispatch(createItemForm({
        name: '',
        description: '',
        userId: '',
        iconUrl: ''
      }))
    }
  }
}

export default withRouter(connect(mapState, mapDispatch)(AddPantryItem))
