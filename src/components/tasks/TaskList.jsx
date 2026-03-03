import { useState } from 'react';
import TaskCard from './TaskCard';
import TaskForm from './Taskform';

export default function TaskList({ tasks }) {
    const [showForm, setShowForm] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const openCreate = () => {
    setEditingTask(null);
    setShowForm(true);
    };

    const handleEdit = (task) => {
        setEditingTask(task);
        setShowForm(true);
    };

    const handleCloseForm = () => {
    setShowForm(false);
    setEditingTask(null);        
    };

    return (
    <div>

      {/* Header con contador y botón */}
        <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">
            Mis Tareas ({tasks.length})
        </h2>

        <button
            onClick={openCreate}
            className="btn-primary"
        >
            + Nueva Tarea
        </button>
        </div>

      {/* Formulario nueva tarea (condicional) */}
        {showForm && (
        <div className="mb-6">
            <TaskForm onClose={handleCloseForm} taskToEdit={editingTask} />
        </div>
        )}

      {/* Lista o mensaje vacío */}
        {tasks.length === 0 ? (
        <div className="card text-center py-12">
            <p className="text-gray-500 text-lg">
            No hay tareas para mostrar
            </p>
            <p className="text-gray-400 mt-2">
            Crea una nueva tarea para comenzar
            </p>
        </div>
        ) : (
        <div className="space-y-4">
            {tasks.map((task) => (
            <TaskCard
                key={task.id}
                task={task}
                onEdit={handleEdit}
            /> ))}
        </div>
        )}
    </div>
    );
}