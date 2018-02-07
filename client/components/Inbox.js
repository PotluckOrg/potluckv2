import React from 'react'
import InboxCard from './InboxCard'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Inbox = (props) => {
    // const { requests } = props
    console.log('INBOX PROPS:', props)
    const requests = props.currentUser.contracts
    const createdRequests = requests.filter(request => {
        console.log('REQUEST', request)
        return request.status === 'Created'
    })
    const pendingRequests = requests.filter(request => {
        console.log('REQUEST', request)
        return request.status === 'Pending'
    })
    const completedRequests = requests.filter(request => {
        return request.status === 'Completed'
    })

    return (
        <div>
            <h3>Review</h3>
            <h5>A user is interested in making a trade!</h5>
            <ul className="ticket-list">
                {requests &&
                    requests.map(request => {
                        return (
                            <li key={request.id} className="request-ticket-card">
                                <Link to={`/${request.id}`}>
                                    <InboxCard request={request} />
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <h3>Pending</h3>
            <h5>Congrats! Both users have confirmed the trade. Meet up in person to exchange your foods and receive 10 Potluck Points!</h5>
            <ul className="ticket-list">
                {pendingRequests &&
                    pendingRequests.map(request => {
                        return (
                            <li key={request.id} className="request-ticket-card">
                                <Link to={`/${request.id}`}>
                                    <InboxCard request={request} />
                                </Link>
                            </li>
                        )
                    })
                }
            </ul>
            <h3>Completed</h3>
            <h5>Way to go! Here's a list of your successful trades:</h5>
            <ul className="ticket-list">
                {completedRequests &&
                    completedRequests.map(request => {
                        return (
                            <li key={request.id} className="request-ticket-card">
                                <Link to={`/${request.id}`}>
                                    <InboxCard request={request} />
                                </Link>
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
      requests: state.inbox,
      currentUser: state.user,
      contracts: state.contracts
    }
}

export default connect(mapState)(Inbox)