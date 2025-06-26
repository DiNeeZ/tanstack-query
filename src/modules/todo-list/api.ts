import { jsonApiInstance } from "@/shared/api/api-instance";
import {
  infiniteQueryOptions,
  keepPreviousData,
  queryOptions,
} from "@tanstack/react-query";

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
  getTodoListQueryOptions({ page }: { page: number }) {
    return queryOptions({
      queryKey: ["tasks", { page }],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResponse<TodoDto>>(
          `/todos?_page=${page}&_per_page=10`,
          {
            signal: meta.signal,
          },
        ),
      placeholderData: keepPreviousData,
    });
  },

  getTodoListInfiniteQueryOptions({ isMobile }: { isMobile: boolean }) {
    return infiniteQueryOptions({
      queryKey: ["tasks", "infinite"],
      queryFn: (meta) =>
        jsonApiInstance<PaginatedResponse<TodoDto>>(
          `/todos?_page=${meta.pageParam}&_per_page=10`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (result) => result.next,
      select: (result) => result.pages.flatMap((page) => page.data),
      enabled: isMobile,
    });
  },
};
