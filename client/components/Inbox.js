import React from 'react'
import InboxCard from './InboxCard'
import {connect} from 'react-redux'

const Inbox = (props) => {
    const { requests } = props
    return (
        <div>
            <h3>Inbox</h3>
            <ul className="ticket-list">
                {requests &&
                    requests.map(request => {
                        return (
                            <li key={request.id} className="request-ticket">
                                <InboxCard key={request.id} request={request} />  
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
      products: state.products,
      currentUser: state.user,
    }
}

const mapDispatch = (dispatch) => {
    return {
            //dispatch(getItems())
        }
}



export default connect(mapState, mapDispatch)(Inbox)