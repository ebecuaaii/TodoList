package com.todolist.repository;

import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Page;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;
import com.todolist.entity.Task;

@Repository
public interface TaskRepository extends JpaRepository<Task, Long> {
    @Query("SELECT t FROM Task t WHERE " +
            "(:search IS NULL OR LOWER(t.title) LIKE :search OR LOWER(t.description) LIKE :search) AND " +
            "(:completed IS NULL OR t.completed = :completed)")
    Page<Task> findTasks(@Param("search") String search,
            @Param("completed") Boolean completed,
            Pageable pageable);
}
