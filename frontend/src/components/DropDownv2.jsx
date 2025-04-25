import {createContext, useState} from "react";
import {IoIosArrowDown} from "react-icons/io";

const DropdownContext = createContext(null);

const DropDownv2 = function ({children, onChange, footer}) {

    const dropdownContext = {

    }

    return (
        <DropdownContext.Provider value={dropdownContext}>
            <div className="flex gap-x-2">
                {children}
            </div>
        </DropdownContext.Provider>
    )
}

const Select = function ({children, onChange}) {
    const [selectedValue, setSelectedValue] = useState("");

    const resetSelected = function () {
        setSelectedValue("");
    }

    const handleChange = function (e) {
        const newSelectedValue = e.target.value;
        setSelectedValue(newSelectedValue);
        onChange?.(newSelectedValue);
    }

    return (
        <div className="relative basis-full">
            <select value={selectedValue} onChange={handleChange}
                className="w-full border px-4 py-2 rounded cursor-pointer appearance-none relative outline-none">
                {children}
            </select>
            <IoIosArrowDown size={16} className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2" />
        </div>

    );
}

const Option = function ({optionValue, optionLabel}) {
    return (
        <option className="bg-neutral-800 text-white" value={optionValue}>{optionLabel}</option>
    )
}

const Footer = function ({children}) {
    return children;
}

DropDownv2.Select = Select;
DropDownv2.Option = Option;
DropDownv2.Footer = Footer;

export default DropDownv2;