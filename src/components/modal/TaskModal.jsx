import { taskHeader } from "@/data";
import {
  Button,
  Checkbox,
  Dialog,
  DialogBody,
  DialogHeader,
  Input,
} from "@material-tailwind/react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskModal = (props) => {
  const { isModalOpen, handleOpen, onSubmit, element } = props;
  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();
  console.log(element);
  useEffect(() => {
    reset(element);
    reset();
  }, [handleOpen, isModalOpen, element, reset]);
  return (
    <Dialog
      size="xs"
      open={isModalOpen}
      handler={handleOpen}
      onClose={handleOpen}
    >
      <DialogHeader className="text-blue-gray-600">Task created</DialogHeader>
      <DialogBody>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-1 gap-10">
            {Object.entries(taskHeader).map(([key, item]) =>
              item.type !== "select" ? (
                <div className={`flex flex-col`} key={key}>
                  <label htmlFor={key} className={`mb-2  text-blue-gray-600`}>
                    {item.name}:
                  </label>
                  <div>
                    <Input
                      id={key}
                      defaultValue={item?.value || null}
                      label={item.name}
                      type={item.type}
                      {...register(key, {
                        required: `${item.name} can't be empty`,
                      })}
                    />
                    {errors[key] && (
                      <span className="text-red-500 text-sm">
                        {errors[key].message}
                      </span>
                    )}
                  </div>
                </div>
              ) : null
            )}
            <div className="flex" id="compleatedCheckBtn">
              <label htmlFor="completed" className="mb-2 text-blue-gray-600">
                Completed:
              </label>
              <Checkbox  id="completed" {...register("completed")}  />
            </div>
          </div>
          <div className="flex justify-end items-end col-span-2 mt-4">
            <Button
              variant="gradient"
              color="red"
              onClick={handleOpen}
              className="mr-1 ml-2"
            >
              <span>Cancel</span>
            </Button>
            <Button type="submit" variant="gradient" color="blue-gray">
              {Object.keys(element).length === 0 ? "Add Product" : "Update"}
            </Button>
          </div>
        </form>
      </DialogBody>
    </Dialog>
  );
};

export default TaskModal;
