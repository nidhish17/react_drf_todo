import {createContext, useContext, useEffect, useRef, useState} from "react";
import {IoMdMore} from "react-icons/io";
import {createPortal} from "react-dom";
import useEscapeKey from "@/components/useEscapeKey.jsx";



const Option = function ({children}) {

    const [showOption, setShowOption] = useState(false);
    const [position, setPosition] = useState({});
    const [optionRefAvailable, setOptionRefAvailable] = useState(false);

    const optionRef = useRef(null);

    const handleShowOption = function (e) {
        setShowOption(prevState => !prevState);
        const rect = e.target.getBoundingClientRect();
        setPosition({
            // x: window.innerWidth - rect.width - rect.x + 30,
            x: rect.right - 128,
            y: rect.bottom - 22,
        });
    }

    const {x, y} = position;

    useEffect(() => {
        const handleCloseOption = function (e) {
            if (optionRef.current && !optionRef.current.contains(e.target)) {
                setShowOption(false);
            }
        }

        const handleScroll = function (e) {
            if (optionRef.current && showOption) {
                setShowOption(false);
            }
        }

        document.addEventListener("click", handleCloseOption, true);
        document.addEventListener("scroll", handleScroll, true);

        return () => {
            document.removeEventListener("click", handleCloseOption, true);
            document.removeEventListener("scroll", handleScroll, true);
        }
    }, [showOption]);

    useEscapeKey(() => {
        if (showOption) setShowOption(false);
    })

    return (
        <>
            {showOption && createPortal(
                <div ref={optionRef} style={{top: `${y}px`, left: `${x}px`}} className={`fixed divide-y-2 divide-neutral-600/40 bg-neutral-100  shadow p-1.5
                text-zinc-700/95 font-medium rounded w-25 capitalize flex flex-col gap-y-2
                before before:content=[''] before:size-4 before:bg-white before:absolute before:rotate-45
                before:right-0.5 before:translate-x-2/4 before:top-1 before:-z-10`}>
                    {children}
                </div>, document.body
            )}
            <button onClick={handleShowOption} className="cursor-pointer threeDotBtn"><IoMdMore size={25}/></button>
        </>
    );
}

export default Option;