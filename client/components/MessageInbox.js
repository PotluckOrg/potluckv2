import React from 'react'
import MessageCard from './MessageCard'
import { connect } from 'react-redux'
import {fetchMessagesByRecipientId, fetchAllMessages} from '../store'

const MessageInbox = (props) => {

    const sentMessages = props.sentMessages

    const receivedMessages = props.allMessages.filter(message => {
        return message.recipientUserId === props.currentUser.id
    })


    return (
        <div>
            <h3>Message inbox</h3>
            <ul className="ticket-list">
                {receivedMessages &&
                    receivedMessages.map(receivedMessage => {
                        return (
                            <li key={receivedMessage.id} className="message-ticket">
                                <MessageCard message={receivedMessage} />
                            </li>
                        )
                    })
                }
            </ul>

            <h3>Sent Messages</h3>
            <ul className="ticket-list">
                {sentMessages &&
                    sentMessages.map(sentMessage => {
                        return (
                            <li key={sentMessage.id} className="message-ticket">
                                <MessageCard message={sentMessage} />
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
        currentUser: state.user,
        sentMessages: state.user.messages,
        allMessages: state.message
    }
}

const mapDispatch = (dispatch, ownProps) => {
    dispatch(fetchAllMessages())
    return {}
  }


export default connect(mapState, mapDispatch)(MessageInbox)