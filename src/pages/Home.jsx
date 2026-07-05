import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useTasks } from '../hooks/useTasks';
import SearchBar from '../components/SearchBar/SearchBar';
import Filter from '../components/Filter/Filter';
import Pagination from '../components/Pagination/Pagination';
import TaskForm from '../components/TaskForm/TaskForm';
import TaskList from '../components/TaskList/TaskList';
import CalendarModal from '../components/CalendarModal/CalendarModal';
import './Home.css';

const Home = () => {
  const { isLightMode, toggleTheme } = useTheme();
  const {
    tasks,
    loading,
    error,
    filterStatus,
    currentPage,
    totalPages,
    editingTask,
    isFormOpen,
    setIsFormOpen,
    fetchTasks,
    handleSearch,
    handleFilterChange,
    handlePageChange,
    handleFormSubmit,
    handleDeleteTask,
    handleToggleStatus,
    handleEditSelect,
    handleCancelEditOrClose
  } = useTasks();

  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  // Dynamic stats for notifications
  const activeTasksCount = tasks.filter(t => !t.completed).length;
  const completedTasksCount = tasks.filter(t => t.completed).length;

  const notifications = [
    {
      id: 1,
      title: '📊 Tiến độ công việc',
      message: `Bạn đang có ${activeTasksCount} công việc chưa làm và ${completedTasksCount} công việc đã hoàn thành.`,
      type: 'info',
      createdAt: new Date().toISOString()
    },
    {
      id: 2,
      title: '💡 Mẹo năng suất',
      message: 'Hãy chia nhỏ công việc lớn thành các phần nhỏ hơn để hoàn thành dễ dàng hơn!',
      type: 'success',
      createdAt: new Date(Date.now() - 2 * 3600 * 1000).toISOString()
    },
    {
      id: 3,
      title: '⚠️ Nhắc nhở',
      message: 'Nhớ kiểm tra các công việc chi tiết trước khi kết thúc ngày hôm nay.',
      type: 'warning',
      createdAt: new Date(Date.now() - 5 * 3600 * 1000).toISOString()
    }
  ];

  const formatNotificationTime = (dateString) => {
    if (!dateString) return '';
    try {
      const date = new Date(dateString);
      return date.toLocaleTimeString('vi-VN', { hour: '2-digit', minute: '2-digit' }) + ' - ' + date.toLocaleDateString('vi-VN');
    } catch (e) {
      return dateString;
    }
  };

  return (
    <div className="home-container">
      <header className="home-header">
        <div className="header-actions">
          {/* Calendar Button */}
          <button className="header-action-btn calendar-btn" onClick={() => setIsCalendarOpen(true)} title="Lịch biểu">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </button>

          {/* Notification Button */}
          <div className="notification-wrapper">
            <button className="header-action-btn notification-btn" onClick={() => setIsNotificationOpen(!isNotificationOpen)} title="Thông báo">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="notification-badge"></span>
            </button>
            
            {/* Notification Dropdown Panel */}
            {isNotificationOpen && (
              <div className="notification-dropdown">
                <div className="notification-dropdown-header">
                  <h4>Thông báo</h4>
                  <button className="clear-notifications-btn" onClick={() => setIsNotificationOpen(false)}>Đóng</button>
                </div>
                <div className="notification-dropdown-body">
                  {notifications.map((notif) => (
                    <div key={notif.id} className={`notification-item notif-${notif.type}`}>
                      <div className="notif-title">{notif.title}</div>
                      <div className="notif-message">{notif.message}</div>
                      <div className="notif-time">{formatNotificationTime(notif.createdAt)}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Theme Toggle Button */}
          <button className="header-action-btn theme-toggle-btn" onClick={toggleTheme} title="Chuyển chế độ Sáng/Tối">
            {isLightMode ? (
              // Moon Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            ) : (
              // Sun Icon
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707m12.728 0l-.707-.707M6.343 6.364l-.707-.707M12 8a4 4 0 100 8 4 4 0 000-8z" />
              </svg>
            )}
          </button>
        </div>
        <h1 className="main-title">TodoWork</h1>
        <p className="subtitle">Quản lý công việc thông minh, tối ưu hiệu suất mỗi ngày</p>
      </header>

      <div className="dashboard-grid single-column">
        <div className="column-left">
          <div className="toolbar">
            <SearchBar onSearch={handleSearch} />
            <Filter currentFilter={filterStatus} onFilterChange={handleFilterChange} />
          </div>

          <TaskList
            tasks={tasks}
            loading={loading && tasks.length === 0}
            error={error}
            onDelete={handleDeleteTask}
            onEdit={handleEditSelect}
            onToggle={handleToggleStatus}
          />

          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </div>
      </div>

      {/* Floating Action Button (FAB) */}
      <div className="fab-container">
        <button className="fab-btn" onClick={() => setIsFormOpen(true)}>
          <span className="fab-icon">+</span>
        </button>
        <span className="fab-tooltip">Thêm công việc mới</span>
      </div>

      {/* Modal Overlay for TaskForm */}
      {isFormOpen && (
        <div className="modal-overlay" onClick={handleCancelEditOrClose}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <TaskForm
              onSubmit={handleFormSubmit}
              editingTask={editingTask}
              onCancelEdit={handleCancelEditOrClose}
            />
          </div>
        </div>
      )}

      {/* Calendar Modal */}
      {isCalendarOpen && (
        <CalendarModal
          onClose={() => setIsCalendarOpen(false)}
          onTaskAction={fetchTasks}
        />
      )}
    </div>
  );
};

export default Home;
