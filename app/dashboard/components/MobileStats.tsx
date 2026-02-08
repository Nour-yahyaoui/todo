import { Todo } from '../page';

interface MobileStatsProps {
  todos: Todo[];
}

export default function MobileStats({ todos }: MobileStatsProps) {
  return (
    <div className="grid grid-cols-3 gap-2">
      <div className="bg-white p-3 rounded-lg shadow text-center">
        <h3 className="text-xs font-medium text-gray-500">Total</h3>
        <p className="text-lg font-bold mt-1">{todos.length}</p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow text-center">
        <h3 className="text-xs font-medium text-gray-500">Done</h3>
        <p className="text-lg font-bold text-green-600 mt-1">
          {todos.filter(t => t.done).length}
        </p>
      </div>
      <div className="bg-white p-3 rounded-lg shadow text-center">
        <h3 className="text-xs font-medium text-gray-500">Pending</h3>
        <p className="text-lg font-bold text-yellow-600 mt-1">
          {todos.filter(t => !t.done).length}
        </p>
      </div>
    </div>
  );
}