// import { useAppDispatch } from "@/redux/hooks";
import { Button } from "../ui/button";
// import {
//   removeTodo,
//   sortByPendingTodoList,
//   toggleComplete,
// } from "@/redux/features/todoSlice";
import {
  useDeleteSingleTodoMutation,
  // useGetAllTodoQuery,
  useUpdateSingleTodoMutation,
} from "@/redux/api/api";

export type TTodoCardsProps = {
  _id?: string;
  title: string;
  description: string;
  isCompleted?: boolean;
  priority: string;
};

const TodoCards = ({
  _id,
  title,
  description,
  isCompleted,
  priority,
}: TTodoCardsProps) => {
  // const dispatch = useAppDispatch();

  console.log(title, description);

  const [updateTodo] = useUpdateSingleTodoMutation();

  const [deleteTodo] = useDeleteSingleTodoMutation();

  const toggleHandle = () => {
    const options = {
      _id,
      body: {
        isCompleted: !isCompleted,
      },
    };
    updateTodo(options);

    // dispatch(toggleComplete(id));
    // dispatch(sortByPendingTodoList());
  };
  return (
    <div className="bg-white rounded-md flex justify-between items-center p-3 border">
      <input onChange={toggleHandle} type="checkbox" name="" id="" />
      <p className="font-semibold">{title}</p>
      <div>
        {isCompleted ? (
          <p>
            <svg
              className="size-8 text-green-500"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              ></path>
            </svg>
          </p>
        ) : (
          <p>
            <svg
              className="size-8 text-red-500"
              data-slot="icon"
              fill="none"
              stroke-width="1.5"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M12 9v3.75m9-.75a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 3.75h.008v.008H12v-.008Z"
              ></path>
            </svg>
          </p>
        )}
      </div>
      <p>{priority}</p>
      <p>{description}</p>
      <div className="space-x-5">
        <Button
          onClick={() => deleteTodo(_id)}
          className="bg-red-500 text-white rounded-xl hover:bg-slate-800"
        >
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
              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
            ></path>
          </svg>
        </Button>
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
      </div>
    </div>
  );
};

export default TodoCards;
