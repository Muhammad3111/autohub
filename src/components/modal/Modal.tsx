import { ReactNode } from "react";
import { createPortal } from "react-dom";

type ModalProps = {
    isOpen: boolean;
    children: ReactNode;
};

const Modal = ({ isOpen, children }: ModalProps) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 transition-opacity duration-300 ease-in-out">
            <div
                className={`bg-white p-4 rounded-lg shadow-lg w-96 relative transform transition-all duration-300 ease-in-out ${
                    isOpen ? "scale-100 opacity-100" : "scale-95 opacity-0"
                }`}
                onClick={(e) => e.stopPropagation()}
            >
                {children}
            </div>
        </div>,
        document.body
    );
};

export default Modal;
