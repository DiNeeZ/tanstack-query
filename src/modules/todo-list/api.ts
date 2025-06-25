const BASE_URL = "http://localhost:3000";

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getTodos: async ({ signal }: { signal: AbortSignal }) => {
    const response = await fetch(`${BASE_URL}/todos`, { signal });
    if (!response.ok) {
      throw new Error(`Error fetching todo list: ${response.statusText}`);
    }
    return response.json() as Promise<TodoDto[]>;
  }
};
