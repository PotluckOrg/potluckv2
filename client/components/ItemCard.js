import React from 'react'

const ItemCard = (props) => {
    const user = props.user
    const item = props.item
    // const inPantry = props.history.params.match === '/pantry'
    // const inMarket = props.history.params.match === '/market'
    // const buttonText = inPantry || inMarket ? <i className="fa fa-plus" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true" />
    return (
        <div className="card w-100">
            <div className="card-body">
                <h5 className="card-title">{item.itemName}</h5>
                <p className="card-text">{item.description}</p>
                <button className="btn" onClick={event => handleAddToBasket(event, item.id, user.id)}>HI</button>
            </div>
        </div>
    )
}


// mapDispatchToProps = (dispatch, ownProps) => {
//     return {
//         handleAddToBasket: (event, itemId, userId) => {
//             return () => {
//                 dispatch(addToBasket(itemId, userId))
//             }
//         }
//     }
// }

export default ItemCard