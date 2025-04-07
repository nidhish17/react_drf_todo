import {formatDateTime} from "../utils/utils.js";
import apiInstance from "./axiosInstance.js";
import axiosInstance from "./axiosInstance.js";

const BASE_URL = "http://localhost:8000/my-todo/"

const getTodos = async function () {
    // const response = await fetch("http://localhost:8000/my-todo/tasks/");
    //
    // const data = await response.json();
    // // console.log(data);
    //
    // return data;

    const response = await apiInstance.get("tasks/");
    return response.data;
}

const editTodo = async function ({id, todo}) {
    if (!id) return;
    // const response = await fetch(`${BASE_URL}tasks/${id}/`, {
    //     method: "PATCH",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify(todo),
    // })
    //
    // const data = await response.json();
    // console.log(data);
    //
    // if (!response.ok) {
    //     throw new Error("Failed to update Todo");
    // }
    const {task_completed} = todo;
    const response = await apiInstance.patch(`tasks/${id}/`, {
        task_completed
    });
    return response.data;
}

const addTask = async function ({taskDetails}) {
    const {taskTitle, taskDescription, taskPriority, taskEndDate, taskCategory} = taskDetails;

    const formattedDate = formatDateTime(taskEndDate);
    //
    // const response = await fetch(`${BASE_URL}tasks/`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({
    //         task_title: taskTitle,
    //         task_description: taskDescription,
    //         task_priority: taskPriority,
    //         task_end: formattedDate,
    //         task_category: taskCategory
    //     })
    // })
    //
    // // const data = await response.json();
    // // console.log(data)
    //
    // if (!response.ok) throw new Error("Failed to add task");

    const response = await apiInstance.post(`tasks/`, {
        task_title: taskTitle,
        task_description: taskDescription,
        task_priority: taskPriority,
        task_end: formattedDate,
        task_category: taskCategory
    });

    return response.data;

}

const deleteTask = async function ({id: taskId}) {
    // const response = await fetch(`${BASE_URL}tasks/${taskId}/`, {
    //     method: "DELETE",
    // })
    //
    // if (!response.ok) throw new Error("Could not delete task");

    const response = await apiInstance.delete(`tasks/${taskId}/`);
    return response.data;
}

const getTaskCategories = async function() {
    // const response = await  fetch(`${BASE_URL}categories/`);
    //
    // const data = await response.json();
    //
    // return data;
    const response = await apiInstance.get("categories/");
    console.log(response.data);
    return response.data
}

const addTaskCategory = async function(categoryTitle) {
    // console.log(categoryTitle)
    // const response = await fetch(`${BASE_URL}categories/`, {
    //     method: "POST",
    //     headers: {
    //         "Content-Type": "application/json"
    //     },
    //     body: JSON.stringify({category_title: categoryTitle})
    // });
    //
    // if (!response.ok) {
    //     const errorObj = await response.json();
    //     console.log(errorObj)
    //     const {category_title} = errorObj;
    //     throw new Error(category_title[0]);
    // }

    const response = await apiInstance.post("categories/", {
        category_title: categoryTitle
    })

    return response.data;
}

const deleteTaskCategory = async function (categoryId) {

    // const response = await fetch(`${BASE_URL}categories/${categoryId}`, {
    //     method: "DELETE",
    // });
    //
    // if (!response.ok) throw new Error("Could not delete the category");
    const {id: catId} = categoryId;

    const response = await apiInstance.delete(`categories/${catId}`);
    return response.data;
}

const filterTodos = async function(categoryId) {
    // const response = await fetch(`${BASE_URL}tasks/filter/${categoryId}`);
    //
    // const data = await response.json();
    //
    // return data;

    const response = await axiosInstance.get(`tasks/filter/${categoryId}`);

    return response.data;
}


export {getTodos, editTodo, addTask, deleteTask, getTaskCategories, addTaskCategory, deleteTaskCategory, filterTodos};
