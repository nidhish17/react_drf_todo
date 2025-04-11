import {
    DropdownMenu,
    DropdownMenuContent, DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {IoIosArrowDown, IoIosArrowUp} from "react-icons/io";
import {useState} from "react";

const SelectPriority = function ({onOptionChange}) {

    const [isOpen, setIsOpen] = useState(false);
    const [selectedPriority, setSelectedPriority] = useState(0);

    const handleSelect = function (value, e) {
        e.stopPropagation();
        onOptionChange(value);
        setSelectedPriority(value);
        setIsOpen(false);
    }

    return (
        <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
            <DropdownMenuTrigger className="cursor-pointer flex justify-between items-center px-4 py-2 ring ring-white focus:ring-purple-700 rounded w-full outline-none">
                {selectedPriority ? "⭐".repeat(selectedPriority) : "select priority"}
                <p className="">{isOpen ? <IoIosArrowUp/> : <IoIosArrowDown/>}</p>
            </DropdownMenuTrigger>

            <DropdownMenuContent className="w-[var(--radix-dropdown-menu-trigger-width)] bg-neutral-800 space-y-2 p-4" align="start">
                    <DropdownMenuItem onClick={(e) => handleSelect(1, e)} className="hover:bg-neutral-600 cursor-pointer p-2 rounded odd:bg-zinc-700 even:bg-zinc-500">⭐</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleSelect(2, e)} className="hover:bg-neutral-600 cursor-pointer p-2 rounded odd:bg-zinc-700 even:bg-zinc-500">⭐⭐</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleSelect(3, e)} className="hover:bg-neutral-600 cursor-pointer p-2 rounded odd:bg-zinc-700 even:bg-zinc-500">⭐⭐⭐</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleSelect(4, e)} className="hover:bg-neutral-600 cursor-pointer p-2 rounded odd:bg-zinc-700 even:bg-zinc-500">⭐⭐⭐⭐</DropdownMenuItem>
                    <DropdownMenuItem onClick={(e) => handleSelect(5, e)} className="hover:bg-neutral-600 cursor-pointer p-2 rounded odd:bg-zinc-700 even:bg-zinc-500">⭐⭐⭐⭐⭐</DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}

export default SelectPriority;