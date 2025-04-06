import {useState} from "react";
import {FaPlus} from "react-icons/fa";
import {useModal} from "./Modal.jsx";
import AddCategoryMutation from "../todoServices/addCategoryMutation.js";

const AddCategoryForm = function () {
    const [categoryTitle, setCategoryTitle] = useState("");

    const {closeModal} = useModal();
    const {isAddingCategory, addCategoryMutation} = AddCategoryMutation();
    const handleSubmit = function(e) {
        e.preventDefault();
        addCategoryMutation(categoryTitle, {
            onSuccess: () => {
                setCategoryTitle("");
                closeModal();
            }
        });

    }

    return (
        <form action="" onSubmit={handleSubmit} className="flex flex-row ring ring-white group rounded focus-within:ring-purple-700" tabIndex="0">
            <input type="text"
                   placeholder="Category Title"
                   aria-label="category-title"
                   value={categoryTitle}
                   onChange={(e) => setCategoryTitle(e.target.value)}
                   className="w-full h-10 font-semibold px-6 py-2 rounded-l outline-none"/>
            <button disabled={isAddingCategory} className="px-4 py-2 h-10 disabled:bg-stone-700 disabled:cursor-not-allowed bg-cyan-600 hover:bg-cyan-700 transition-colors duration-200 cursor-pointer text-neutral-100 rounded-r" type={"submit"}><FaPlus /></button>
        </form>
    );
}

export default AddCategoryForm;