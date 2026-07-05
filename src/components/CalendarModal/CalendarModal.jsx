import React, { useState, useEffect, useCallback } from 'react';
import { taskService } from '../../services/taskService';
import './CalendarModal.css';

const CalendarModal = ({ onClose, onTaskAction }) => {
  const [allTasks, setAllTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  // Calendar Navigation State
  const [currentDate, setCurrentDate] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Fetch all tasks for the calendar view (up to 100 tasks to cover the month)
  const fetchCalendarTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      const data = await taskService.getTasks('', null, 0, 100, 'createdAt', 'desc');
      setAllTasks(data.content || []);
    } catch (err) {
      console.error('Error fetching calendar tasks:', err);
      setError('Không thể tải dữ liệu lịch biểu.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCalendarTasks();
  }, [fetchCalendarTasks]);

  // Handlers for modifying tasks inside calendar modal
  const handleToggleTask = async (task) => {
    try {
      // Optimistic state update in calendar
      setAllTasks(prev => 
        prev.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t)
      );
      
      await taskService.toggleTaskStatus(task.id);
      fetchCalendarTasks();
      if (onTaskAction) onTaskAction(); // notify parent to refresh
    } catch (err) {
      console.error('Error toggling status:', err);
      fetchCalendarTasks();
    }
  };

  const handleDeleteTask = async (id) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) return;
    try {
      await taskService.deleteTask(id);
      fetchCalendarTasks();
      if (onTaskAction) onTaskAction(); // notify parent to refresh
    } catch (err) {
      console.error('Error deleting task:', err);
      alert('Không thể xóa công việc.');
    }
  };

  // Calendar logic helpers
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const daysInMonth = new Date(year, month + 1, 0).getDate();
  
  // Day of week of the 1st of the month (0 = Sun, 1 = Mon, ..., 6 = Sat)
  const firstDayIndex = new Date(year, month, 1).getDay();
  // Adjust so Monday is index 0:
  // (firstDayIndex + 6) % 7
  const startOffset = (firstDayIndex + 6) % 7;

  const handlePrevMonth = () => {
    setCurrentDate(new Date(year, month - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentDate(new Date(year, month + 1, 1));
  };

  const handleSelectDay = (day) => {
    setSelectedDate(new Date(year, month, day));
  };

  // Filter tasks created on a specific calendar day
  const getTasksForDay = useCallback((dateToCheck) => {
    return allTasks.filter(task => {
      if (!task.createdAt) return false;
      const taskDate = new Date(task.createdAt);
      return taskDate.getDate() === dateToCheck.getDate() &&
             taskDate.getMonth() === dateToCheck.getMonth() &&
             taskDate.getFullYear() === dateToCheck.getFullYear();
    });
  }, [allTasks]);

  // Selected date tasks
  const selectedDayTasks = getTasksForDay(selectedDate);

  // Month name translation
  const monthNames = [
    'Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6',
    'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'
  ];

  return (
    <div className="calendar-modal-overlay" onClick={onClose}>
      <div className="calendar-modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="calendar-modal-close" onClick={onClose} title="Đóng">
          &times;
        </button>

        <div className="calendar-layout">
          {/* Left Column: Monthly Calendar */}
          <div className="calendar-col-left">
            <div className="calendar-month-header">
              <button className="month-nav-btn" onClick={handlePrevMonth}>&larr;</button>
              <h3 className="calendar-month-title">
                {monthNames[month]} - {year}
              </h3>
              <button className="month-nav-btn" onClick={handleNextMonth}>&rarr;</button>
            </div>

            <div className="calendar-weekdays">
              <span>T2</span>
              <span>T3</span>
              <span>T4</span>
              <span>T5</span>
              <span>T6</span>
              <span>T7</span>
              <span>CN</span>
            </div>

            <div className="calendar-days-grid">
              {/* Padding offset cells */}
              {Array.from({ length: startOffset }).map((_, idx) => (
                <div key={`empty-${idx}`} className="calendar-day-cell empty"></div>
              ))}

              {/* Day cells */}
              {Array.from({ length: daysInMonth }).map((_, idx) => {
                const dayNum = idx + 1;
                const cellDate = new Date(year, month, dayNum);
                const isSelected = selectedDate.getDate() === dayNum &&
                                   selectedDate.getMonth() === month &&
                                   selectedDate.getFullYear() === year;
                const isToday = new Date().getDate() === dayNum &&
                                new Date().getMonth() === month &&
                                new Date().getFullYear() === year;
                
                const dayTasks = getTasksForDay(cellDate);
                const hasActive = dayTasks.some(t => !t.completed);
                const hasCompleted = dayTasks.some(t => t.completed);

                return (
                  <button
                    key={`day-${dayNum}`}
                    className={`calendar-day-cell ${isSelected ? 'selected' : ''} ${isToday ? 'today' : ''}`}
                    onClick={() => handleSelectDay(dayNum)}
                  >
                    <span className="day-number">{dayNum}</span>
                    <div className="day-indicators">
                      {hasActive && <span className="indicator-dot dot-active"></span>}
                      {hasCompleted && <span className="indicator-dot dot-completed"></span>}
                    </div>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Right Column: Selected Day Tasks list */}
          <div className="calendar-col-right">
            <h3 className="selected-day-title">
              📅 Công việc ngày {selectedDate.getDate()}/{selectedDate.getMonth() + 1}/{selectedDate.getFullYear()}
            </h3>

            {loading && allTasks.length === 0 ? (
              <p className="calendar-status-text">Đang tải công việc...</p>
            ) : error ? (
              <p className="calendar-status-text error">{error}</p>
            ) : selectedDayTasks.length === 0 ? (
              <div className="calendar-empty-state">
                <p>Không có công việc nào trong ngày này.</p>
              </div>
            ) : (
              <div className="calendar-tasks-list">
                {selectedDayTasks.map(task => (
                  <div key={task.id} className={`calendar-task-card ${task.completed ? 'completed' : ''}`}>
                    <label className="calendar-task-checkbox-wrapper">
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleToggleTask(task)}
                        className="calendar-task-checkbox"
                      />
                      <span className="calendar-task-checkmark"></span>
                    </label>

                    <div className="calendar-task-info">
                      <h4 className="calendar-task-title">{task.title}</h4>
                      {task.description && <p className="calendar-task-desc">{task.description}</p>}
                    </div>

                    <button className="calendar-task-delete-btn" onClick={() => handleDeleteTask(task.id)} title="Xóa">
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalendarModal;
