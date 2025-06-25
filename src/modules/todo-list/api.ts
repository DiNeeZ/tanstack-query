const BASE_URL = "http://localhost:3000";

export type PaginatedResponse<T> = {
  data: T[];
  first: number;
  last: number;
  items: number;
  next: number | null;
  prev: number | null;
  pages: number;
};

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getTodos: async (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    const response = await fetch(
      `${BASE_URL}/todos?_page=${page}&_per_page=10`,
      {
        signal,
      },
    );
    if (!response.ok) {
      throw new Error(`Error fetching todo list: ${response.statusText}`);
    }
    return response.json() as Promise<PaginatedResponse<TodoDto>>;
  },
};
