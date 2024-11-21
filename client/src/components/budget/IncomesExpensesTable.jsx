import React, { useState, useMemo, useCallback } from "react";
import IncomeCategoryDropdown from "./IncomeCategoryDropdown";
import ExpenseCategoryDropdown from "./ExpenseCategoryDropdown";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { HiTrash } from "react-icons/hi";
import TableHeader from "./TableHeader";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";

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
      let { name, value } = event.target;
      if (name === "amount") {
        value = parseFloat(value).toFixed(2);
      }
      handleInputChange(index, { target: { name, value } }, setRows);
    },
    [handleInputChange, setRows]
  );

  const typePrefix = type.split("_")[0];

  // Define columns using TanStack Table (v8) format
  const columns = useMemo(
    () => [
      // Description
      {
        accessorKey: "description",
        header: "Description",
        cell: ({ row, getValue }) => (
          <input
            type="text"
            name="description"
            defaultValue={getValue() || ""}
            onBlur={(e) => handleBlurInputChange(row.index, e)}
            className="h-[38px] w-full rounded border border-customGray p-1"
            placeholder="Enter description"
          />
        ),
      },
      // Category
      {
        accessorKey: "category",
        header: "Category",
        cell: ({ row, getValue }) =>
          typePrefix === "income" ? (
            <IncomeCategoryDropdown
              value={getValue() || ""}
              onChange={(value) =>
                handleInputChange(
                  row.index,
                  { target: { name: "category", value } },
                  setRows
                )
              }
            />
          ) : (
            <ExpenseCategoryDropdown
              value={getValue() || ""}
              onChange={(value) =>
                handleInputChange(
                  row.index,
                  { target: { name: "category", value } },
                  setRows
                )
              }
            />
          ),
      },
      // Amount
      {
        accessorKey: "amount",
        header: "Amount",
        cell: ({ row }) => (
          <input
            type="number"
            name="amount"
            step="0.01"
            defaultValue={
              isNaN(parseFloat(row.original.amount))
                ? ""
                : parseFloat(row.original.amount).toFixed(2)
            }
            onBlur={(e) => handleBlurInputChange(row.index, e)}
            className="h-[38px] w-full rounded border border-customGray p-1"
            placeholder="Enter amount"
          />
        ),
      },
      // Date Picker
      {
        accessorKey: "date_posted",
        header: "Date Posted",
        cell: ({ row, getValue }) => {
          const [startDate, setStartDate] = useState(
            getValue() ? new Date(getValue()) : new Date()
          );

          const handleDateChange = (date) => {
            setStartDate(date);
            handleInputChange(
              row.index,
              {
                target: {
                  name: "date_posted",
                  value: date.toISOString().split("T")[0],
                },
              },
              setRows
            );
          };

          return (
            <DatePicker
              showIcon
              icon={
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  className="mt-1"
                >
                  <path d="M152 24c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L64 64C28.7 64 0 92.7 0 128l0 16 0 48L0 448c0 35.3 28.7 64 64 64l320 0c35.3 0 64-28.7 64-64l0-256 0-48 0-16c0-35.3-28.7-64-64-64l-40 0 0-40c0-13.3-10.7-24-24-24s-24 10.7-24 24l0 40L152 64l0-40zM48 192l80 0 0 56-80 0 0-56zm0 104l80 0 0 64-80 0 0-64zm128 0l96 0 0 64-96 0 0-64zm144 0l80 0 0 64-80 0 0-64zm80-48l-80 0 0-56 80 0 0 56zm0 160l0 40c0 8.8-7.2 16-16 16l-64 0 0-56 80 0zm-128 0l0 56-96 0 0-56 96 0zm-144 0l0 56-64 0c-8.8 0-16-7.2-16-16l0-40 80 0zM272 248l-96 0 0-56 96 0 0 56z" />
                </svg>
              }
              selected={startDate}
              onChange={handleDateChange}
              className="h-[38px] w-full rounded border border-customGray p-1"
              dateFormat={"yyyy-MM-dd"}
            />
          );
        },
      },

      // Actions
      {
        header: "Actions",
        cell: ({ row }) => (
          <div className="flex w-full justify-center">
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

      <div className="w-full overflow-hidden rounded-lg border bg-white shadow-md">
        {/* Table Header */}
        <table className="w-full table-auto border-collapse">
          <thead className="bg-gray-100 text-gray-700">
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="border-b border-gray-300 px-4 py-2 text-left font-semibold uppercase"
                    style={
                      header.column.columnDef.header === "Actions"
                        ? {
                            width: "80px",
                            minWidth: "80px",
                            textAlign: "center",
                          }
                        : header.column.columnDef.header === "Date Posted"
                          ? {
                              width: "150px",
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
        </table>

        {/* Scrollable Table Body */}
        <div className="max-h-[350px] overflow-y-auto">
          <table className="w-full table-auto border-collapse">
            <tbody>
              {table.getRowModel().rows.map((row, rowIndex) => (
                <tr
                  key={row.id}
                  className={`group transition-colors ${
                    rowIndex % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100`}
                >
                  {row.getVisibleCells().map((cell) => (
                    <td
                      key={cell.id}
                      className="border-t border-gray-300 px-4 py-2 text-gray-800"
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default IncomesExpensesTable;
