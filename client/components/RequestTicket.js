import React from 'react'
import ItemCard from './ItemCard'
import Pantry from './Pantry'

const RequestTicket = (props) => {
    const { items, contractId, sender, senderPantry } = props
    return (
        <div className="request-ticket">
            <div className="requested-items">
                <h5>Let's make a swap!</h5>
                <div>
                    {items &&
                        items.map(item => {
                            return <ItemCard key={item.id} item={item} />
                        })
                    }
                </div>
            </div>
            <div className="sender-pantry">
                <Pantry userId={sender} />
            </div>
        </div>
    )
}

export default RequestTicket