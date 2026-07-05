import { useState, useEffect, useCallback } from 'react';
import { taskService } from '../services/taskService';
import { Task, TaskRequestDto } from '../types';

export const useTasks = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>('');
  const [search, setSearch] = useState<string>('');
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);

  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [isFormOpen, setIsFormOpen] = useState<boolean>(false);

  const fetchTasks = useCallback(async () => {
    setLoading(true);
    setError('');
    try {
      let completedParam: boolean | null = null;
      if (filterStatus === 'ACTIVE') completedParam = false;
      if (filterStatus === 'COMPLETED') completedParam = true;

      const data = await taskService.getTasks(
        search,
        completedParam,
        currentPage,
        5,
        'createdAt',
        'desc'
      );

      setTasks(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error('Error fetching tasks:', err);
      setError('Không thể tải danh sách công việc. Vui lòng thử lại sau.');
    } finally {
      setLoading(false);
    }
  }, [search, filterStatus, currentPage]);

  useEffect(() => {
    fetchTasks();
  }, [fetchTasks]);

  const handleSearch = useCallback((value: string) => {
    setSearch(value);
    setCurrentPage(0);
  }, []);

  const handleFilterChange = useCallback((value: string) => {
    setFilterStatus(value);
    setCurrentPage(0);
  }, []);

  const handlePageChange = useCallback((page: number) => {
    setCurrentPage(page);
  }, []);

  const handleCreateTask = async (taskData: TaskRequestDto) => {
    setLoading(true);
    try {
      await taskService.createTask(taskData);
      setIsFormOpen(false);
      fetchTasks();
    } catch (err) {
      console.error('Error creating task:', err);
      setError('Lỗi khi thêm công việc mới.');
      setLoading(false);
    }
  };

  const handleUpdateTask = async (taskData: TaskRequestDto) => {
    if (!editingTask) return;
    setLoading(true);
    try {
      await taskService.updateTask(editingTask.id, taskData);
      setEditingTask(null);
      setIsFormOpen(false);
      fetchTasks();
    } catch (err) {
      console.error('Error updating task:', err);
      setError('Lỗi khi cập nhật công việc.');
      setLoading(false);
    }
  };

  const handleFormSubmit = (taskData: TaskRequestDto) => {
    if (editingTask) {
      handleUpdateTask(taskData);
    } else {
      handleCreateTask(taskData);
    }
  };

  const handleDeleteTask = async (id: number) => {
    if (!window.confirm('Bạn có chắc chắn muốn xóa công việc này?')) return;
    setLoading(true);
    try {
      await taskService.deleteTask(id);
      if (tasks.length === 1 && currentPage > 0) {
        setCurrentPage((prev) => prev - 1);
      } else {
        fetchTasks();
      }
    } catch (err) {
      console.error('Error deleting task:', err);
      setError('Lỗi khi xóa công việc.');
      setLoading(false);
    }
  };

  const handleToggleStatus = async (id: number) => {
    try {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === id ? { ...t, completed: !t.completed } : t))
      );
      await taskService.toggleTaskStatus(id);
      const completedParam = filterStatus === 'ACTIVE' ? false : (filterStatus === 'COMPLETED' ? true : null);
      const data = await taskService.getTasks(search, completedParam, currentPage, 5, 'createdAt', 'desc');
      setTasks(data.content || []);
      setTotalPages(data.totalPages || 0);
    } catch (err) {
      console.error('Error toggling status:', err);
      setError('Lỗi khi cập nhật trạng thái công việc.');
      fetchTasks();
    }
  };

  const handleEditSelect = (task: Task) => {
    setEditingTask(task);
    setIsFormOpen(true);
  };

  const handleCancelEditOrClose = () => {
    setEditingTask(null);
    setIsFormOpen(false);
  };

  return {
    tasks,
    loading,
    error,
    search,
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
  };
};
