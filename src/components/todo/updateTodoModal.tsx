import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { TTodoCardsProps, TTodoUpdate } from "./TodoCards";
import { useUpdateSingleTodoMutation } from "@/redux/api/api";

const UpdateTodoModal = ({
  _id,
  title,
  description,
  priority,
  isCompleted,
}: TTodoCardsProps) => {
  const [task, setTask] = useState(title);
  const [updatedDescription, setUpdatedDescription] = useState(description);
  const [updatedPriority, setUpdatedPriority] = useState(priority);
  //   const [complete, setTodoComplete] = useState(false);

  const [updateTodo] = useUpdateSingleTodoMutation();

  //   const setTodoComplete = () => {
  //     isCompleted = true;
  //   };

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    const updatedTask: TTodoUpdate = {
      id: _id,
      data: {
        title: task,
        description: updatedDescription,
        priority: updatedPriority,
        isCompleted,
      },
    };

    updateTodo(updatedTask);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-[#5C53FE] text-white rounded-xl hover:bg-slate-800">
          <svg
            className="size-5"
            data-slot="icon"
            fill="none"
            strokeWidth="1.5"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            ></path>
          </svg>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
        <form onSubmit={onSubmit}>
          {/* Dialog Header */}
          <DialogHeader>
            <DialogTitle className="mb-4">Udpate your todo</DialogTitle>
            {/* <DialogDescription>Udpate your todo.</DialogDescription> */}
          </DialogHeader>
          {/* Dialog body */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task
              </Label>
              <Input
                defaultValue={title}
                onBlur={(e) => setTask(e.target.value)}
                id="task"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="description" className="text-right">
                Description
              </Label>
              <Input
                defaultValue={description}
                onBlur={(e) => setUpdatedDescription(e.target.value)}
                id="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select onValueChange={(value) => setUpdatedPriority(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder={priority} />
                </SelectTrigger>
                <SelectContent className="bg-white rounded-2xl">
                  <SelectGroup>
                    <SelectItem value="High">High</SelectItem>
                    <SelectItem value="Medium">Medium</SelectItem>
                    <SelectItem value="Low">Low</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          {/* Dialog Footer */}
          <div className={`flex  justify-end`}>
            {/* {isCompleted === false ? (
              <Button
                onClick={setTodoComplete}
                className="bg-emerald-400 text-white hover:bg-slate-400 hover:text-slate-800"
                type="submit"
              >
                Mark Complete
              </Button>
            ) : (
              <></>
            )} */}
            <DialogClose asChild>
              <Button
                className="bg-slate-800 text-white hover:bg-slate-400 hover:text-slate-800"
                type="submit"
              >
                Update changes
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default UpdateTodoModal;
