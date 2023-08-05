import React, { ReactNode } from "react";

interface ModalProps {
  children: ReactNode;
}

const Modal: React.FC<ModalProps> = ({ children }) => {
  return (
    <div
      id="popup-modal"
      tabIndex={-1}
      data-modal-placement="center"
      className="animate-in absolute top-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] flex justify-center content-center flex-wrap "
    >
      <div className="relative bg-white  shadow dark:bg-gray-700 max-h-fit">
        <div className="p-6 text-center  bg-slate-600 dark:bg-gray-500">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
