import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "@/modules/todo-list/api";

export function TodoList() {
  const { data, error, isPending } = useQuery({
    queryKey: ["tasks"],
    queryFn: todoListApi.getTodos,
  });

  if (isPending) {
    return <div>Loading tasks...</div>;
  }

  if (error) {
    return <div>Error loading tasks: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="mx-auto mt-5 max-w-[1200px] p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Todo List</h1>
        {data?.map((task) => (
          <div
            key={task.id}
            className="flex justify-between gap-2 rounded border border-slate-300 px-5 py-4"
          >
            <span>{task.text}</span>
            <input type="checkbox" checked={task.done} readOnly />
          </div>
        ))}
      </div>
    </div>
  );
}
