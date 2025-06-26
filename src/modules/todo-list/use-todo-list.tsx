import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { todoListApi } from "@/modules/todo-list/api";
import { useState } from "react";
import { useIntersection, useIsMobile } from "@/shared/hooks";
import { CursorNav } from "./components/cursor-nav";
import { PaginationNav } from "./components/pagination-nav";

export default function useTodoList() {
  const [page, setPage] = useState(1);
  const { isMobile } = useIsMobile();

  const {
    data: paginatedData,
    error: paginatedError,
    isPending: isPaginatedPending,
    isPlaceholderData: isPaginatedPlaceholderData,
  } = useQuery({ ...todoListApi.getTodoListQueryOptions({ page }) });

  const {
    data: infiniteData,
    error: infiniteError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isPending: isInfinitePending,
  } = useInfiniteQuery({
    ...todoListApi.getTodoListInfiniteQueryOptions({ isMobile }),
  });

  const cursorRef = useIntersection(() => fetchNextPage());

  const todoItems = isMobile ? infiniteData || [] : paginatedData?.data || [];
  const currentError = isMobile ? infiniteError : paginatedError;
  const currentIsPending = isMobile ? isInfinitePending : isPaginatedPending;

  const isDesktopPaginated = !isMobile && isPaginatedPlaceholderData;

  const navigation = isMobile ? (
    <CursorNav
      cursorRef={cursorRef}
      hasNextPage={hasNextPage}
      isFetchingNextPage={isFetchingNextPage}
    />
  ) : (
    <PaginationNav setPage={setPage} page={page} pages={paginatedData?.pages} />
  );

  return {
    todoItems,
    currentError,
    currentIsPending,
    isDesktopPaginated,
    navigation,
  };
}
