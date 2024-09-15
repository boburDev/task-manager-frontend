import { useDeleteData } from "@/hooks/useDeleteData";
import { PencilSquareIcon, TrashIcon } from "@heroicons/react/24/solid";
import {
  Typography,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from "@material-tailwind/react";
import { useState } from "react";

const TaskTable = ({ element, handleOpen }) => {
  const className = `py-3 px-4`;
  const { mutate: deleteTask } = useDeleteData("task");
  const [isOpen, setIsOpen] = useState(false);
  const [selectedTaskId, setSelectedTaskId] = useState(null);
  const folder = JSON.parse(localStorage.getItem("mohir"));
  console.log(folder);
  const handleDeleteConfirm = (id) => {
    setIsOpen(true);
    setSelectedTaskId(id); // O'chirilayotgan task ID sini saqlab qo'yamiz
  };

  const handleDelete = () => {
    deleteTask(selectedTaskId); // Tasdiqlashda o'chiramiz
    setIsOpen(false); // Modalni yopamiz
  };

  const closeModal = () => {
    setIsOpen(false); // Modalni yopish uchun
  };

  return (
    <>
      {/* Task satri */}
      <tr className="bg-white text-black overflow-x-auto">
        {folder?.state?.user?.role === "admin" && (
          <td className={className}>
            <Typography variant="small" className="text-xs font-medium ">
              {element?.userId?.email}
            </Typography>
          </td>
        )}
        <td className={className}>
          <Typography
            variant="small"
            className="text-xs font-medium capitalize"
          >
            {element.title}
          </Typography>
        </td>
        <td className={className}>
          <Typography
            variant="small"
            className="text-xs font-medium capitalize"
          >
            {element.description}
          </Typography>
        </td>
        <td className={className}>
          <Typography
            variant="small"
            className="text-xs font-medium capitalize"
          >
            {element.completed ? "Completed" : "Not Completed"}
          </Typography>
        </td>
        {folder?.state?.user?.role === "admin" ? (
          <>
            {folder?.state?.user?.email === element?.userId?.email ? (
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-4">
                  <div
                    className="h-5 w-5 text-blue-500 cursor-pointer"
                    onClick={() => handleOpen(element)}
                  >
                    <PencilSquareIcon />
                  </div>

                  <div
                    className="h-5 w-5 text-red-500 cursor-pointer"
                    onClick={() => handleDeleteConfirm(element._id)}
                  >
                    <TrashIcon />
                  </div>
                </div>
              </td>
            ) : (
              <td className="py-3 px-4">
                <div className="flex items-center justify-center gap-4"></div>
              </td>
            )}
          </>
        ) : (
          <td className="py-3 px-4">
            <div className="flex items-center justify-center gap-4">
              <div
                className="h-5 w-5 text-blue-500 cursor-pointer"
                onClick={() => handleOpen(element)}
              >
                <PencilSquareIcon />
              </div>

              <div
                className="h-5 w-5 text-red-500 cursor-pointer"
                onClick={() => handleDeleteConfirm(element._id)}
              >
                <TrashIcon />
              </div>
            </div>
          </td>
        )}
      </tr>

      <Dialog open={isOpen} handler={closeModal} size="xs">
        <DialogHeader>Delete Task</DialogHeader>
        <DialogBody divider>
          Are you sure you want to delete this task?
        </DialogBody>
        <DialogFooter>
          <Button variant="text" color="red" onClick={closeModal}>
            No
          </Button>
          <Button
            className="ml-2"
            variant="gradient"
            color="green"
            onClick={handleDelete}
          >
            Yes
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
};

export default TaskTable;
