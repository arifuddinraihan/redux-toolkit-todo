// import { useAppSelector } from "@/redux/hooks";
import { useState } from "react";
import AddTodoModal from "./AddTodoModal";
import TodoCards, { TTodoCardsProps } from "./TodoCards";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";
import { useAutoAnimate } from "@formkit/auto-animate/react";

const TodoContainer = () => {
  // const todoList = useAppSelector((state) => state.todoList.todos);
  const [priorityFilter, setPriorityFilter] = useState("");

  const { data: todos, isLoading, isError } = useGetTodosQuery(priorityFilter);

  const [parent] = useAutoAnimate(/* optional config */);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error...</h1>;
  }
  return (
    <div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px] mb-10">
        <div className="flex justify-between items-center bg-white rounded-xl w-full h-full p-3">
          <AddTodoModal />
          <p className="text-lg font-medium">
            You have currently{" "}
            {
              todos?.data.filter(
                (todo: TTodoCardsProps) => todo.isCompleted === false
              ).length
            }{" "}
            tasks pending and{" "}
            {
              todos?.data.filter(
                (todo: TTodoCardsProps) =>
                  todo.priority === "High" && todo.isCompleted === false
              ).length
            }{" "}
            have high priority.
          </p>
          <TodoFilter
            priorityFilter={priorityFilter}
            setPriorityFilter={setPriorityFilter}
          />
        </div>
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div
          ref={parent}
          className="bg-white rounded-xl w-full h-full p-5 space-y-3"
        >
          {todos?.data && todos?.data.length > 0 ? (
            todos?.data?.map((todo: TTodoCardsProps) => (
              <TodoCards {...todo} key={todo?._id} />
            ))
          ) : (
            <div className="bg-white text-2xl font-bold p-5 flex justify-center items-center">
              There is no task pending
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoContainer;
