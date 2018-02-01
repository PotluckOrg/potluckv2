import React from 'react'

const ItemCard = (props) => {
    const item = props.item
    const inPantry = props.history.params.match === '/pantry'
    const buttonText = inPantry ? <i className="fa fa-plus" aria-hidden="true" /> : <i className="fa fa-times" aria-hidden="true" />
    return (
        <div className="card w-100">
            <div className="card-body">
                <h5 className="card-title">{item.name}</h5>
                <p className="card-text">{item.description}</p>
                <a href="#" className="btn">{buttonText}</a>
            </div>
        </div>
    )
}

export default ItemCard