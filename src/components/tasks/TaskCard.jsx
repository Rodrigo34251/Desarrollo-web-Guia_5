import { Link } from 'react-router-dom';
import { updateTask, deleteTask } from '../../services/taskService';
import { CATEGORIES } from '../../utils/constants';
import { getDueDateLabel, isOverdue } from '../../utils/dateHelpers';
import { toast } from 'react-hot-toast';

export default function TaskCard({ task, onEdit }) {
    const category = CATEGORIES.find(c => c.id === task.category);

    const handleToggleComplete = async (e) => {
    e.preventDefault();

    await updateTask(task.id, {
        completed: !task.completed
    });
    };

    const handleDelete = async (e) => {
    e.preventDefault();

    const confirmDelete = window.confirm("Deseas eliminar esta tarea?");
    if (!confirmDelete) return;

    try {
        await deleteTask(task.id);
        toast.success("Se ha eliminado la tarea correctamente");
    } catch (error) {
        toast.error("Error al eliminar la tarea");
    }};

    const handleEdit = (e) => {
    e.preventDefault(); // evita que el Link navegue
    if (onEdit) onEdit(task);
    };

    const overdue = isOverdue(task.dueDate, task.completed);

    return (
    <Link to={`/tasks/${task.id}`} className="block">
        <div className={`card hover:shadow-lg transition-shadow ${task.completed ? 'opacity-60': ''} ${overdue ? 'border border-red-500': ''}`}>

        <h3 className="text-lg font-semibold text-gray-800"> {task.title} </h3>

        {task.description && (
            <p className="text-gray-600 mt-1">{task.description}</p>
        )}

        {category && (
            <span className={`inline-block mt-2 px-2 py-1 text-xs rounded bg-${category.color}-100 text-${category.color}-800`}>
            {category.label} </span>
        )}

        {task.dueDate && (
            <p className="text-sm text-gray-500 mt-2"> {getDueDateLabel(task.dueDate)} </p>
        )}

        <p className="text-sm mt-2"> Estado: {task.completed ? 'Completada' : 'Pendiente'}</p>

        <div className="flex gap-2 mt-3">
            <button onClick={handleToggleComplete} className="btn-secondary"> {task.completed ? 'Marcar pendiente' : 'Marcar completada'}</button>
            <button onClick={handleEdit} className="btn-secondary"> Editar </button>
            <button onClick={handleDelete} className="btn-secondary"> Eliminar </button>
        </div>
        </div>
    </Link>
    );
}