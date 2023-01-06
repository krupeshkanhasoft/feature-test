import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const DetailModal = (props) => {
    const { item, open, onClose } = props;

    return (
        <>
            <Modal show={open} size='sm' centered style={{ background: "#9e9e9e70" }}>
                <Modal.Header >
                    <Modal.Title>Contact Details</Modal.Title>
                </Modal.Header>
                <Modal.Body >
                    <p>id: {item.id}</p>
                    <p>First Name : {item.first_name}</p>
                    <p>Last Name: {item.last_name}</p>
                    <p>Email: {item.email}</p>
                </Modal.Body>
                <Button variant="primary" size="xxl" onClick={onClose}>
                    Close
                </Button>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>
    );
}

export default DetailModal;
