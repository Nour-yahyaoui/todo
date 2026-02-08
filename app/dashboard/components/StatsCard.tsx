import { Todo } from '../page';

interface StatsCardProps {
  todos: Todo[];
  categories: string[];
}

export default function StatsCard({ todos, categories }: StatsCardProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-base sm:text-lg font-semibold mb-3">Stats</h2>
      <div className="space-y-2">
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Total Tasks</span>
          <span className="font-bold text-sm sm:text-base">{todos.length}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Completed</span>
          <span className="font-bold text-green-600 text-sm sm:text-base">
            {todos.filter(t => t.done).length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Pending</span>
          <span className="font-bold text-yellow-600 text-sm sm:text-base">
            {todos.filter(t => !t.done).length}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-gray-600 text-sm">Categories</span>
          <span className="font-bold text-sm sm:text-base">{categories.length}</span>
        </div>
      </div>
    </div>
  );
}