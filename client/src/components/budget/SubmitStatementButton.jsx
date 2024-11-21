import React from "react";

function SubmitStatementButton({ text }) {
  return (
    <button
      type="submit"
      className="mt-4 rounded-lg border-2 bg-[#24B283] p-2 py-4 font-bold text-white transition-transform duration-200 hover:scale-[1.01]"
    >
      {text}
    </button>
  );
}

export default SubmitStatementButton;
