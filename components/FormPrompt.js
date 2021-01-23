import React from "react";
import { Modal } from "react-bootstrap";

export default function FormPrompt({
  showModal,
  title,
  body,
  actionClick,
  handleClose,
  saveText,
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
        <Modal.Header closeButton>
          <h3 className="title font-size-28 pb-2">{title}</h3>
        </Modal.Header>
        <Modal.Body>{body}</Modal.Body>
        <Modal.Footer>
          <div className="">
            <button
              className="theme-btn theme-btn-small"
              onClick={handleClose}
              style={{ backgroundColor: "#e1306c" }}
            >
              Cancel
            </button>
            <button
              className="theme-btn theme-btn-small ml-2"
              onClick={actionClick}
            >
              {saveText}
            </button>
          </div>
        </Modal.Footer>
      </Modal>
    </>
  );
}
