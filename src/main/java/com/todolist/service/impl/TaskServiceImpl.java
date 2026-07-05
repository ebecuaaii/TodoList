package com.todolist.service.impl;

import java.time.LocalDateTime;

import org.springframework.stereotype.Service;

import com.todolist.dto.TaskRequestDto;
import com.todolist.entity.Task;
import com.todolist.exception.ResourceNotFoundException;
import com.todolist.repository.TaskRepository;
import com.todolist.service.TaskService;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;

@Service
@RequiredArgsConstructor
public class TaskServiceImpl implements TaskService {
    private final TaskRepository taskRepository;

    @Override
    public Page<Task> getAllTasks(String search, Boolean completed, Pageable pageable) {
        String searchParam = (search != null && !search.trim().isEmpty())
                ? "%" + search.trim().toLowerCase() + "%"
                : null;

        return taskRepository.findTasks(searchParam, completed, pageable);
    }

    @Override
    public Task getTaskById(Long id) {
        return taskRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Không tìm thấy công việc với ID" + id));
    }

    @Override
    public Task createTask(TaskRequestDto dto) {
        Task task = new Task();
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        task.setCompleted(dto.getCompleted() != null ? dto.getCompleted()
                : false);
        task.setCreatedAt(LocalDateTime.now());
        task.setUpdateAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public Task updateTask(Long id, TaskRequestDto dto) {
        Task task = getTaskById(id);
        task.setTitle(dto.getTitle());
        task.setDescription(dto.getDescription());
        if (dto.getCompleted() != null) {
            task.setCompleted(dto.getCompleted());
        }
        task.setUpdateAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(Long id) {
        Task task = getTaskById(id);
        taskRepository.delete(task);
    }

    @Override
    public Task toogleTaskStatus(Long id) {
        Task task = getTaskById(id);
        task.setCompleted(!task.isCompleted());
        task.setUpdateAt(LocalDateTime.now());
        return taskRepository.save(task);
    }

}
