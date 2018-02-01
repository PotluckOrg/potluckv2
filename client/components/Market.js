import React from 'react'
import ItemCard from './ItemCard'
import {connect} from 'react-redux'


const Market = (props) => {
    // const { items } = props
    const items = [
        {
            id: 1,
            itemName: '1/2 Bag of Carrots',
            description: 'A delicious half bag of organic carrots!'
        },
        {
            id: 2,
            itemName: '2 Oranges',
            description: 'Two oranges looking for a home.'
        },
        {
            id: 3,
            itemName: '4 Pears',
            description: 'These four pears are FOR you!'
        },
        {
            id: 4,
            itemName: '1 Watermelon',
            description: 'Such a yummy watermelon!'
        },
    ]


    return (
        <div>
            <h3>Market</h3>
            <ul className="market-list">
                {items &&
                    items.map(item => {
                        return (
                            <li key={item.id} className="item-card">
                                <ItemCard key={item.id} item={item} />  
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

export default connect()(Market)