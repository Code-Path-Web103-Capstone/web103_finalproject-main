import React, { useState } from 'react';

function ActualIncomesExpenses() {
    const [actualIncomes, setActualIncomes] = useState([{ date_posted: '', description: '', amount: '', category: '' }]);
    const [actualExpenses, setActualExpenses] = useState([{ date_posted: '', description: '', amount: '', category: '' }]);

    const handleAddRow = (setRows) => {
        setRows(prevRows => [...prevRows, { date_posted: '', description: '', amount: '', category: '' }]);
    };

    const handleInputChange = (index, event, setRows) => {
        const { name, value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index][name] = value;
            return newRows;
        });
    };

    const renderTable = (rows, setRows) => (
        <table>
            <thead>
                <tr>
                    <th>Date Posted</th>
                    <th>Description</th>
                    <th>Amount</th>
                    <th>Category</th>
                </tr>
            </thead>
            <tbody>
                {rows.map((row, index) => (
                    <tr key={index}>
                        <td><input type="date" name="date_posted" value={row.date_posted} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                        <td><input type="text" name="description" value={row.description} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                        <td><input type="number" name="amount" value={row.amount} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                        <td><input type="text" name="category" value={row.category} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <div>
            <h2>Actual Incomes</h2>
            {renderTable(actualIncomes, setActualIncomes)}
            <button onClick={() => handleAddRow(setActualIncomes)}>Add Income Row</button>

            <h2>Actual Expenses</h2>
            {renderTable(actualExpenses, setActualExpenses)}
            <button onClick={() => handleAddRow(setActualExpenses)}>Add Expense Row</button>
        </div>
    );
}

export default ActualIncomesExpenses;