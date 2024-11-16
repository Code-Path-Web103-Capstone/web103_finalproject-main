import React, { useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { HiTrash } from "react-icons/hi";
import TableHeader from "./TableHeader";

const IncomesExpensesTable = ({
  rows,
  setRows,
  type,
  handleInputChange,
  handleDeleteRow,
  handleAddRow,
  title,
}) => {
  // Memoize the handleInputChange function to prevent re-renders
  const handleBlurInputChange = useCallback(
    (index, event) => {
      handleInputChange(index, event, setRows);
    },
    [handleInputChange, setRows]
  );

  // Define columns using TanStack Table (v8) format
  const columns = useMemo(
    () => [
      {
        accessorKey: "date_posted",
        header: "Date Posted",
        cell: ({ row, getValue }) => (
          <input
            type="date"
            name="date_posted"
            value={
              getValue() ? new Date(getValue()).toISOString().split("T")[0] : ""
            }
            onChange={(e) => handleInputChange(row.index, e, setRows)}
            className="w-full rounded border p-1"
          />
        ),
      },
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row, getValue }) => (
          <input
            type="text"
            name="description"
            defaultValue={getValue()}
            onBlur={(e) => handleBlurInputChange(row.index, e)}
            className="w-full rounded border p-1"
          />
        ),
      },
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <input
            type="text"
            name="amount"
            defaultValue={row.original.amount}
            onBlur={(e) => handleBlurInputChange(row.index, e)}
            className="w-full rounded border p-1"
          />
        ),
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row, getValue }) => (
          <select
            name="category"
            defaultValue={getValue()}
            onChange={(e) => handleInputChange(row.index, e, setRows)}
            className="w-full rounded border p-1"
          >
            <option value="">Select</option>
            <option value="food">Food</option>
            <option value="gift">Gift</option>
            <option value="transportation">Transportation</option>
            <option value="personal">Personal</option>
            <option value="restaurant">Restaurant</option>
            <option value="travel">Travel</option>
            <option value="utilities">Utilities</option>
          </select>
        ),
      },
      {
        header: "Actions",
        cell: ({ row }) => (
          <div
            className="flex justify-center"
            style={{ width: "50px", minWidth: "50px" }} // Explicit width control
          >
            <button
              className="flex h-8 w-8 items-center justify-center rounded-full bg-red-100 text-red-600 hover:bg-red-200 hover:text-red-800"
              type="button"
              onClick={() => handleDeleteRow(row.index, rows, setRows, type)}
            >
              <HiTrash />
            </button>
          </div>
        ),
      },
    ],
    [
      handleBlurInputChange,
      handleInputChange,
      handleDeleteRow,
      rows,
      setRows,
      type,
    ]
  );

  // Set up react-table instance
  const table = useReactTable({
    data: rows,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <TableHeader
        handleAddRow={handleAddRow}
        setRows={setRows}
        title={title}
      />

      <div className="overflow-x-auto rounded-xl">
        <table className="w-full table-fixed border-collapse border border-gray-300">
          {/* Table Head */}
          <thead className="rounded-lg bg-gray-200 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-gray-300 p-2 text-left font-semibold"
                    style={
                      header.column.columnDef.header === "Actions"
                        ? {
                            width: "80px", // Match the Actions column width
                            minWidth: "80px",
                            textAlign: "center",
                            paddingRight: "10px",
                          }
                        : header.column.columnDef.header === "Date Posted"
                          ? {
                              width: "150px", // Match the Date Posted column width
                              minWidth: "150px",
                            }
                          : {}
                    }
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
          </thead>

          {/* Table Body */}
          <tbody>
            {table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={rowIndex % 2 === 0 ? "bg-white" : "bg-gray-50"} // Alternating row colors
              >
                {row.getVisibleCells().map((cell) => (
                  <td
                    key={cell.id}
                    className="border-t border-gray-300 p-2 text-gray-800"
                    style={
                      cell.column.columnDef.header === "Actions"
                        ? {
                            width: "50px",
                            minWidth: "50px",
                            textAlign: "center",
                          }
                        : {}
                    }
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default IncomesExpensesTable;
