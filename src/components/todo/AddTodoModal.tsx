import { FormEvent, useState } from "react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
// import { useAppDispatch } from "@/redux/hooks";
import // TTodo,
// addTodo,
// sortByPendingTodoList,
"@/redux/features/todoSlice";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useAddTodoMutation } from "@/redux/api/api";
import { TTodoCardsProps } from "./TodoCards";

const AddTodoModal = () => {
  const [task, setTask] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState("");
  // const dispatch = useAppDispatch();

  const [addTodo] = useAddTodoMutation();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    // const randomStringId = Math.random().toString(36).substring(2, 7);

    const taskDetails: TTodoCardsProps = {
      title: task,
      description: description,
      isCompleted: false,
      priority,
    };

    // dispatch(addTodo(taskDetails));
    // dispatch(sortByPendingTodoList());

    addTodo(taskDetails);
  };
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-primary-gradient hover:bg-secondary-gradient text-white rounded-xl text-xl font-semibold">
          Add todo
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] bg-white rounded-2xl">
        <form onSubmit={onSubmit}>
          {/* Dialog Header */}
          <DialogHeader>
            <DialogTitle className="mb-4">Add Todo</DialogTitle>
            <DialogDescription>
              Add your todo that you want to remember.
            </DialogDescription>
          </DialogHeader>
          {/* Dialog body */}
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="name" className="text-right">
                Task
              </Label>
              <Input
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
                onBlur={(e) => setDescription(e.target.value)}
                id="description"
                className="col-span-3"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label className="text-right">Priority</Label>
              <Select onValueChange={(value) => setPriority(value)}>
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select a priority" />
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
          <div className="flex justify-end">
            <DialogClose asChild>
              <Button
                className="bg-slate-800 text-white hover:bg-slate-400 hover:text-slate-800"
                type="submit"
              >
                Save changes
              </Button>
            </DialogClose>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddTodoModal;
