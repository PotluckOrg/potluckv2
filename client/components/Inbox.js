import React from 'react'
import InboxCard from './InboxCard'
import {connect} from 'react-redux'
import {Link} from 'react-router-dom'

const Inbox = (props) => {
    const { requests, contracts, currentUser, inbox } = props

    let contractIds = Object.keys(requests)
    let createdRequests = [], firstReviewRequests = [], secondReviewRequests = [], pendingRequests = [], completedRequests = [], canceledRequests = [];

    contractIds.forEach(contractId => {
        let currentContract = contracts.find(contract => +contract.id === +contractId)
        switch (currentContract.status) {
            case 'Created':
                createdRequests.push(currentContract)
                break;
            case 'FirstReview':
                firstReviewRequests.push(currentContract)
                break;
            case 'SecondReview':
                secondReviewRequests.push(currentContract)
                break;
            case 'Pending':
                pendingRequests.push(currentContract)
                break;
            case 'Completed':
                completedRequests.push(currentContract)
                break;
            case 'Canceled':
                canceledRequests.push(currentContract)
                break;
            default:
                createdRequests.push(currentContract)
        }
    })

    let inboxBody
    if (!Object.keys(requests).length) inboxBody = <h5>No current requests.</h5>
    else inboxBody = (
        <div>
            <h3>New Requests</h3>
            {createdRequests.length &&
                <div>
                    <h5>A user is interested in making a trade!</h5>
                    <ul className="ticket-list">
                        {createdRequests.map(request => {
                            return (
                                <li key={request.id} className="request-ticket-card">
                                    <Link to={`/${request.id}`}>
                                        <InboxCard request={request} otherUserId={requests[request.id].otherUserId} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
            <h3>In Review</h3>
            { (secondReviewRequests.length || firstReviewRequests.length) &&
                <div>
                    <h5>Your request is being reviewed!</h5>
                    <ul className="ticket-list">
                        {firstReviewRequests.length &&
                            firstReviewRequests.map(request => {
                                return (
                                    <li key={request.id} className="request-ticket-card">
                                        <Link to={`/${request.id}`}>
                                            <InboxCard request={request} otherUserId={requests[request.id].otherUserId} />
                                        </Link>
                                    </li>
                                )
                            })
                        }
                        {secondReviewRequests &&
                            secondReviewRequests.map(request => {
                                return (
                                    <li key={request.id} className="request-ticket-card">
                                        <Link to={`/${request.id}`}>
                                            <InboxCard request={request} otherUserId={requests[request.id].otherUserId} />
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
                }
            <h3>Pending</h3>
            {pendingRequests.length &&
                <div>
                    <h5>Congrats! Both users have confirmed the trade. Meet up in person to exchange your foods and receive 10 Potluck Points!</h5>
                    <ul className="ticket-list">
                            {pendingRequests.map(request => {
                                return (
                                    <li key={request.id} className="request-ticket-card">
                                        <Link to={`/${request.id}`}>
                                            <InboxCard request={request} otherUserId={requests[request.id].otherUserId} />
                                        </Link>
                                    </li>
                                )
                            })}
                        </ul>
                </div>
            }
            <h3>Completed</h3>
            {completedRequests.length &&
                <div>
                <h5>Way to go! Here's a list of your successful trades:</h5>
                <ul className="ticket-list">
                        {completedRequests.map(request => {
                            return (
                                <li key={request.id} className="request-ticket-card">
                                    <Link to={`/${request.id}`}>
                                        <InboxCard request={request} otherUserId={requests[request.id].otherUserId} />
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </div>
            }
        </div>
    )

    return inboxBody
}

const mapState = (state) => {
    return {
        requests: state.inbox,
        currentUser: state.user,
        contracts: state.requests
    }
}

export default connect(mapState)(Inbox)
