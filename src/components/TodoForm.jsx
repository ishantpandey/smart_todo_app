import React, { useState } from 'react';

const TodoForm = ({ onAddTodo }) => {
  const [text, setText] = useState('');
  const [category, setCategory] = useState('personal');
  const [priority, setPriority] = useState('medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onAddTodo(text.trim(), category, priority);
      setText('');
      setCategory('personal');
      setPriority('medium');
    }
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
    <form className="todo-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <input
          type="text"
          className="form-input"
          placeholder="What needs to be done?"
          value={text}
          onChange={(e) => setText(e.target.value)}
          maxLength={200}
        />
        <select
          className="form-select"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          {categories.map(cat => (
            <option key={cat.value} value={cat.value}>
              {cat.label}
            </option>
          ))}
        </select>
        <select
          className="form-select"
          value={priority}
          onChange={(e) => setPriority(e.target.value)}
        >
          {priorities.map(pri => (
            <option key={pri.value} value={pri.value}>
              {pri.label}
            </option>
          ))}
        </select>
        <button type="submit" className="add-btn">
          ➕ Add Todo
        </button>
      </div>
    </form>
  );
};

export default TodoForm;