import {useEffect, useReducer} from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import DropDown from "./DropDown.jsx";
import UseAddMutation from "../todoServices/useAddMutation.js";
import {FaCalendarAlt, FaPlus} from "react-icons/fa";
import toast from "react-hot-toast";
import {useQuery} from "@tanstack/react-query";
import {getTaskCategories} from "../todoServices/apiTodos.js";
import {useModal} from "./Modal.jsx";
import AddCategoryForm from "./AddCategoryForm.jsx";
import {MdDelete} from "react-icons/md";
import PrivateRoute from "./PrivateRoute.jsx";
import ShowCategories from "./ShowCategories.jsx";
import SelectPriority from "@/components/SelectPriority.jsx";


const initialState = {
    taskTitle: "",
    taskDescription: "",
    taskEndDate: new Date(),
    taskPriority: 0,
    taskCategory: "",
}

const CreateTodo = function ({type="create", editData=null}) {
    function reducer(state, action) {
        switch (action.type) {
            case "setEndDate":
                return {...state, taskEndDate: action.payload};
            case "setPriority":
                return {...state, taskPriority: action.payload};
            case "setTitle":
                return {...state, taskTitle: action.payload};
            case "setDescription":
                return {...state, taskDescription: action.payload};
            case "setCategory":
                return {...state, taskCategory: action.payload};
            case "resetForm":
                return {...state, taskTitle: "", taskDescription: ""};
            case "initializeEditData":
                return {...state, ...action.payload};
            default:
                throw Error("Unknown Action: " + action.type);
        }
    }

    const [{taskEndDate, taskDescription, taskTitle, taskPriority, taskCategory}, dispatch] = useReducer(reducer, initialState);
    const {isAddingTask, addMutation} = UseAddMutation();

    useEffect(() => {
        if (type === "edit" && editData) {
            dispatch({
                type: "initializeEditData",
                payload: {
                    taskTitle: editData.task_title,
                    taskDescription: editData.task_description,
                    taskEndDate: editData.task_end,
                    taskPriority: editData.task_priority,
                    taskCategory: editData.task_category_title
                }
            })
        }
    }, [])

    const handleSubmit = function(e) {
        e.preventDefault();
        if (!taskEndDate || !taskTitle || !taskPriority || !taskDescription) {
            toast.error("Please fill all the fields");
            return;
        }

        addMutation({
            taskDetails: {
                taskTitle, taskPriority, taskDescription, taskEndDate, taskCategory
            },
        }, {
            onSuccess: () => {
                dispatch({type: "resetForm"});
            }
        });

    }


    return (
        <form className="space-y-2 text-neutral-100" onSubmit={handleSubmit}>
            <h2 className="font-bold tracking-wider text-xl capitalize bg-gradient-to-r from-cyan-400 via-violet-600 to-pink-600 inline-block bg-clip-text text-transparent">{type} task</h2>
            <div className="flex flex-col gap-y-6">
                <input type="text"
                       placeholder="Task Title Here...."
                       aria-label="task_title"
                       value={taskTitle}
                       onChange={(e) => dispatch({type: "setTitle", payload: e.target.value})}
                       className=" px-6 py-2 rounded outline-none ring ring-white focus:ring-purple-700" />
                <textarea
                    name="task_description"
                    rows="5"
                    placeholder="Task Description Here...."
                    aria-label="task-description" id="task_description"
                    value={taskDescription}
                    onChange={(e) => dispatch({type: "setDescription", payload: e.target.value})}
                    className="px-6 py-2 rounded outline-none ring ring-white block focus:ring-purple-700">
                </textarea>
                <div className="relative w-full flex flex-col justify-center">
                    <DatePicker
                        id="datePicker"
                        showMonthYearDropdown={false}
                        selected={taskEndDate}
                        onChange={(date) => dispatch({type: "setEndDate", payload: date})}
                        showMonthDropdown
                        minDate={new Date()}
                        isClearable
                        shouldCloseOnSelect={false}
                        popperPlacement="bottom-start"
                        placeholderText="Pick End Date For Task"
                        className="relative pl-8 px-6 py-2 cursor-pointer rounded outline-none ring ring-white w-full focus:ring-purple-700"
                    />
                    <label htmlFor="datePicker" className="absolute left-2 cursor-pointer">
                        <FaCalendarAlt className="text-white" />
                    </label>
                </div>

                {/*shadCN DropDown*/}
                <SelectPriority onOptionChange={(value) =>dispatch({type: "setPriority", payload: value})} placeholder="Select Priority" />

                {/*<PrivateRoute message="" needNavigators={false}>*/}
                {/*    <div onClick={(e) => e.stopPropagation()} className="">*/}
                {/*        <ShowCategories dispatch={dispatch} />*/}
                {/*    </div>*/}
                {/*</PrivateRoute>*/}
                <button disabled={isAddingTask} className={`font-semibold capitalize px-4 py-2 ${type === "create" ? "bg-cyan-700 hover:bg-cyan-600" : type === "edit" && "bg-yellow-500 hover:bg-yellow-600"} transition-colors duration-200 cursor-pointer sm:self-end rounded`} type="submit">{type === "create" ? "Create" : "Edit"} Task</button>
            </div>
        </form>
    );
}

export default CreateTodo;


