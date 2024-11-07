import React, { useState } from "react";

const CreateBudget = () => {
  const [budget, setBudget] = useState({
    name: "",
    amount: "",
  });

  const handleChange = (e) => {
    setBudget({
      ...budget,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(budget);
  };

  return (
    <div>
      <h1>Create Budget</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          value={budget.name}
          onChange={handleChange}
        />
        <label htmlFor="amount">Amount</label>
        <input
          type="number"
          id="amount"
          name="amount"
          value={budget.amount}
          onChange={handleChange}
        />
        <button type="submit">Create Budget</button>
      </form>
    </div>
  );
};
export default CreateBudget;
