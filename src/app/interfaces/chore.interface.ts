import { Task } from './task.interface'

export interface Chore {
  id: number;
  child_id: number;
  complete: boolean;
  completeInUi: boolean;
  created_at: string;
  updated_at: string;
  url: string;
  task: Task;
  task_id: number;
  isUpdating: boolean;
}
