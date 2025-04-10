import Tabs, {TabList} from "./Tabs.jsx";
import ToDosTable from "./ToDosTable.jsx";
import {useQuery, useQueryClient} from "@tanstack/react-query";
import {filterTodos, getTaskCategories, getTodos} from "../todoServices/apiTodos.js";
import {useEffect, useState} from "react";
import {CgSpinner} from "react-icons/cg";
import useDeleteCategory from "../todoServices/useDeleteCategory.js";

const DisplayTasks = function () {

    const [tasks, setTasks] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const {deleteCat, isDelCat} = useDeleteCategory();

    const queryClient = useQueryClient();
    const {data: taskCategories} = useQuery({
        queryFn: getTaskCategories,
        queryKey: ["task-categories"],
        staleTime: 10000
    });

    const {data: tasksData, isPending} = useQuery({
        queryFn: () => filterTodos(selectedCategory),
        queryKey: ["todos", selectedCategory],
        staleTime: 10000,
        enabled: selectedCategory !== null
    });

    const {data:allTasks, isPending: loadingAllTasks} = useQuery({
        queryKey: ["todos"],
        queryFn: getTodos,
        staleTime: 10000
    });

    console.log(tasksData)
    const fetchTasks = function(categoryId) {
        setSelectedCategory(categoryId);
    }

    const handleDelCat = function () {
        const catId = taskCategories.find((category) => category.id === selectedCategory);
        deleteCat(catId);

    }

    return (
        <Tabs>
            <TabList>
                <Tabs.Label value={"all"} open>All</Tabs.Label>
                {taskCategories?.map((category) => {
                    const {id: categoryId, category_title: categoryTitle} = category;
                    return (
                        <Tabs.Label whenClicked={() => fetchTasks(categoryId)} value={`${categoryTitle}${categoryId}`} key={categoryId} >{categoryTitle}</Tabs.Label>
                    )
                })}
            </TabList>
            <Tabs.Content value={"all"}>
                {loadingAllTasks ? <CgSpinner className="text-center mt-10 animate-spin text-7xl" /> : <ToDosTable tasks={allTasks} />}
            </Tabs.Content>
            {selectedCategory && selectedCategory !== "all" && (
                <Tabs.Content className="relative"  value={`${taskCategories.find((category) => category.id === selectedCategory)?.category_title}${selectedCategory}`}>
                    <div className="flex flex-col gap-y-4">
                        <button disabled={isDelCat} onClick={() => handleDelCat()} className="self-end bg-red-500 hover:bg-red-600 capitalize px-4 py-2 rounded cursor-pointer duration-200 transition-colors">del cat</button>
                        <ToDosTable tasks={!isPending && tasksData} />
                    </div>
                </Tabs.Content>
            )}
        </Tabs>
    );
}

export default DisplayTasks;