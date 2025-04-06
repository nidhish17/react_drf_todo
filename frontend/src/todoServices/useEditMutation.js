import {useMutation, useQueryClient} from "@tanstack/react-query";
import {editTodo} from "./apiTodos.js";
import toast from "react-hot-toast";

const useEditTodo = function() {
    const queryClient = useQueryClient();

    const {mutate: editMutation, isPending: isEditingTodo} = useMutation({
        mutationFn: editTodo,
        onSuccess: () => {
            toast.success("edit successful");
            queryClient.invalidateQueries({queryKey: ["todos"]});
        },
        onError: (err) => {
            toast.error(`Update Failed: ${err}`);
        }
    });

    return {editMutation, isEditingTodo};
}


export default useEditTodo;