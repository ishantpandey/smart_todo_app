import React from 'react';

const TodoHeader = ({ darkMode, setDarkMode, searchQuery, setSearchQuery }) => {
  return (
    <header className="todo-header">
      <h1>✨ Beautiful Todo App</h1>
      <div className="header-controls">
        <div className="search-container">
          <input
            type="text"
            className="search-input"
            placeholder="Search todos or categories..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <button
          className="theme-toggle"
          onClick={() => setDarkMode(!darkMode)}
        >
          {darkMode ? '☀️ Light' : '🌙 Dark'}
        </button>
      </div>
    </header>
  );
};

export default TodoHeader;