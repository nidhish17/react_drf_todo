import {useMutation, useQueryClient} from "@tanstack/react-query";
import {addTask} from "./apiTodos.js";
import toast from "react-hot-toast";


const UseAddMutation = function () {
    const queryClient = useQueryClient();

    const {mutate: addMutation, isPending: isAddingTask} = useMutation({
        mutationFn: addTask,
        onSuccess: () => {
            toast.success("Task added successfully");
            queryClient.invalidateQueries({queryKey: ["todos"]});
        },
        onError: (err) => {
            toast.error("Failed to add task " + err);
        }
    });

    return {addMutation, isAddingTask};
}

export default UseAddMutation;
