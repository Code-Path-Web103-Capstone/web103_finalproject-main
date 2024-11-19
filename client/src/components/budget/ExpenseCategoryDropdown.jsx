import React from "react";
import CreatableSelect from "react-select/creatable";

const ExpenseCategoryDropdown = ({ value, onChange }) => {
  // Predefined options
  const options = [
    { value: "food", label: "Food" },
    { value: "gift", label: "Gift" },
    { value: "transportation", label: "Transportation" },
    { value: "personal", label: "Personal" },
    { value: "restaurant", label: "Restaurant" },
    { value: "travel", label: "Travel" },
    { value: "utilities", label: "Utilities" },
  ];

  const handleChange = (selectedOption) => {
    onChange(selectedOption ? selectedOption.value : "");
  };

  // Custom styles to match table cells
  const customStyles = {
    control: (provided) => ({
      ...provided,
      border: "1px solid #d1d5db", // Match table border
      borderRadius: "4px",
      padding: "2px", // Match table padding
      backgroundColor: "white", // Match table row background
      boxShadow: "none", // Remove default shadow
      height: "36px", // Match cell height
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
      color: "#9ca3af", // Subtle gray text for placeholder
    }),
    dropdownIndicator: (provided) => ({
      ...provided,
      padding: "4px", // Smaller dropdown indicator
    }),
    clearIndicator: (provided) => ({
      ...provided,
      padding: "4px", // Smaller clear indicator
    }),
    valueContainer: (provided) => ({
      ...provided,
      padding: "0 8px", // Smaller padding for selected value
    }),
  };

  return (
    <div className="expense-category-dropdown">
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

export default ExpenseCategoryDropdown;