import React from "react";

const IncomesExpensesTable = ({
  rows,
  setRows,
  type,
  handleInputChange,
  handleDeleteRow,
}) => (
  <table>
    <thead>
      <tr>
        <th>Date Posted</th>
        <th>Description</th>
        <th>Amount</th>
        <th>Category</th>
        <th>Actions</th>
      </tr>
    </thead>
    <tbody>
      {rows.map((row, index) => (
        <tr key={row.id || index}>
          <td>
            <input
              type="date"
              name="date_posted"
              value={
                row.date_posted
                  ? new Date(row.date_posted).toISOString().split("T")[0]
                  : ""
              }
              onChange={(e) => handleInputChange(index, e, setRows)}
            />
          </td>
          <td>
            <input
              type="text"
              name="description"
              value={row.description}
              onChange={(e) => handleInputChange(index, e, setRows)}
            />
          </td>
          <td>
            <input
              type="text"
              name="amount"
              value={row.amount}
              onChange={(e) => handleInputChange(index, e, setRows)}
            />
          </td>
          <td>
            <select
              name="category"
              value={row.category}
              onChange={(e) => handleInputChange(index, e, setRows)}
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
          </td>
          <td>
            <button
              type="button"
              onClick={() => handleDeleteRow(index, rows, setRows, type)}
            >
              Delete
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
);

export default IncomesExpensesTable;
