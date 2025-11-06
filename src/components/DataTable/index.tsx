/* eslint-disable react/no-array-index-key */
import type { ColumnDef } from "@tanstack/react-table";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import { Button } from "../ui/button";

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  page: number;
  totalPages: number;
  totalCount: number;
  onPageChange: (page: number) => void;
  isLoading?: boolean;
};

export function DataTable<TData, TValue>({
  columns,
  data,
  page,
  totalPages,
  totalCount,
  onPageChange,
  isLoading,
}: DataTableProps<TData, TValue>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Generate pagination numbers (with ellipsis)
  const getPageNumbers = () => {
    const pages: (number | string)[] = [];

    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    }
    else {
      if (page <= 3) {
        pages.push(1, 2, 3, "...", totalPages);
      }
      else if (page >= totalPages - 2) {
        pages.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      }
      else {
        pages.push(1, "...", page - 1, page, page + 1, "...", totalPages);
      }
    }
    return pages;
  };

  const handlePrev = () => {
    if (page > 1)
      onPageChange(page - 1);
  };

  const handleNext = () => {
    if (page < totalPages)
      onPageChange(page + 1);
  };

  return (
    <div className="w-full">
      <div className="overflow-x-auto rounded-lg border border-gray-200">
        <table className="w-full border-collapse text-sm text-gray-700">
          <thead className="bg-gray-100">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th
                    key={header.id}
                    className="px-4 py-2 text-left font-semibold"
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext(),
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          <tbody>
            {isLoading
              ? (
                  <tr>
                    <td
                      colSpan={columns.length}
                      className="py-4 text-center text-gray-500"
                    >
                      Loading...
                    </td>
                  </tr>
                )
              : data.length === 0
                ? (
                    <tr>
                      <td
                        colSpan={columns.length}
                        className="py-4 text-center text-gray-500"
                      >
                        No records found
                      </td>
                    </tr>
                  )
                : (
                    table.getRowModel().rows.map(row => (
                      <tr key={row.id} className="border-t hover:bg-gray-50">
                        {row.getVisibleCells().map(cell => (
                          <td key={cell.id} className="px-4 py-2">
                            {flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext(),
                            )}
                          </td>
                        ))}
                      </tr>
                    ))
                  )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-4 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-gray-600">
          Page
          {" "}
          {page}
          {" "}
          of
          {" "}
          {totalPages}
          {" "}
          — Total:
          {" "}
          {totalCount}
          {" "}
          records
        </p>

        <div className="flex items-center gap-1">
          <Button
            className="rounded px-3 py-1 text-sm "
            onClick={handlePrev}
            disabled={page <= 1}
            variant="blue"
          >
            &lt;
          </Button>

          {getPageNumbers().map((p, i) =>
            typeof p === "string"
              ? (
                  <span key={i} className="px-2 text-gray-500">
                    {p}
                  </span>
                )
              : (
                  <Button
                    key={i}
                    className={`rounded px-3 py-1 text-sm ${
                      p === page
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-700 hover:bg-blue-600 hover:text-white"
                    }`}
                    variant="blue"
                    onClick={() => onPageChange(p)}
                  >
                    {p}
                  </Button>
                ),
          )}

          <Button
            className="rounded px-3 py-1 text-sm"
            variant="blue"
            onClick={handleNext}
            disabled={page >= totalPages}
          >
            &gt;
          </Button>
        </div>
      </div>
    </div>
  );
}
