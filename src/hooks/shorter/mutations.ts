import { shorter } from "@/src/services/shorter.service";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useShorter = () => {
    const queryClient = useQueryClient();
    return useMutation(
        (body: ShorterPayload) => shorter(body),
        {
            // When mutate is called:
            onMutate: async (info) => {
                // Cancel any outgoing refetches (so they don't overwrite our optimistic update)
                await queryClient.cancelQueries(["shorter"]);

                // Snapshot the previous value
                const previousInfos = queryClient.getQueryData(["shorter"]);

                return { previousInfos };
            },
            // If the mutation fails, use the context returned from onMutate to roll back
            onError: (err: any, variables, context) => {
                // displayError(err.response?.data?.message)
                if (context?.previousInfos) {
                    queryClient.setQueryData(["shorter"], context.previousInfos);
                }
            },
            // useErrorBoundary:true,
            // Always refetch after error or success:
            onSettled: () => {
                queryClient.invalidateQueries(["shorter"]);
            },
        }
    );
};