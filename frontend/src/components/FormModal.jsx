import React from 'react'
import ListingForm from './ListingForm';

const FormModal = ({showModal, closeModal}) => {
    if (!showModal) return null;

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={closeModal}></span>
                <ListingForm closeMethod={closeModal} />
            </div>
        </div>
    )
}

export default FormModal