import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

function ActualIncomesExpenses() {
    const [actualIncomes, setActualIncomes] = useState([]);
    const [actualExpenses, setActualExpenses] = useState([]);
    const [deletedRows, setDeletedRows] = useState([]);
    const { userId, budgetId } = useParams();

    useEffect(() => {
        const fetchData = async () => {
            console.log(`Fetching data for userId: ${userId}, budgetId: ${budgetId}`);
            try {
                const [expensesResponse, incomesResponse] = await Promise.all([
                    fetch(`http://localhost:3000/api/expense/actual/${userId}/${budgetId}`),
                    fetch(`http://localhost:3000/api/income/actual/${userId}/${budgetId}`)
                ]);

                if (!expensesResponse.ok) {
                    throw new Error(`HTTP error! status: ${expensesResponse.status}`);
                }
                if (!incomesResponse.ok) {
                    throw new Error(`HTTP error! status: ${incomesResponse.status}`);
                }

                const expensesData = await expensesResponse.json();
                const incomesData = await incomesResponse.json();

                setActualExpenses(expensesData);
                setActualIncomes(incomesData);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [userId, budgetId]);

    const handleAddRow = (setRows) => {
        setRows(prevRows => [...prevRows, { id: '', date_posted: '', description: '', amount: '', category: '', budget_id: budgetId }]);
    };

    const handleDeleteRow = (index, rows, setRows, type) => {
        const row = rows[index];
        if (row.id) {
            setDeletedRows(prevDeletedRows => [...prevDeletedRows, { ...row, type }]);
        }
        setRows(prevRows => prevRows.filter((_, i) => i !== index));
    };

    const handleInputChange = (index, event, setRows) => {
        const { name, value } = event.target;
        setRows(prevRows => {
            const newRows = [...prevRows];
            newRows[index][name] = value;
            return newRows;
        });
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        const processRow = async (row, type) => {
            const isUpdate = row.id && row.id !== '';
            const url = isUpdate
                ? `http://localhost:3000/api/${type}/actual/update`
                : `http://localhost:3000/api/${type}/actual/addbulk`;
            const method = isUpdate ? 'PATCH' : 'POST';
            const body = {
                ...row,
                id: isUpdate ? row.id : undefined // Remove id for POST requests
            };
            const response = await fetch(url, {
                method: method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(body),
            });
            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
            }
            return response.json();
        };

        try {
            const incomeResults = await Promise.all(actualIncomes.map(income => processRow(income, 'income')));
            const expenseResults = await Promise.all(actualExpenses.map(expense => processRow(expense, 'expense')));

            for (const row of deletedRows) {
                const url = `http://localhost:3000/api/${row.type}/actual/delete`;
                const body = {
                    id: row.id,
                    budget_id: row.budget_id
                };

                const response = await fetch(url, {
                    method: 'DELETE',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(body),
                });

                if (!response.ok) {
                    const errorText = await response.text();
                    throw new Error(`HTTP error! status: ${response.status}, response: ${errorText}`);
                }
            }

            console.log('Income Responses:', incomeResults);
            console.log('Expense Responses:', expenseResults);
        } catch (error) {
            console.error('Error:', error);
        }
    };

    const renderTable = (rows, setRows, type) => (
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
                    <tr key={row.id}>
                        <td><input type="date" name="date_posted" value={row.date_posted ? new Date(row.date_posted).toISOString().split('T')[0] : ''} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                        <td><input type="text" name="description" value={row.description} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                        <td><input type="text" name="amount" value={row.amount} onChange={(e) => handleInputChange(index, e, setRows)} /></td>
                        <td>
                            <select name="category" value={row.category} onChange={(e) => handleInputChange(index, e, setRows)}>
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
                            <button type="button" onClick={() => handleDeleteRow(index, rows, setRows, type)}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
    );

    return (
        <form onSubmit={handleSubmit}>
            <h2>Actual Incomes</h2>
            {renderTable(actualIncomes, setActualIncomes, 'income')}
            <button type="button" onClick={() => handleAddRow(setActualIncomes)}>Add Income Row</button>

            <h2>Actual Expenses</h2>
            {renderTable(actualExpenses, setActualExpenses, 'expense')}
            <button type="button" onClick={() => handleAddRow(setActualExpenses)}>Add Expense Row</button>

            <button type="submit">Submit</button>
        </form>
    );
}

export default ActualIncomesExpenses;