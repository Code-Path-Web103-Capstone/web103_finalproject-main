import React from "react";
import { MdAddBox } from "react-icons/md";

function TableHeader({ title, setRows, handleAddRow }) {
  return (
    <div className="justify-left mb-1 flex items-center gap-1">
      <h2 className="font-manrope text-xl font-bold">{title}</h2>
      <MdAddBox
        className="text-2xl text-slate-500 hover:text-blue-600"
        type="button"
        onClick={() => handleAddRow(setRows)}
      />
    </div>
  );
}

export default TableHeader;
