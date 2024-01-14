// import { useAppSelector } from "@/redux/hooks";
import AddTodoModal from "./AddTodoModal";
import TodoCards, { TTodoCardsProps } from "./TodoCards";
import TodoFilter from "./TodoFilter";
import { useGetTodosQuery } from "@/redux/api/api";

const TodoContainer = () => {
  // const todoList = useAppSelector((state) => state.todoList.todos);

  const { data: todos, isLoading, isError } = useGetTodosQuery(undefined);

  // console.log(todoList);

  if (isLoading) {
    return <h1>Loading...</h1>;
  }
  if (isError) {
    return <h1>Error...</h1>;
  }
  return (
    <div>
      <div className="flex justify-between mb-10">
        <AddTodoModal />
        <TodoFilter />
      </div>
      <div className="bg-primary-gradient w-full h-full rounded-xl p-[5px]">
        <div className="bg-white rounded-xl w-full h-full p-5 space-y-3">
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
