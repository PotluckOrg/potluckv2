import React from 'react'
import {connect} from 'react-redux'
import ItemCard from './ItemCard'
import Modal from './Modal'
import ItemForm from './ItemForm'

const Pantry = (props) => {
    const { items, currentUser } = props
    // const modalBody = <ItemForm />
    const modalBody = "ITEM FORM"
    const inPantry = props.match.path === '/pantry' ? true : false
    const myItems = items.filter(item => item.userId === currentUser.id)

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
                <Modal body={modalBody} name="addItem" />
            </div>
            {myItems &&
                myItems.map(item => {
                    return <ItemCard key={item.id} item={item} path={props.match.path} />
                })
            }
        </div>
    )
}

const mapState = (state) => {
    return {
        items: state.market,
        currentUser: state.user,
    }
}

const mapDispatch = (dispatch) => {
    return {

    }
}

export default connect(mapState, mapDispatch)(Pantry)
