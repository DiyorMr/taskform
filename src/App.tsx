import { useState } from 'react';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import { useLocalStorage } from './utils/useLocalStorage';
import type { Task } from './types';

function App() {
  const [tasks, setTasks] = useLocalStorage<Task[]>('tasks', []);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);

  const handleAddTask = (task: Task) => {
    setTasks([...tasks, task]);
  };

  const handleDeleteTask = (id: string) => {
    setTasks(tasks.filter((t) => t.id !== id));
  };

  const handleStatusChange = (id: string, status: Task['status']) => {
    const updated = tasks.map((t) =>
      t.id === id ? { ...t, status } : t
    );
    setTasks(updated);
  };

  const handleViewDetails = (task: Task) => {
    setSelectedTask(task);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black p-6">
      <div className="max-w-3xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-center text-indigo-700">📝 Manage tasks</h1>

        <TaskForm onAdd={handleAddTask} />

        <div className="mt-6">
          <h2 className="text-2xl font-bold mb-4  text-indigo-500">📋 List of tasks</h2>
          {tasks.length > 0 ? (
            <TaskList
              tasks={tasks}
              onDelete={handleDeleteTask}
              onStatusChange={handleStatusChange}
              onViewDetails={handleViewDetails}
            />
          ) : (
            <p className="text-gray-600">There are no tasks yet.</p>
          )}
        </div>

        {selectedTask && (
          <div className="p-4 bg-white rounded shadow">
            <h3 className="text-xl font-bold">📌 {selectedTask.title}</h3>
            <p className="text-gray-700 mt-1">{selectedTask.description}</p>
            <p className="text-sm text-gray-500 mt-1">
              📅 {new Date(selectedTask.datetime).toLocaleString()}
            </p>
            <p className="text-sm text-gray-500">📍 {selectedTask.location}</p>
            <p className="text-sm text-gray-500">🟢 State: {selectedTask.status}</p>
            <button
              onClick={() => setSelectedTask(null)}
              className="mt-4 text-sm text-blue-600 underline cursor-pointer"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
