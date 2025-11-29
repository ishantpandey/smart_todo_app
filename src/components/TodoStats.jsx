import React from 'react';

const TodoStats = ({ todos, filter, setFilter, clearCompleted, markAllComplete }) => {
  const totalTodos = todos.length;
  const completedTodos = todos.filter(todo => todo.completed).length;
  const activeTodos = totalTodos - completedTodos;
  const completionRate = totalTodos > 0 ? Math.round((completedTodos / totalTodos) * 100) : 0;

  const filters = [
    { value: 'all', label: 'All' },
    { value: 'active', label: 'Active' },
    { value: 'completed', label: 'Completed' }
  ];

  return (
    <div className="todo-stats">
      <div className="stats-info">
        <div className="stat-item">
          <span className="stat-number">{totalTodos}</span>
          <span className="stat-label">Total</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{activeTodos}</span>
          <span className="stat-label">Active</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completedTodos}</span>
          <span className="stat-label">Completed</span>
        </div>
        <div className="stat-item">
          <span className="stat-number">{completionRate}%</span>
          <span className="stat-label">Progress</span>
        </div>
      </div>

      <div className="filter-buttons">
        {filters.map(filterOption => (
          <button
            key={filterOption.value}
            className={`filter-btn ${filter === filterOption.value ? 'active' : ''}`}
            onClick={() => setFilter(filterOption.value)}
          >
            {filterOption.label}
          </button>
        ))}
      </div>

      <div className="action-buttons">
        <button
          className="action-btn mark-all-btn"
          onClick={markAllComplete}
          disabled={totalTodos === 0}
          title={todos.every(todo => todo.completed) ? 'Mark all as incomplete' : 'Mark all as complete'}
        >
          {todos.every(todo => todo.completed) ? '↩️ Undo All' : '✅ Complete All'}
        </button>
        <button
          className="action-btn clear-btn"
          onClick={clearCompleted}
          disabled={completedTodos === 0}
        >
          🗑️ Clear Completed
        </button>
      </div>
    </div>
  );
};

export default TodoStats;