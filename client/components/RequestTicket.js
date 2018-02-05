import React from 'react'
import ItemCard from './ItemCard'
import Pantry from './Pantry'

const RequestTicket = (props) => {
    const { items, contractId, sender, senderPantry } = props
    const buttonIcon = 
    return (
        <div className="request-ticket">
            <h5>Let's make a swap!</h5>
            <div className="requested-items">
                <ul>
                    {items &&
                        items.map(item => {
                            return <li key={item.id} item={item} />
                        })
                    }
                </ul>
            </div>
            <div className="sender-pantry">
                <Pantry userId={sender} />
            </div>
        </div>
    )
}

export default RequestTicket