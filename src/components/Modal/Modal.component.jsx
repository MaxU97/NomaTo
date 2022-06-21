import React, { useEffect, useRef, useState } from "react";
import "./modal.scss";
import { CloseIcon } from "../../assets/Icons";
import classNames from "classnames";
import { CSSTransition } from "react-transition-group";

const Modal = ({ children, modalOpen, style, toggleModal = () => {} }) => {
  const ref = useRef();
  const clickOutside = (e) => {
    if (modalOpen) {
      if (ref.current.contains(e.target)) {
        return;
      } else {
        toggleModal(false);
      }
    }
  };
  useEffect(() => {
    document.addEventListener("mousedown", clickOutside);

    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [modalOpen]);

  return (
    <div className={classNames("modal", modalOpen && "is-open")} style={style}>
      <CSSTransition
        in={modalOpen}
        timeout={500}
        unmountOnExit
        classNames="modal-container"
      >
        <div className="modal-container">
          <div className="modal-content" ref={ref}>
            <a
              className="close-button"
              onClick={() => {
                toggleModal(false);
              }}
            >
              <CloseIcon className="close-icon" />
            </a>
            {children}
          </div>
        </div>
      </CSSTransition>
    </div>
  );
};

export default Modal;
