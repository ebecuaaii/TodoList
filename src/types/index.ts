export interface Task {
  id: number;
  title: string;
  description?: string;
  completed: boolean;
  createdAt: string;
  updateAt: string;
}

export interface TaskRequestDto {
  title: string;
  description?: string;
  completed?: boolean;
}
