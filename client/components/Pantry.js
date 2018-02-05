import React from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Modal from './Modal'
import ItemForm from './ItemForm'

const Pantry = (props) => {
    const { items, currentUser, path, senderId } = props
    // const modalBody = <ItemForm />
    const modalBody = "ITEM FORM"
    const inPantry = path === '/pantry' ? true : false
    const myItems = items.filter(item => item.userId === currentUser.id)
    const theirItems = items.filter(item => item.userId === senderId)


    return (
        <div>
            <div>
                <h3 className="pantry-title" >My Pantry</h3>
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
                {/*<Modal body={modalBody} name="addItem" />*/}
            </div>
            {inPantry && myItems &&
                myItems.map(item => {
                    return <ItemCard key={item.id} item={item} path={path} />
                })
            }
            {!inPantry && theirItems &&
                theirItems.map(item => {
                    return <ItemCard key={item.id} item={item} path={'/pantry'} />
                })
            }
        </div>
    )
}

const mapState = (state, ownProps) => {
    return {
        items: state.market,
        currentUser: state.user,
        // path: ownProps.match.path
    }
}

const mapDispatch = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatch)(Pantry)
