import {useEffect, useRef, useState} from "react";
import {IoMdMore} from "react-icons/io";

const Option = function ({children}) {
    const [showOption, setShowOption] = useState(false);

    const optionRef = useRef(null);

    useEffect(() => {
        const handleCloseOption = function (e) {
            if (optionRef.current && !optionRef.current.contains(e.target)){
                setShowOption(false);
            }
        }

        document.addEventListener("click", handleCloseOption, true);

        return () => document.removeEventListener("click", handleCloseOption, true)
    }, [showOption])

    return (
        <div className="" ref={optionRef}>
                {showOption && (
                    <div className="absolute z-10">
                       <div className="absolute divide-y-2 divide-neutral-600/40 bg-neutral-100  shadow p-1.5 text-zinc-700/95 font-medium rounded w-25 right-0 top-0 capitalize flex flex-col gap-y-2">
                            {children}
                        </div>
                    </div>
                )}

             <button onClick={() => setShowOption((option) => !option)} className="cursor-pointer "><IoMdMore size={25} /></button>
        </div>

    );
}

export default Option;