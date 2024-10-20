// src/component/ModalLogin.tsx
import React from "react";
import "./Modal.css";

interface ModalLoginProps {
  show: boolean;
  handleClose: () => void;
  handleLoginRedirect: () => void;
}

const ModalLogin: React.FC<ModalLoginProps> = ({ show, handleClose, handleLoginRedirect }) => {
  return (
    <div className={`modal fade ${show ? "show d-block" : ""}`} style={{ display: show ? "block" : "none" }} tabIndex={-1}>
      <div className="modal-dialog modal-dialog-centered modal-lg">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Login Required</h5>
            <button type="button" className="btn-close" onClick={handleClose}></button>
          </div>
          <div className="modal-body">
            <p className="modal-text">You need to login to add movies to your favorite list. Please login to proceed.</p>
          </div>
          <div className="modal-footer">
            <button type="button" className="btn btn-outline-secondary" onClick={handleClose}>
              Close
            </button>
            <button type="button" className="btn btn-primary btn-custom" onClick={handleLoginRedirect}>
              Login Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
