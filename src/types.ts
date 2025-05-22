export interface Task {
  id: string;
  title: string;
  description: string;
  datetime: string;
  location: string;
  status: 'Progress' | 'Completed' | 'Cancelled';
}
