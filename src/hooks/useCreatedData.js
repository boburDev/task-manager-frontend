import request from "@/services";
import * as API from "@/constants/api";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

const createFunction = async ({ newData, key }) => {
  if (newData._id) {
    await request.put(`${API.DOMAIN}/${key}/update/${newData._id}`, newData);
  } else {
    await request.post(`${API.DOMAIN}/${key}/create`, newData);
  }
};
const createData = (key) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (newData) => createFunction({ newData, key }),
    onSuccess: (data, variables) => {
      if (variables._id) {
        toast.success("Successfully updated", { theme: "colored" });
      } else {
        toast.success("Successfully created", { theme: "colored" });
      }
      queryClient.invalidateQueries(key);
    },
    onError: (error) => {
      console.error("There was an error submitting data!", error);
      toast.error("Error submitting data");
    },
  });
};
export const useCreateData = (key) => createData(key);
