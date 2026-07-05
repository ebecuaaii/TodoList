package com.todolist.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.todolist.dto.TaskRequestDto;
import com.todolist.entity.Task;

public interface TaskService {
    Page<Task> getAllTasks(String search, Boolean completed, Pageable pageable);

    Task getTaskById(Long id);

    Task createTask(TaskRequestDto dto);

    Task updateTask(Long id, TaskRequestDto dto);

    void deleteTask(Long id);

    Task toogleTaskStatus(Long id);
}
