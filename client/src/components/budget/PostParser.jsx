import React, { useState } from 'react';
import useUserFinanceData from '../../hooks/useUserFinanceData';
import { useUser } from '../../services/context';
import { handleParse } from '../../services/api';

const PostParser = () => {
  const [message, setMessage] = useState('');
  const { actualIncomes, setActualIncomes, actualExpenses, setActualExpenses } = useUserFinanceData();
  const { user, budgetId } = useUser();

  const handleParseClick = () => {
    handleParse(setMessage, setActualIncomes, setActualExpenses, budgetId);
  };

  return (
    <div>
      <button onClick={handleParseClick} className="mt-4 rounded bg-purple-500 p-2 text-white">
        Execute Post Parser
      </button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default PostParser;