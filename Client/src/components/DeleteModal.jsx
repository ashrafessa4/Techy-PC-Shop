import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";

function DeleteModal(props) {
  // state to control modal visibility
  const [show, setShow] = useState(false);

  // functions to open/close the modal
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      {/* button to open modal */}
      <button className="btn btn-danger mx-1 w-100" onClick={handleShow}>
        <i className="fa-solid fa-trash"></i> Delete
      </button>

      <Modal show={show} onHide={handleClose} centered className="text-center">
        <Modal.Title className="text-center m-3">Delete Product</Modal.Title>

        <Modal.Body>
          This Product will be deleted permanently, are you sure?
        </Modal.Body>

        <div className="d-flex justify-content-center my-2 pb-3">
          {/* button to close modal */}
          <button className="btn btn-secondary mx-2" onClick={handleClose}>
            <i className="fa-solid fa-xmark"></i> Close
          </button>

          {/* button to delete product */}
          <button
            className="btn btn-danger mx-2"
            onClick={() => props.handleDeleteProduct(props.product)}
          >
            <i className="fa-solid fa-trash-can"></i> Delete Anyway
          </button>
        </div>
      </Modal>
    </>
  );
}

export default DeleteModal;
