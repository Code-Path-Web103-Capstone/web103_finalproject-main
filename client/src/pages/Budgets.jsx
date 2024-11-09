import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function Budgets() {
    const [budgets, setBudgets] = useState([]);
    const { userId } = useParams();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchBudgets = async () => {
            try {
                const response = await fetch(`http://localhost:3000/api/budget/${userId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                });
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                setBudgets(data);
            } catch (error) {
                console.error('Error fetching budgets:', error);
            }
        };

        fetchBudgets();
    }, [userId]);

    const handleCreateBudget = () => {
        navigate(`/create-budget/${userId}`);
    };

    return (
        <div>
            <h2>Budgets</h2>
            <button onClick={handleCreateBudget}>Create New Budget</button>
            <ul>
                {budgets.map((budget) => (
                    <li key={budget.id}>
                        {budget.budget_name}: {budget.plan}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Budgets;