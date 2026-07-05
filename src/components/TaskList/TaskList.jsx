import React from 'react';
import TaskItem from '../TaskItem/TaskItem';
import './TaskList.css';

const TaskList = ({ tasks, loading, error, onDelete, onEdit, onToggle }) => {
  
  // 1. Loading State
  if (loading) {
    return (
      <div className="task-list-status">
        <div className="spinner"></div>
        <p className="status-text">Đang tải danh sách công việc...</p>
      </div>
    );
  }

  // 2. Error State
  if (error) {
    return (
      <div className="task-list-status error-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="status-icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
        <p className="status-text">{error}</p>
      </div>
    );
  }

  // 3. Empty State
  if (!tasks || tasks.length === 0) {
    return (
      <div className="task-list-status empty-state">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" className="status-icon">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
        </svg>
        <p className="status-text">Không tìm thấy công việc nào.</p>
      </div>
    );
  }

  // 4. Render Task List
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={onDelete}
          onEdit={onEdit}
          onToggle={onToggle}
        />
      ))}
    </div>
  );
};

export default TaskList;
