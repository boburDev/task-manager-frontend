import request from "@/services";
import * as API from "@/constants/api";
import { useQuery } from "@tanstack/react-query";
const getMeal = async (id) => {
  const response = await request.get(`${API.RECIPE_MEAL}/${id}`);
  return response.data;
};

const useGetMealData = (id) => {
  return useQuery({
    queryKey: ["recipe", id],
    queryFn: () => getMeal(id),
  });
};
export default useGetMealData;
