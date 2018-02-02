import React from 'react'
import ItemCard from './ItemCard'
import {connect} from 'react-redux'


const Market = (props) => {
    console.log(props)
    const { items } = props

    return (
        <div>
            <h3>Market</h3>
            <ul className="market-list">
                {items &&
                    items.map(item => {
                        return (
                            <li key={item.id} className="item-card">
                                <ItemCard key={item.id} item={item} path={props.match.path} />  
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    )
}

const mapState = (state) => {
    return {
        items: state.market
    }
}

export default connect(mapState)(Market)
