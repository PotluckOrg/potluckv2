import React from 'react'
import ItemCard from './ItemCard'
import Modal from './Modal'
import ItemForm from './ItemForm'

const Pantry = (props) => {
const { myItems } = props
const buttonIcon = <i className="fa fa-plus" aria-hidden="true" />
const modalBody = <ItemForm />
const inPantry= history.match == '/pantry' ? true : false
    return (
        <div>
            <div>
                <h3>My Pantry</h3>
                <Modal icon={buttonIcon} body={modalBody} isVisible={inPantry} />
            </div>
            {myItems &&
                myItems.map(item => {
                    return <ItemCard key={item.id} item={item} />
                })
            }
        </div>
    )
}

const mapState = (state) => {
    return {
      products: state.products,
      currentUser: state.user,
    }
}

const mapDispatch = (dispatch) => {
    return {
            dispatch(getItems())
        }
    }
}


export default connect(mapState, mapDispatch)(Pantry)
