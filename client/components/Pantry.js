import React from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Modal from './Modal'
import ItemForm from './ItemForm'
import AddPantryItem from './AddPantryItem'

const Pantry = (props) => {
    console.log('I AM PANTRY PROPS', props)
    const { items, currentUser, path, senderId, pantryItems } = props

    const inPantry = path === '/pantry'
    const title = inPantry ? 'My Pantry' : `${pantryItems[0].user.username}'s Pantry`
    return (
        <div>
            <div>
                <h3 className="pantry-title">{title}</h3>
                {inPantry && 
                    <button
                        id="addItem"
                        type="button"
                        className="btn btn-primary"
                        data-toggle="modal"
                        data-target="#addItemModal"
                        data-whatever="addItem"
                    >
                        <i className="fa fa-plus" aria-hidden="true" />
                    </button>}
            </div>
            {inPantry && pantryItems &&
                pantryItems.map(item => {
                    return <ItemCard key={item.id} item={item} path={path} />
                })
            }
            {!inPantry && pantryItems &&
                pantryItems.map(item => {
                    return <ItemCard key={item.id} item={item} path={'/pantry'} />
                })
            }

            {inPantry && 
            
                <AddPantryItem />
            
            
            }
            <AddPantryItem />
        </div>
    )
}

const mapState = (state, ownProps) => {
    console.log('I AM OWN PROPS', ownProps)
    let items
    ownProps.path ?
    // their items
    items = state.market.filter(item => +item.userId === +ownProps.senderId)
    :
    // my items
    items = state.market.filter(item => +item.userId === +state.user.id)
    return {
        pantryItems: items,
        currentUser: state.user,
        // path: ownProps.match.path
    }
}

const mapDispatch = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatch)(Pantry)
