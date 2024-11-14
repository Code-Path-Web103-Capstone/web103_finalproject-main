import React, { useState } from 'react';
import useUserFinanceData from '../../hooks/useUserFinanceData';

const ParseButton = () => {
  const [message, setMessage] = useState('');
  const { actualIncomes, setActualIncomes, actualExpenses, setActualExpenses } = useUserFinanceData();

  const handleParse = async () => {
    try {
      // First fetch request
      let response = await fetch('http://127.0.0.1:8000/execute-parser', {
        method: 'GET',
      });

      let contentType = response.headers.get('content-type');
      let data;
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { error: 'Server returned non-JSON response' };
      }

      if (!response.ok) {
        setMessage(data.error || 'Error executing first parser');
        return;
      }

      // Second fetch request
      response = await fetch('http://127.0.0.1:8000/execute-parser-tdtest', {
        method: 'GET',
      });

      contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { error: 'Server returned non-JSON response' };
      }

      if (!response.ok) {
        setMessage(data.error || 'Error executing second parser');
        return;
      }

      // Third fetch request
      response = await fetch('http://localhost:3000/api/parser/parserjson', {
        method: 'GET',
      });

      contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        data = await response.json();
      } else {
        data = { error: 'Server returned non-JSON response' };
      }

      if (response.ok) {
        setMessage('All parsers executed successfully');
        if (data.data) {
          const { incomes, expenses } = data.data;

          // Update actualIncomes and actualExpenses without deleting existing fields
          setActualIncomes((prevIncomes) => [...prevIncomes, ...incomes]);
          setActualExpenses((prevExpenses) => [...prevExpenses, ...expenses]);
        } else {
          setMessage('No data found in the response');
        }
      } else {
        setMessage(data.error || 'Error executing third parser');
      }
    } catch (err) {
      setMessage(err.message || 'Error executing parsers');
    }
  };

  return (
    <div>
      <button onClick={handleParse} className="mt-4 rounded bg-purple-500 p-2 text-white">
        Execute Parser
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default ParseButton;