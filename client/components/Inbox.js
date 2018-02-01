import React from 'react'
import InboxCard from './InboxCard'

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

export default Inbox