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

    console.log("ownProps: ", ownProps)
    console.log("Pantry Items: ", pantryItems)
    console.log("Items: ", items)

    const title = inPantry ? 'My Pantry' : (pantryItems.length && `${pantryItems[0].user.username}'s Pantry`)
    return (
        <div>
            <div>
                {!inPantry &&
                    <h3 className="pantry-title">{title}</h3>
                }
            </div>
            {inPantry && 
            <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
            <li className="nav-item">
              <a className="nav-link active" id="pills-home-tab" data-toggle="pill" href="#pills-home" role="tab" aria-controls="pills-home" aria-selected="true">All Items</a>
            </li>
                <li className="nav-item">
              <a className="nav-link" id="pills-profile-tab" data-toggle="pill" href="#pills-profile" role="tab" aria-controls="pills-profile" aria-selected="false">
                <i className="fa fa-plus" aria-hidden="true" />
                </a>
            </li>
          </ul>}
          <div className="tab-content" id="pills-tabContent">
            <div className="tab-pane fade show active" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
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
            </div>
            <div className="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
            {inPantry &&
                <AddPantryItem />
            }
            </div>
          </div>
            
            


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
