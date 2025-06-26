import { type SetStateAction } from "react";

export function PaginationNav({
  setPage,
  page,
  pages,
}: {
  setPage: (value: SetStateAction<number>) => void;
  page: number;
  pages: number | undefined;
}) {
  return (
    <div className="flex items-center gap-4">
      <button
        onClick={() => setPage((p) => Math.max(p - 1, 1))}
        className="cursor-pointer rounded border border-teal-500 p-3"
      >
        prev
      </button>
      <span>{page}</span>
      <button
        onClick={() => setPage((p) => Math.min(p + 1, pages || 1))}
        className="cursor-pointer rounded border border-teal-500 p-3"
      >
        next
      </button>
    </div>
  );
}
