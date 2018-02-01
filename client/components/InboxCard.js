import React from 'react'


const InboxCard = (props) => {
    const { request } = props
    return (
        <a href={`/${request.id}`} className="card-link">
            <div className="card w-100">
                <div className="card-body">
                    <h5 className="card-title">{request.user}</h5>
                    <p className="card-text">{`You have a request for ${request.items.length} items!`}</p>
                </div>
            </div>
        </a>
    )
}

export default InboxCard