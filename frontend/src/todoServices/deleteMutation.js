import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTask} from "./apiTodos.js";
import toast from "react-hot-toast";


const useDeleteMutation = function () {
    const queryClient = useQueryClient();

    const {isPending: isDeleting, mutate: deleteMutation} = useMutation({
        mutationFn: deleteTask,
        onSuccess: () => {
            toast.success("Task Deleted Successfully");
            queryClient.invalidateQueries({queryKey: ["todos"]});
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return {isDeleting, deleteMutation};
};

export default useDeleteMutation;
