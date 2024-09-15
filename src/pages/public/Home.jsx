import { useFetchData } from "@/hooks";
import { useEffect, useState } from "react";
import PieChart from "@/components/chart/PieChart";
import HomeTaskTable from "@/components/table/HomeTaskTable";
import {
  Button,
  Card,
  CardBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";
import { homeTaskHeader } from "@/data";

const Home = () => {
  const [open, setOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const { data, isLoading } = useFetchData("task/pie-chart");
  const { data: userTasks, isLoading: userTaskLoading } =
    useFetchData("task/user-tasks");
  console.log(userTasks);
  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setOpen(!open);
  };
  return (
    <div>
      {/* Pie chart */}
      <PieChart data={data} />

      {/* User task table */}
      <Card className="my-6 bg-transparent ">
        <CardBody
          className="px-0 pt-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          <table className="w-full min-w-[640px] table-auto overflow-x-auto">
            <thead className="bg-blue-gray-900 text-white ">
              <tr>
                {Object.values(homeTaskHeader).map((el, index) => (
                  <th
                    key={index}
                    className="py-3 px-5 text-left border-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase"
                    >
                      {el.name}
                    </Typography>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {userTaskLoading ? (
                <tr>
                  <td colSpan="12">
                    <div className="flex justify-center items-center h-20">
                      <Spinner className="h-12 w-12 text-blue-gray-500" />
                    </div>
                  </td>
                </tr>
              ) : (
                userTasks?.map((el, index) => (
                  <HomeTaskTable
                    key={index}
                    element={el}
                    handleOpen={handleOpen}
                  />
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>
      {/* <HomeTaskTable element={userTasks?.data} /> */}
    </div>
  );
};

export default Home;
