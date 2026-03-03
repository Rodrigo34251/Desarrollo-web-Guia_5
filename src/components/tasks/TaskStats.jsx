import { isOverdue } from '../../utils/dateHelpers';

export default function TaskStats({ tasks }) {
    const total = tasks.length;
    const completed = tasks.filter((t) => t.completed).length;
    const pending = total - completed;
    const overdue = tasks.filter((t) => isOverdue(t.dueDate, t.completed)).length;
    const percentage = total === 0 ? 0 : Math.round((completed / total) * 100);

    return (
    <div className="card mb-6">
        <h2 className="text-lg font-semibold mb-4"> Estadísticas </h2>

        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">

        <div className="bg-blue-50 rounded-lg p-4">
            <p className="text-sm text-blue-600 font-medium">Total</p>
            <p className="text-2xl font-bold text-blue-800">{total}</p>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
            <p className="text-sm text-green-600 font-medium">Completadas</p>
            <p className="text-2xl font-bold text-green-800">{completed}</p>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
            <p className="text-sm text-yellow-600 font-medium">Pendientes</p>
            <p className="text-2xl font-bold text-yellow-800">{pending}</p>
        </div>

        <div className="bg-red-50 rounded-lg p-4">
            <p className="text-sm text-red-600 font-medium">Vencidas</p>
            <p className="text-2xl font-bold text-red-800">{overdue}</p>
        </div>

        <div className="bg-purple-50 rounded-lg p-4">
            <p className="text-sm text-purple-600 font-medium">Completitud</p>
            <p className="text-2xl font-bold text-purple-800">{percentage}%</p>
        </div>

        </div>
    </div>
    );
}