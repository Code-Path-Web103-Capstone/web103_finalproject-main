import React, { useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { HiTrash } from "react-icons/hi";

const IncomesExpensesTable = ({
  rows,
  setRows,
  type,
  handleInputChange,
  handleDeleteRow,
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
          >
            <option value="">Select Category</option>
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
          <button
            className="border-2 text-2xl"
            type="button"
            onClick={() => handleDeleteRow(row.index, rows, setRows, type)}
          >
            <HiTrash />
          </button>
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
    <table className="min-w-[500px] rounded-xl border-2 border-blue-600">
      <thead>
        {table.getHeaderGroups().map((headerGroup) => (
          <tr key={headerGroup.id}>
            {headerGroup.headers.map((header) => (
              <th key={header.id}>
                {flexRender(
                  header.column.columnDef.header,
                  header.getContext()
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody>
        {table.getRowModel().rows.map((row) => (
          <tr key={row.id}>
            {row.getVisibleCells().map((cell) => (
              <td key={cell.id}>
                {flexRender(cell.column.columnDef.cell, cell.getContext())}
              </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default IncomesExpensesTable;
