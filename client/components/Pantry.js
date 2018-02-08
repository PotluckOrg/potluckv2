import React from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Modal from './Modal'
import ItemForm from './ItemForm'
import AddPantryItem from './AddPantryItem'
// import { fetchAllItems } from '../store'

const Pantry = (props) => {

    const { items, currentUser, senderId, ownProps } = props
    const path = ownProps.path ? ownProps.path : props.match.path
    const inPantry = path === '/pantry'
    const pantryItems = inPantry ?
    // my items
    items.filter(item => +item.userId === +currentUser.id)
      :
    // path = ownProps.path
    // their items
    items.filter(item => +item.userId === +ownProps.senderId)


    const title = inPantry ? 'My Pantry' : (pantryItems.length && `${pantryItems[0].user.username}'s Pantry`)
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
                    </button>

                }
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


        </div>
    )
}

const mapState = (state, ownProps) => {
    return {
        items: state.market,
        currentUser: state.user,
        ownProps: ownProps
        // path: path
    }
}

// const mapDispatch = (dispatch, ownProps) => {
//     console.log('OWN PROPS IN PANTRY', ownProps)
//
//     return {}
// }

export default connect(mapState)(Pantry)
