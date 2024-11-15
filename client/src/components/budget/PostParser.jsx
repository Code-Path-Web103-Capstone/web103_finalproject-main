import React, { useState } from 'react';
import useUserFinanceData from '../../hooks/useUserFinanceData';
import { useUser } from '../../services/context';

const PostParser = () => {
  const [message, setMessage] = useState('');
  const { actualIncomes, setActualIncomes, actualExpenses, setActualExpenses } = useUserFinanceData();
  const { user, budgetId } = useUser();

  const handleParse = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/parser/parserjson', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ option: 'td_bank' }),
      });

      const contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { error: 'Server returned non-JSON response' };
      }

      if (response.ok) {
        setMessage('Parser executed successfully');
        console.log(data); // Log the result

        const { incomes, expenses } = data.data;

        if (incomes && incomes.length > 0) {
          const newIncomes = incomes.map((income, index) => ({
            description: income.description,
            date_posted: new Date(income.date).toISOString(),
            amount: income.amount,
            category: 'gift',
            budget_id: budgetId,
          }));

          console.log('New Incomes:', newIncomes);

          const incomeResponse = await fetch('http://localhost:3000/api/income/actual/addbulk', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newIncomes),
          });

          if (incomeResponse.ok) {
            setActualIncomes((prevIncomes) => [...prevIncomes, ...newIncomes]);
            setMessage('Added to actual incomes');
          } else {
            setMessage('Failed to add incomes to the database');
          }
        } else {
          setMessage('No incomes found in the provided data');
        }

        if (expenses && expenses.length > 0) {
          const newExpenses = expenses.map((expense, index) => ({
            description: expense.description,
            date_posted: new Date(expense.date).toISOString(),
            amount: expense.amount,
            category: 'expense',
            budget_id: budgetId,
          }));

          const expenseResponse = await fetch('http://localhost:3000/api/expense/actual/addbulk', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newExpenses),
          });

          if (expenseResponse.ok) {
            setActualExpenses((prevExpenses) => [...prevExpenses, ...newExpenses]);
            setMessage('Added to actual expenses');
          } else {
            setMessage('Failed to add expenses to the database');
          }
        } else {
          setMessage('No expenses found in the provided data');
        }

        // Reload the page
        window.location.reload();
      } else {
        setMessage(data.error || 'Error executing parser');
      }
    } catch (err) {
      setMessage(err.message || 'Error executing parser');
    }
  };

  return (
    <div>
      <button onClick={handleParse} className="mt-4 rounded bg-purple-500 p-2 text-white">
        Execute Post Parser
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostParser;