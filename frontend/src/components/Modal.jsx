import {createContext, useContext, useEffect, useRef, useState} from "react";
import {IoCloseOutline} from "react-icons/io5";

const ModalContext = createContext();

export function useModal() {
    return useContext(ModalContext);
}

export const ModalProvider = function ({children}) {
    const [isOpen, setIsOpen] = useState(false);
    const [modalContent, setModalContent] = useState({
        content: null,
        title: null,
    });

    const openModal = function ({content, title}) {
        setModalContent({content, title});
        setIsOpen(true);
    }

    const closeModal = function () {
        setIsOpen(false);
        setModalContent({content: null, title: null});
    }


    const value = {
        isOpen,
        modalContent,
        openModal,
        closeModal,
    }

    return (
        <ModalContext.Provider value={value}>
            {children}
            <Modal/>
        </ModalContext.Provider>
    )

}


const Modal = function () {

    const modalRef = useRef();

    const {isOpen, closeModal, openModal, modalContent} = useModal();

    const {content, title} = modalContent;

    useEffect(() => {
        const handleCloseModal = function (e) {
            if (modalRef.current && !modalRef.current.contains(e.target)) {
                closeModal();
            }
        }

        document.addEventListener("mousedown", handleCloseModal, true);

        return () => document.removeEventListener("mousedown", handleCloseModal, true);

    }, [closeModal]);

    if (!isOpen) return;

    return (
        <div
            className="fixed top-0 left-0 bottom-0 right-0 flex-1 z-10 backdrop-blur-xs h-screen w-screen flex flex-col items-center justify-center p-4 sm:p-12">

            <div ref={modalRef}
                 className="flex w-full flex-col flex-wrap text-wrap gap-6 max-w-xl text-neutral-100 p-4 sm:p-8 rounded bg-zinc-700/50 relative">
                <h1 className="text-2xl font-semibold capitalize text-center">{title}</h1>
                <div className="">
                    {content}
                </div>


                <button onClick={closeModal} className="cursor-pointer absolute top-2 right-2">
                    <IoCloseOutline size={30}/>
                </button>

            </div>

        </div>


    );
}


export default Modal;