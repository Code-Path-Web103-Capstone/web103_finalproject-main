import React from "react";

function SubmitStatementButton({ text }) {
  return (
    <button type="submit" className="mt-4 rounded bg-green-500 p-2 text-white">
      {text}
    </button>
  );
}

export default SubmitStatementButton;
