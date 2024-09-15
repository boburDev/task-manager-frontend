import { toast } from "react-toastify";
import { useQuery } from "@tanstack/react-query";
import request from "@/services";
import * as API from "@/constants/api";

const fetchData = async ({ key }) => {
  let url = `${API.DOMAIN}/${key}`;
  const response = await request.get(url);
  return response.data;
};

const useData = (key) => {
  return useQuery({
    queryKey: [key],
    queryFn: () => fetchData({ key }),
    onError: (error) => {
      toast.error("Error fetching data", error.message);
    },
  });
};

export const useFetchData = (key) => useData(key);
