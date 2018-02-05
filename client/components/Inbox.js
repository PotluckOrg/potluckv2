import React from 'react'
import InboxCard from './InboxCard'
import {connect} from 'react-redux'

const Inbox = (props) => {
    // const { requests } = props
    const requests = props.currentUser.contracts
    const pendingRequests = requests.filter(request => {
        console.log('REQUEST', request)
        return request.status === 'Pending'
    })
    const completedRequests = requests.filter(request => {
        return request.status === 'Completed'
    })

    console.log('COMPLETEDREQUEST', completedRequests)
    console.log('PENDINGREQUEST', pendingRequests)

    console.log('REQUESTS', requests)
    return (
        <div>
            <h3>Review</h3>
            <h5>A user is interested in making a trade!</h5>
            <ul className="ticket-list">
                {requests &&
                    requests.map(request => {
                        return (
                            <li key={request.id} className="request-ticket">
                            {/*
                                <InboxCard key={request.id} request={request} />
                            */}
                                  
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
                            <li key={request.id} className="request-ticket">
                            <p>{request.id}</p>
                            <InboxCard request={request}/>
                                {/*
                                <InboxCard key={request.id} request={request} />
                            */}
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
                            <li key={request.id} className="request-ticket">
                            <p>{request.id}</p>
                            <InboxCard request={request} />
                                {/*
                                <InboxCard key={request.id} request={request} />
                            */} 
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
      requests: state.contracts,
      currentUser: state.user
    }
}

export default connect(mapState)(Inbox)