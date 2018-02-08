import React from 'react'
import ItemCard from './ItemCard'
import {connect} from 'react-redux'


const Market = (props) => {
    const { items } = props

    return (
        <div>
            <h3>Market</h3>
            <ul className="market-list">
                {items &&
                    items.filter(item => {
                      return item.userId !== props.user.id
                    })
                    .map(item => {
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
        items: state.market,
        user: state.user
    }
}

export default connect(mapState)(Market)
