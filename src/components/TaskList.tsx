import type { Task } from "../types";

interface TaskListProps {
    tasks: Task[];
    onDelete: (id: string) => void;
    onStatusChange: (id: string, status: Task['status']) => void;
    onSelect: (task: Task) => void;
}

export default function TaskList({ tasks, onDelete, onStatusChange, onSelect }: TaskListProps) {
    return (
        <div className="space-y-4">
            {tasks.map((task) => (
                <div key={task.id} className="bg-white p-4 rounded shadow-md">
                    <div className="flex justify-between items-center">
                        <div>
                            <h3 className="text-lg font-bold">{task.title}</h3>
                            <p className="text-sm text-gray-600">{task.datetime}</p>
                            <p className="text-sm text-gray-600">State: {task.status}</p>
                        </div>
                        <div className="space-x-2 flex items-center">
                            <select
                                value={task.status}
                                onChange={(e) => onStatusChange(task.id, e.target.value as Task['status'])}
                                className="p-1 border rounded cursor-pointer"
                            >
                                <option value="progress">Progress</option>
                                <option value="Done">Done</option>
                                <option value="Canceled">Canceled</option>
                            </select>

                            <button
                                onClick={() => onSelect(task)}
                                className="bg-blue-500 text-white px-2 py-1 rounded hover:bg-blue-600 cursor-pointer"
                            >
                                More details
                            </button>

                            <button
                                onClick={() => onDelete(task.id)}
                                className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600 cursor-pointer"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
