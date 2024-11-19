import React from "react";

function SubmitStatementButton({ text }) {
  return (
    <button
      type="submit"
      className="mt-4 rounded-lg bg-[#23C436] p-2 font-semibold text-white"
    >
      {text}
    </button>
  );
}

export default SubmitStatementButton;
