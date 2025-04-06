import {createContext, useCallback, useContext, useEffect, useRef, useState} from "react";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";


const DropDownContext = createContext(null);

const DropDown = function ({className, children, value, onOptionChange, placeholder = "Select An Option"}) {

    const [showValues, setShowValues] = useState(false);
    const [selectedValue, setSelectedValue] = useState(value);
    const [selectedLabel, setSelectedLabel] = useState(placeholder);

    const [selectedOption, setSelectedOption] = useState(false);

    // using useCallback for not redeclaring function again and again on every render
    // here, the component re-renders with the showValues ie showing the options component where options to select exist
    // also the selectedLabel comes from the child component and when the label is selected again the component re-renders
    const handleSelect = useCallback((optionValue, optionLabel) => {
        setSelectedValue(optionValue);
        setSelectedLabel(optionLabel);
        setShowValues(false);

        if (onOptionChange) {
            onOptionChange(optionValue);
        }
    }, [onOptionChange])

    const optionRef = useRef();

    useEffect(() => {
        const handleFocusOut = function (e) {
            if (optionRef.current && !optionRef.current.contains(e.target)) {
                setShowValues(false);
            }
        }

        document.addEventListener("mousedown", handleFocusOut, true);

        return () => {
            document.removeEventListener("mousedown", handleFocusOut, true);
        }
    }, []);


    const contextValue = {
        handleSelect,
        selectedValue
    }

    return (
        <DropDownContext.Provider value={contextValue}>
            <div className={`${className} relative`}>
                <button placeholder={placeholder} onClick={() => setShowValues((prevState) => !prevState)}
                        className="cursor-pointer flex justify-between items-center px-4 py-2 ring ring-white focus:ring-purple-700 rounded w-full"
                        type="button">
                    <p className="">{selectedLabel}</p>
                    <p className="">{showValues ? <IoIosArrowUp/> : <IoIosArrowDown/>}</p>
                </button>

                {
                    showValues &&
                    <div ref={optionRef} onClick={() => setSelectedOption(true)}
                         className="absolute p-4 bg-neutral-800 rounded w-full translate-y-1 z-10 border space-y-2">
                        {children}
                        {/* includes the dropdown option and the footer inside children */}
                    </div>
                }
            </div>
        </DropDownContext.Provider>
    );
}

const DropDownOption = function ({className, children, value}) {

    const {selectedValue, handleSelect} = useContext(DropDownContext);

    return (
        <>
        <div onClick={() => handleSelect(value, children)}
            className={`${className} hover:bg-neutral-600 cursor-pointer p-2 rounded odd:bg-zinc-700 even:bg-zinc-500 `}>
            {children}
        </div>
        </>

    )
}

const DropDownFooter = function({className, children}) {
    return (
        <div className={`${className}`}>
            {children}
        </div>
    )
}

DropDown.Option = DropDownOption;
DropDown.Footer = DropDownFooter;

export default DropDown;