import React, { useState, useEffect } from 'react';
import './TaskForm.css';

const TaskForm = ({ onSubmit, editingTask, onCancelEdit }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [error, setError] = useState('');

  // Populate form fields if editing a task
  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description || '');
      setError('');
    } else {
      setTitle('');
      setDescription('');
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Validation check
    if (!title.trim()) {
      setError('Tiêu đề công việc không được để trống');
      return;
    }

    onSubmit({
      title: title.trim(),
      description: description.trim()
    });

    // Reset input fields if not in editing mode
    if (!editingTask) {
      setTitle('');
      setDescription('');
    }
    setError('');
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <h3 className="form-title">
        {editingTask ? (
          <>
            <span className="title-icon icon-edit">📝</span> Chỉnh sửa công việc
          </>
        ) : (
          <>
            <span className="title-icon icon-create">+</span> Thêm công việc mới
          </>
        )}
      </h3>
      
      <div className="form-group">
        <label htmlFor="task-title" className="form-label">Tiêu đề *</label>
        <input
          type="text"
          id="task-title"
          placeholder="Ví dụ: Học lập trình Spring Boot"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            if (e.target.value.trim()) setError('');
          }}
          className={`form-input ${error ? 'input-error' : ''}`}
        />
        {error && <span className="error-message">{error}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="task-desc" className="form-label">Mô tả chi tiết</label>
        <textarea
          id="task-desc"
          placeholder="Nhập nội dung mô tả chi tiết công việc..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="form-textarea"
          rows={3}
        />
      </div>

      <div className="form-actions">
        {editingTask && (
          <button type="button" className="btn btn-secondary" onClick={onCancelEdit}>
            Hủy
          </button>
        )}
        <button type="submit" className={`btn ${editingTask ? 'btn-edit' : 'btn-create'}`}>
          {editingTask ? 'Lưu thay đổi' : 'Thêm công việc'}
        </button>
      </div>
    </form>
  );
};

export default TaskForm;
