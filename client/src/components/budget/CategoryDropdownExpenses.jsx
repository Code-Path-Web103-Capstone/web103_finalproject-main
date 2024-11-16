import React from "react";
import CreatableSelect from "react-select/creatable";

const CategoryDropdownExpenses = ({ value, onChange }) => {
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

    const customStyles = {
    menu: (provided) => ({
      ...provided,
      zIndex: 9999,
      position: 'absolute',
    }),
    menuPortal: (base) => ({
      ...base,
      zIndex: 9999,
    }),
  };

  return (
    <CreatableSelect
      value={options.find((option) => option.value === value) || { value, label: value }}
      onChange={handleChange}
      options={options}
      placeholder="Select or type category"
      isSearchable
      isClearable
      formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
      styles={customStyles}
      menuPortalTarget={document.body}
    />
  );
};

export default CategoryDropdownExpenses;
