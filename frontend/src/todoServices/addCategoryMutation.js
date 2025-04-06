import {useMutation, useQueryClient} from "@tanstack/react-query";
import toast from "react-hot-toast";
import {addTaskCategory} from "./apiTodos.js";

const useCategoryMutation = function() {

    const query = useQueryClient();

    const {mutate: addCategoryMutation, isPending: isAddingCategory} = useMutation({
        mutationFn: addTaskCategory,
        onSuccess: () => {
            toast.success("Successfully added category");
            query.invalidateQueries({queryKey: ["task-categories"]});
        },
        onError: (err) => {
            toast.error(err.message);
        }
    });

    return {addCategoryMutation, isAddingCategory};
}

export default useCategoryMutation;
