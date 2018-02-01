import React from 'react'
import ItemCard from './ItemCard'

const Pantry = (props) => {
const { myItems } = props
    return (
        <div>
            <h3>My Pantry</h3>
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
