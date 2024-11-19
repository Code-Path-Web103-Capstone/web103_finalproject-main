import React from "react";
import CreatableSelect from "react-select/creatable";

const IncomeCategoryDropdown = ({ value, onChange }) => {
  // Predefined options
  const options = [
    { value: "salary", label: "Salary" },
    { value: "bonus", label: "Bonus" },
    { value: "investment", label: "Investment" },
    { value: "gift", label: "Gift" },
  ];

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : "");
  };

  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #d1d5db",
      borderRadius: "4px",
      padding: "2px",
      backgroundColor: "white",
      boxShadow: "none",
      height: "36px",
      width: "160px",
    }),
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
    placeholder: (provided) => ({
      ...provided,
      color: "#9ca3af",
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "4px",
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "4px",
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px",
    }),
  };

  return (
    <div className="income-category-dropdown">
      <CreatableSelect
        value={
          options.find((option) => option.value === value) || {
            value,
            label: value,
          }
        }
        onChange={handleChange}
        options={options}
        placeholder="Select or type category"
        isSearchable
        isClearable
        formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
        styles={customStyles}
        menuPortalTarget={document.body}
      />
    </div>
  );
};

export default IncomeCategoryDropdown;