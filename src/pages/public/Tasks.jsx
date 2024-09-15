import {
  Button,
  Card,
  CardBody,
  Spinner,
  Typography,
} from "@material-tailwind/react";

import TaskTable from "@/components/table/TaskTable";
import { useCreateData, useFetchData } from "@/hooks";
import { useState } from "react";
import { taskHeader } from "@/data";
import TaskModal from "@/components/modal/TaskModal";

const Tasks = () => {
  const [open, setOpen] = useState(false);
  const [tableElement, setTableElement] = useState({});
  const { data: task, isLoading } = useFetchData("task/all");
  const { mutate: createProduct } = useCreateData("task");
  const folder = JSON.parse(localStorage.getItem("mohir"));
  console.log(task);
  const handleOpen = (element) => {
    if (element) {
      setTableElement(element);
    } else {
      setTableElement({});
    }
    setOpen(!open);
  };
  const onSubmit = (data) => {
    createProduct(data);
    handleOpen();
  };

  const classBtn = "min-w-fit bg-white text-blue-gray-600 font-bold shadow-sm";

  return (
    <div className="my-6">
      <div className="flex mb-4 justify-between flex-wrap">
        <div className="flex gap-10 xl:mb-0 mb-3 flex-wrap">
          <Button className={classBtn} onClick={() => handleOpen({})}>
            Create Task
          </Button>
        </div>
      </div>

      <Card className="my-6 bg-transparent ">
        <CardBody
          className="px-0 pt-0 pb-2 overflow-auto"
          style={{ scrollbarWidth: "thin", scrollbarColor: "gray transparent" }}
        >
          <table className="w-full min-w-[640px] table-auto overflow-x-auto">
            <thead className="bg-blue-gray-900 text-white ">
              <tr>
                {folder?.state?.user?.role === "admin" && (
                  <th
                    key="username"
                    className="border-b border-blue-gray-50 py-3 px-5 text-left"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase"
                    >
                      Username
                    </Typography>
                  </th>
                )}{" "}
                {Object.values(taskHeader).map((el, index) => (
                  <th
                    key={index}
                    className="py-3 px-4 text-left border-blue-gray-50"
                  >
                    <Typography
                      variant="small"
                      className="text-[11px] font-bold uppercase"
                    >
                      {el.name}
                    </Typography>
                  </th>
                ))}
                <th className="border-b border-blue-gray-50 py-3 px-4 text-left">
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase"
                  >
                    Status
                  </Typography>
                </th>
                <th
                  key="actions"
                  className="border-b border-blue-gray-50 py-3 px-5 text-center"
                >
                  <Typography
                    variant="small"
                    className="text-[11px] font-bold uppercase"
                  >
                    Actions
                  </Typography>
                </th>
              </tr>
            </thead>
            <tbody>
              {isLoading ? (
                <tr>
                  <td colSpan="12">
                    <div className="flex justify-center items-center h-20">
                      <Spinner className="h-12 w-12 text-blue-gray-500" />
                    </div>
                  </td>
                </tr>
              ) : (
                task?.map((el, index) => (
                  <TaskTable key={index} element={el} handleOpen={handleOpen} />
                ))
              )}
            </tbody>
          </table>
        </CardBody>
      </Card>

      <TaskModal
        isModalOpen={open}
        handleOpen={handleOpen}
        onSubmit={onSubmit}
        element={tableElement}
      />
    </div>
  );
};

export default Tasks;
