import PrivateRoute from "./PrivateRoute.jsx";
import DropDown from "./DropDown.jsx";
import AddCategoryForm from "./AddCategoryForm.jsx";
import {FaPlus} from "react-icons/fa";
import {useQuery} from "@tanstack/react-query";
import {getTaskCategories} from "../todoServices/apiTodos.js";
import {useModal} from "./Modal.jsx";

const ShowCategories = function ({dispatch}) {

    // get task categories
    const query = useQuery({
        queryFn: getTaskCategories,
        queryKey: ["task-categories"],
        staleTime: 10000,
    });

    const {isPending, isError, data} = query;

    const {openModal} = useModal();

    return (
        <DropDown placeholder="Select Task Category" onOptionChange={(value) => dispatch({type: "setCategory", payload: value})}>
            <div className="overflow-y-scroll max-h-40 flex flex-col gap-y-2 scroll-smoot snap-y">
                {isPending ? "Loading..." :
                data.map((taskCategory) => {
                    return <DropDown.Option className="snap-start" key={taskCategory.id} value={taskCategory.id}>{taskCategory.category_title}</DropDown.Option>
                })}
            </div>
            {/* passing the Footer as a child to the dropDown component */}
            <DropDown.Footer>
                <button
                    type="button"
                    onClick={() => openModal({content: <AddCategoryForm/>, title: "Add Category"})}
                    className="rounded p-2 bg-cyan-600 hover:bg-cyan-700 transition-all duration-200 cursor-pointer">
                    <FaPlus/>
                </button>
            </DropDown.Footer>
        </DropDown>
    );
}

export default ShowCategories;