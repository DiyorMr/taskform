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
            alert('Please fill in all fields');
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

        // Reset form fields
        setTitle('');
        setDescription('');
        setDatetime('');
        setLocation('');
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-black via-blue-900 to-black flex items-center justify-center p-4">
            <form
                onSubmit={handleSubmit}
                className="bg-white/10 backdrop-blur-md border border-white/20 shadow-xl rounded-2xl p-6 w-full max-w-lg space-y-5"
            >
                <h2 className="text-2xl font-bold text-white text-center">Add New Task</h2>

                <input
                    type="text"
                    placeholder="Task Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <textarea
                    placeholder="Task Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <input
                    type="datetime-local"
                    value={datetime}
                    onChange={(e) => setDatetime(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/20 text-white border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full p-3 rounded-lg bg-white/20 text-white placeholder-white/70 border border-white/30 focus:outline-none focus:ring-2 focus:ring-blue-500"

                >
                    <option value="" disabled>
                        Select a country
                    </option>
                    {countries.map((country) => (
                        <option key={country} value={country} className='focus:outline-none focus:ring-2 focus:ring-blue-400 bg-blue-500'>
                            {country}
                        </option>
                    ))}
                </select>

                <button
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-300 cursor-pointer"
                >
                    Add Task
                </button>
            </form>
        </div>
    );
}
