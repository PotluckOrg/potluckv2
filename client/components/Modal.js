import React from 'react'
import {connect} from 'react-redux'
import { removeFromBasket, removeFromMyMarket, createContractWeb3 } from '../store'



const Modal = (props) => {
    const { name, isVisible, icon, body, clickHandler } = props

    $('#addItemModal').on('show.bs.modal', function (event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button.data('whatever') // Extract info from data-* attributes
        // If necessary, you could initiate an AJAX request here (and then do the updating in a callback).
        // Update the modal's content. We'll use jQuery here, but you could use a data binding library or other methods instead.
        var modal = $(this)
        modal.find('.modal-title').text('New message to ' + recipient)
        modal.find('.modal-body input').val(recipient)
    })
    return (
        <div className="modal fade" id={name} tabIndex="-1" role="dialog" aria-labelledby={`#${name}Label`} aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id={`${name}Label`} />
                        <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div className="modal-body">
                        {body}
                    </div>
                </div>
            </div>
        </div>
    )
}

const mapDispatch = (dispatch, ownProps) => {
    return {
        sendRequestHandler: (event, items, itemOwner, currentUser) => {
            let allItems = items.map(item => item.name).join(', ')
            const soliciteeId = itemOwner
            // The modal failed to appear when I tried to format the item as just a string?!
            // dispatch(createContractWeb3(allItems, currentUser, soliciteeId))
            items.forEach(item => {
                dispatch(removeFromBasket(item.id))
                dispatch(removeFromMyMarket(item.id))
            })
        }
    }
}

export default connect(null, mapDispatch)(Modal)
