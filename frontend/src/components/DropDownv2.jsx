import {createContext, useContext, useState} from "react";
import {IoIosArrowDown, IoIosCloseCircle} from "react-icons/io";

const DropdownContext = createContext(null);

const DropDownv2 = function ({children, onChange, footer}) {

    const [selectedValue, setSelectedValue] = useState("");

    const resetSelected = function () {
        setSelectedValue("");
    }

    const handleChange = function (newSelectedValue) {
        setSelectedValue(newSelectedValue);
        onChange?.(newSelectedValue);
    }


    const contextValue = {
        handleChange,
        setSelectedValue,
        resetSelected
    }

    return (
        <DropdownContext.Provider value={contextValue}>
            <div className="flex gap-x-2">
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

const Select = function ({children, value}) {

    const {handleChange} = useContext(DropdownContext);

    const onSelectChange = (e) => {
        handleChange(e.target.value);
    }

    return (
        <div className="relative basis-full">
            <select value={value} onChange={onSelectChange}
                className="w-full border px-4 py-2 rounded cursor-pointer appearance-none relative outline-none">
                {children}
            </select>
            <IoIosArrowDown size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
        </div>

    );
}

const Option = function ({optionValue, optionLabel}) {
    const isPlaceholder = optionValue === "";
    return (
        <option hidden={isPlaceholder} className="bg-neutral-800 text-white" value={optionValue}>{optionLabel}</option>
    )
}

const Footer = function ({children}) {
    return children;
}

DropDownv2.Select = Select;
DropDownv2.Option = Option;
DropDownv2.Footer = Footer;

export default DropDownv2;