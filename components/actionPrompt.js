import React from "react";
import { Modal } from "react-bootstrap";

export default function ActionPrompt({
  showModal,
  item,
  actionClick,
  handleClose,
  text,
}) {
  return (
    <>
      <Modal
        show={showModal}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>Are you sure you want to delete {item}</Modal.Body>
        <Modal.Footer>
          <div className="">
            <button
              className="theme-btn theme-btn-small"
              onClick={actionClick}
              style={{ backgroundColor: "#e1306c" }}
            >
              {text}
            </button>
            <button
              className="theme-btn theme-btn-small ml-2"
              onClick={handleClose}
            >
              Cancel
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
