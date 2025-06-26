import useTodoList from "./use-todo-list";

export function TodoList() {
  const {
    todoItems,
    currentError,
    currentIsPending,
    isDesktopPaginated,
    navigation,
  } = useTodoList();

  if (currentIsPending) {
    return <div>Loading tasks...</div>;
  }

  if (currentError) {
    return <div>Error loading tasks: {JSON.stringify(currentError)}</div>;
  }

  return (
    <div className="mx-auto mt-5 max-w-[1200px] p-5">
      <div className="flex flex-col gap-2">
        <h1 className="text-2xl font-bold">Todo List</h1>
        {todoItems.map((task) => (
          <div
            key={task.id}
            className={
              "flex justify-between gap-2 rounded border border-slate-300 px-5 py-4" +
              (isDesktopPaginated ? " opacity-50" : "")
            }
          >
            <span>{task.text}</span>
            <input type="checkbox" checked={task.done} readOnly />
          </div>
        ))}

        {navigation}
      </div>
    </div>
  );
}
