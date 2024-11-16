import React from "react";
import CreatableSelect from "react-select/creatable";

const CategoryDropdownIncomes = ({ value, onChange }) => {
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

export default CategoryDropdownIncomes;