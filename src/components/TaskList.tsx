import type { Task } from '../types';

interface TaskListProps {
    tasks: Task[];
    onStatusChange: (id: string, status: Task['status']) => void;
    onDelete: (id: string) => void;
    onViewDetails: (task: Task) => void;
}

export default function TaskList({
    tasks,
    onStatusChange,
    onDelete,
    onViewDetails,
}: TaskListProps) {
    if (tasks.length === 0) {
        return (
            <div className="text-center text-gray-500 py-8">
                No tasks found.
            </div>
        );
    }

    return (
        <div className="space-y-4 mt-6  ">
            {tasks.map((task) => (
                <div
                    key={task.id}
                    className="bg-sky-200 shadow-md rounded-lg p-4 border border-gray-200 flex justify-between items-center "
                >
                    <div>
                        <h3 className="text-lg font-semibold text-gray-800">{task.title}</h3>
                        <p className="text-sm text-gray-600">{new Date(task.datetime).toLocaleString()}</p>
                        <p className="text-sm text-gray-600">Location: {task.location}</p>
                        <p className="text-sm text-gray-500">
                            Status:
                            <span className={`ml-2 font-semibold ${getStatusColor(task.status)}`}>
                                {task.status}
                            </span>
                        </p>
                    </div>

                    <div className="flex flex-col gap-2">
                        {task.status === 'Progress' && (
                            <>
                                <button
                                    onClick={() => onStatusChange(task.id, 'Completed')}
                                    className="bg-green-600 hover:bg-green-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                >
                                    Complete
                                </button>
                                <button
                                    onClick={() => onStatusChange(task.id, 'Cancelled')}
                                    className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                                >
                                    Cancel
                                </button>
                            </>
                        )}

                        <button
                            onClick={() => onViewDetails(task)}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                        >
                            View
                        </button>

                        <button
                            onClick={() => onDelete(task.id)}
                            className="bg-red-600 hover:bg-red-700 text-white px-3 py-1 rounded text-sm cursor-pointer"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            ))}
        </div>
    );
}

function getStatusColor(status: Task['status']) {
    switch (status) {
        case 'Completed':
            return 'text-green-600';
        case 'Cancelled':
            return 'text-red-600';
        case 'Progress':
        default:
            return 'text-yellow-600';
    }
}
