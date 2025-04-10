import {useMutation, useQueryClient} from "@tanstack/react-query";
import {deleteTaskCategory} from "./apiTodos.js";
import toast from "react-hot-toast";


const useDeleteCategory = function () {
    const queryClient = useQueryClient();

    const {isPending: isDelCat, mutate: deleteCat} = useMutation({
        mutationFn: deleteTaskCategory,
        onSuccess: () => {
            toast.success("Category deleted successfully");
            queryClient.invalidateQueries({queryKey: ["task-categories"]});
            queryClient.invalidateQueries({queryKey: ["todos"]});
        },
        onError: (err) => {
            toast.error("couldn't delete", err.message);
        }
    })


    return {isDelCat, deleteCat};
}

export default useDeleteCategory;