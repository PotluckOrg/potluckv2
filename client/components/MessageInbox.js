import React from 'react'
import MessageCard from './MessageCard'
import { connect } from 'react-redux'

const MessageInbox = (props) => {
    console.log('PROPS HERE', props)
    const messages = props.messages
    return (
        <div>
            <h3>Message inbox</h3>
            <ul className="ticket-list">
                {messages &&
                    messages.map(message => {
                        return (
                            <li key={message.id} className="message-ticket">
                                <MessageCard message={message} />
                            </li>
                        )
                    })
                }
            </ul>

            <h3>Sent Messages</h3>
            <ul className="ticket-list">
                {messages &&
                    messages.map(message => {
                        return (
                            <li key={message.id} className="message-ticket">
                                <MessageCard message={message} />
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
        messages: state.user.messages
    }
}

export default connect(mapState)(MessageInbox)