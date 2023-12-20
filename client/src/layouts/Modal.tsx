import { ReactNode } from "react";

type ModalProps = {
  title: string;
  children: ReactNode[] | ReactNode;
  isOpen: boolean;
  setIsOpen: (arg: boolean) => void;
};

const Modal: React.FC<ModalProps> = ({ title, children, isOpen, setIsOpen }) => {
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 bg-black bg-opacity-25 flex items-center justify-center"
          onClick={(e) => e.target === e.currentTarget && setIsOpen(false)}
        >
          <div className="relative bg-white rounded-lg shadow p-4 max-w-md mx-auto">
            <div className="flex items-start justify-between p-4 border-b">
              <h3 className="text-xl font-semibold">{title}</h3>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-gray-900">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1.69531 14.8047L14.6953 1.80469" stroke="black" strokeWidth="1.8" strokeLinecap="round"/>
                <path d="M14.6953 14.8047L1.69531 1.80469" stroke="black" strokeWidth="1.8" strokeLinecap="round"/>
              </svg>
              <span className="sr-only">Close</span>
              </button>
            </div>
            <div className="p-4">
              {children}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Modal;
