export type TaskStatus = 'Progress' | 'Done' | 'Cancel';

export interface Task {
  id: string;
  title: string;
  description: string;
  datetime: string;
  location: string;
  status: TaskStatus;
}
