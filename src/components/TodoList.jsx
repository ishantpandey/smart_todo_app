import React, { useState } from 'react';

const TodoItem = ({ todo, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);
  const [editCategory, setEditCategory] = useState(todo.category);
  const [editPriority, setEditPriority] = useState(todo.priority);

  const handleSave = () => {
    if (editText.trim()) {
      onEditTodo(todo.id, editText.trim(), editCategory, editPriority);
      setIsEditing(false);
    }
  };

  const handleCancel = () => {
    setEditText(todo.text);
    setEditCategory(todo.category);
    setEditPriority(todo.priority);
    setIsEditing(false);
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const categoryEmojis = {
    personal: '👤',
    work: '💼',
    health: '🏃‍♂️',
    shopping: '🛒',
    finance: '💰',
    education: '📚',
    travel: '✈️',
    other: '📝'
  };

  const categories = [
    { value: 'personal', label: '👤 Personal' },
    { value: 'work', label: '💼 Work' },
    { value: 'health', label: '🏃‍♂️ Health' },
    { value: 'shopping', label: '🛒 Shopping' },
    { value: 'finance', label: '💰 Finance' },
    { value: 'education', label: '📚 Education' },
    { value: 'travel', label: '✈️ Travel' },
    { value: 'other', label: '📝 Other' }
  ];

  const priorities = [
    { value: 'high', label: '🔴 High' },
    { value: 'medium', label: '🟡 Medium' },
    { value: 'low', label: '🟢 Low' }
  ];

  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <div className={`priority-indicator priority-${todo.priority}`}></div>
      
      <div
        className={`todo-checkbox ${todo.completed ? 'completed' : ''}`}
        onClick={() => onToggleTodo(todo.id)}
      >
      </div>

      <div className="todo-content">
        {isEditing ? (
          <div className="edit-form">
            <input
              type="text"
              className="edit-input"
              value={editText}
              onChange={(e) => setEditText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSave()}
              maxLength={200}
              autoFocus
            />
            <select
              className="edit-select"
              value={editCategory}
              onChange={(e) => setEditCategory(e.target.value)}
            >
              {categories.map(cat => (
                <option key={cat.value} value={cat.value}>
                  {cat.label}
                </option>
              ))}
            </select>
            <select
              className="edit-select"
              value={editPriority}
              onChange={(e) => setEditPriority(e.target.value)}
            >
              {priorities.map(pri => (
                <option key={pri.value} value={pri.value}>
                  {pri.label}
                </option>
              ))}
            </select>
            <button className="save-btn" onClick={handleSave}>
              💾 Save
            </button>
            <button className="cancel-btn" onClick={handleCancel}>
              ❌ Cancel
            </button>
          </div>
        ) : (
          <>
            <div className="todo-text">{todo.text}</div>
            <div className="todo-meta">
              <span className="category-tag">
                {categoryEmojis[todo.category]} {todo.category}
              </span>
              <span className={`priority-tag ${todo.priority}`}>
                {todo.priority}
              </span>
              <span>Created: {formatDate(todo.createdAt)}</span>
              {todo.completedAt && (
                <span>Completed: {formatDate(todo.completedAt)}</span>
              )}
            </div>
          </>
        )}
      </div>

      {!isEditing && (
        <div className="todo-actions">
          <button
            className="edit-btn"
            onClick={() => setIsEditing(true)}
            disabled={todo.completed}
          >
            ✏️ Edit
          </button>
          <button
            className="delete-btn"
            onClick={() => onDeleteTodo(todo.id)}
          >
            🗑️ Delete
          </button>
        </div>
      )}
    </div>
  );
};

const TodoList = ({ todos, onToggleTodo, onDeleteTodo, onEditTodo }) => {
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>🎉 All caught up!</h3>
        <p>No todos to display. Add some tasks to get started.</p>
      </div>
    );
  }

  return (
    <div className="todo-list">
      {todos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggleTodo={onToggleTodo}
          onDeleteTodo={onDeleteTodo}
          onEditTodo={onEditTodo}
        />
      ))}
    </div>
  );
};

export default TodoList;