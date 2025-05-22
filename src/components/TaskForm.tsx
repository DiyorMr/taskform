import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import type { Task } from '../types';
import { countries } from '../data/countries';

interface TaskFormProps {
    onAdd: (task: Task) => void;
}

export default function TaskForm({ onAdd }: TaskFormProps) {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [datetime, setDatetime] = useState('');
    const [location, setLocation] = useState('');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!title || !description || !datetime || !location) {
            alert('Please fill in all the fields');
            return;
        }

        const newTask: Task = {
            id: uuidv4(),
            title,
            description,
            datetime,
            location,
            status: 'Progress',
        };

        onAdd(newTask);

        setTitle('');
        setDescription('');
        setDatetime('');
        setLocation('');
    };

    return (
        <form
            onSubmit={handleSubmit}
            className="bg-white shadow-md rounded-xl p-6 space-y-6 max-w-lg mx-auto"
        >
            <h2 className="text-2xl font-bold text-indigo-700 text-center">Add New Task</h2>

            {/* Task Title */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                <input
                    type="text"
                    placeholder="Enter task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
            </div>

            {/* Task Description */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Task Description</label>
                <textarea
                    placeholder="Enter task description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 resize-none"
                    rows={4}
                />
            </div>

            {/* Date and Time */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Due Date and Time</label>
                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                <p className="text-xs text-gray-500 mt-1">Format: YYYY-MM-DDThh:mm</p>
            </div>

            {/* Location (Country select) */}
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location (Country)</label>
                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg bg-white text-gray-700 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                >
                    <option value="" disabled>
                        Select a country
                    </option>
                    {countries.map((country) => (
                        <option key={country} value={country}>
                            {country}
                        </option>
                    ))}
                </select>
            </div>

            {/* Submit Button */}
            <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition-colors cursor-pointer"
            >
                Add Task
            </button>
        </form>
    );
}
