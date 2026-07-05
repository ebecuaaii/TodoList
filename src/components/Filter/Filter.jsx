import React from 'react';
import './Filter.css';

const Filter = ({ currentFilter, onFilterChange }) => {
  const options = [
    { label: 'Tất cả', value: 'ALL' },
    { label: 'Đang làm', value: 'ACTIVE' },
    { label: 'Hoàn thành', value: 'COMPLETED' }
  ];

  return (
    <div className="filter-container">
      {options.map((option) => (
        <button
          key={option.value}
          className={`filter-btn filter-btn-${option.value.toLowerCase()} ${currentFilter === option.value ? 'active' : ''}`}
          onClick={() => onFilterChange(option.value)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
};

export default Filter;
