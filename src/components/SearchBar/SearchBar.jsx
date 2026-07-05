import React, { useState, useEffect } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [value, setValue] = useState('');

  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value);
    }, 450); // Debounce delay 450ms

    return () => {
      clearTimeout(handler);
    };
  }, [value, onSearch]);

  return (
    <div className="search-container">
      <input
        type="text"
        placeholder="Tìm kiếm công việc..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="search-input"
      />
      <svg className="search-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
      </svg>
    </div>
  );
};

export default SearchBar;
