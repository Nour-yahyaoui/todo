import { Todo } from '../page';

interface TodoCardProps {
  todo: Todo;
}

export default function TodoCard({ todo }: TodoCardProps) {
  return (
    <div className={`border rounded-lg p-3 sm:p-4 ${todo.done ? 'bg-gray-50' : 'bg-white'}`}>
      <div className="flex justify-between items-start">
        <div className="flex-1 min-w-0">
          <div className="flex items-start">
            <div className={`mt-1 mr-2 flex-shrink-0 w-2 h-2 sm:w-3 sm:h-3 rounded-full ${todo.done ? 'bg-green-500' : 'bg-yellow-500'}`}></div>
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium text-sm sm:text-base truncate ${todo.done ? 'line-through text-gray-500' : 'text-gray-900'}`}>
                {todo.title}
              </h3>
              {todo.description && (
                <p className="text-gray-600 mt-1 text-xs sm:text-sm line-clamp-2">{todo.description}</p>
              )}
              <div className="flex flex-wrap gap-1 sm:gap-2 mt-2">
                {todo.category && (
                  <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full">
                    {todo.category}
                  </span>
                )}
                {todo.deadline && (
                  <span className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded-full">
                    📅 {new Date(todo.deadline).toLocaleDateString()}
                  </span>
                )}
                <span className={`text-xs px-2 py-1 rounded-full ${todo.done 
                  ? 'bg-green-100 text-green-800' 
                  : 'bg-yellow-100 text-yellow-800'}`}>
                  {todo.done ? 'Done' : 'Pending'}
                </span>
              </div>
            </div>
          </div>
        </div>
        <div className="flex-shrink-0 ml-2">
          <button className="text-gray-400 hover:text-blue-500 p-1">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}