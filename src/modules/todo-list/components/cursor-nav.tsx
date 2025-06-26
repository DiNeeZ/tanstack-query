import type { Ref } from "react";

export function CursorNav({
  cursorRef,
  hasNextPage,
  isFetchingNextPage,
}: {
  cursorRef: Ref<HTMLDivElement> | null;
  hasNextPage: boolean;
  isFetchingNextPage: boolean;
}) {
  return (
    <div ref={cursorRef}>
      {!hasNextPage && "No more tasks"}
      {isFetchingNextPage && "Loading more tasks..."}
    </div>
  );
}
