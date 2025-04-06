import {calcNumDaysLeft, createMarkup, formatTime} from "../utils/utils.js";
import Table from "./Table.jsx";
import {useQuery} from "@tanstack/react-query";
import {getTodos} from "../todoServices/apiTodos.js";
import useEditTodo from "../todoServices/useEditMutation.js";
import {SiTicktick} from "react-icons/si";
import {MdDelete} from "react-icons/md";
import useDeleteMutation from "../todoServices/deleteMutation.js";
import {FaInfo} from "react-icons/fa";
import {useModal} from "./Modal.jsx";

const ToDosTable = function ({tasks}) {

    // const query = useQuery({
    //     queryKey: ["todos"],
    //     queryFn: getTodos,
    //     staleTime: 10000
    // });

    const {editMutation, isEditingTodo} = useEditTodo();
    const {deleteMutation, isDeleting} = useDeleteMutation();

    function handleTaskComplete(id, currentTaskStatus) {
        editMutation({
            id,
            todo: {
                task_completed: !currentTaskStatus,
            }
        })
    }

    function handleDeleteBtn(id) {
        deleteMutation({
            id,
        })
    }

    const {openModal} = useModal();
    if (!tasks?.length) return <p className="capitalize text-xl">No tasks added yet :(</p>;


    return (
            <Table>
                <Table.THead>
                    <Table.TH>Created On</Table.TH>
                    <Table.TH>Title</Table.TH>
                    <Table.TH>Description</Table.TH>
                    <Table.TH>Priority</Table.TH>
                    <Table.TH>Status</Table.TH>
                    <Table.TH>Actions</Table.TH>
                </Table.THead>

                <Table.TBody>
                    {tasks?.map((todo) => {
                        const {task_description, task_title, task_completed: task_status, task_priority, id:task_id, task_created, task_end, task_category_title} = todo;
                        const daysLeft = calcNumDaysLeft(task_end);
                        return (
                            <Table.TR className={`${task_status ? "bg-lime-500/70" : "odd:bg-zinc-600 even:bg-zinc-800"}`} key={task_id}>
                                <Table.TD>{formatTime(task_created)}</Table.TD>
                                <Table.TD className={`capitalize ${task_status && "line-through decoration-zinc-900 decoration-2"}`}>{task_title}</Table.TD>

                                <Table.TD className="text-left">
                                    <button
                                        onClick={() => openModal({content: task_description, title: <span className="flex justify-between items-center"><span>#{task_title}</span><span className="text-xs px-2 rounded-full bg-blue-500 py-0.5 text-white">{task_category_title}</span></span>})}
                                        className="cursor-pointer p-1.5 rounded bg-sky-500 hover:bg-sky-600 text-center"><FaInfo /></button>
                                </Table.TD>

                                <Table.TD>
                                    {Array.from({length: task_priority}).map((_, index) => (
                                    <span key={index}>⭐</span>
                                ))}
                                </Table.TD>
                                <Table.TD>
                                    <span data-daysleft={daysLeft} className={`${!task_status && daysLeft < 0 && "bg-red-500"} ${!task_status && daysLeft > 0 && "bg-zinc-500"} ${!task_status && daysLeft === 0 && "bg-yellow-400"} 
                                    px-2 py-1 text-center uppercase text-xs font-normal tracking-wider rounded-full bg-green-400 relative 
                                    after:content-[attr(data-daysleft)] hover:after:scale-y-100 after:scale-y-0 after:transition-all after:duration-100 after:absolute after:w-8 after:-top-1/2 after:rounded-full after:bg-white after:left-1/2 after:-translate-x-1/2 after:-translate-y-10/12
                                    before:content-[''] before:size-3 before:rotate-45 before:absolute before:bg-white after:text-neutral-800 before:-top-1/2 before:left-1/2 before:-translate-x-1/2 before:-translate-y-1/2 hover:before:scale-y-100 before:scale-y-0 before:duration-100`}>
                                        {task_status ? "completed" : daysLeft > 0 ? `on time` : daysLeft < 0 ? `due ${daysLeft}` : daysLeft === 0 && "today"}
                                    </span>
                                </Table.TD>
                                <Table.TD className="">
                                    <div className="flex gap-x-1">
                                        <button
                                            disabled={isEditingTodo}
                                            onClick={() => handleTaskComplete(task_id, task_status)}
                                            className={`cursor-pointer p-1.5 ${task_status ? "bg-green-500 hover:bg-green-600" : "bg-blue-500 hover:bg-blue-600"} rounded transition-all duration-200 text-sm font-medium`}>
                                            <SiTicktick />
                                        </button>
                                        <button onClick={() => handleDeleteBtn(task_id)} className="cursor-pointer p-1.5 bg-red-500 hover:bg-red-700 rounded transition-all duration-200 text-sm font-medium"><MdDelete /></button>
                                    </div>
                                </Table.TD>
                            </Table.TR>
                        )
                    })}

                </Table.TBody>
            </Table>
    );
}

export default ToDosTable;

