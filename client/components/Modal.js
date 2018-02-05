import React from 'react'
import {connect} from 'react-redux'
import { removeFromBasket, removeFromMyMarket, createContractWeb3 } from '../store'



const Modal = (props) => {
    const { name, isVisible, icon, body, clickHandler } = props
    console.log('isVisible', isVisible)
    $(`#${name}`).on('shown.bs.modal', function (e) {
        console.log('SHIT IS BANANAS!!!')
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
        
    }
}

export default connect(null, mapDispatch)(Modal)
