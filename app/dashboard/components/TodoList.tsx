import { Todo } from '../page';
import TodoCard from './TodoCard';
import MobileCategorySelector from './MobileCategorySelector';
import MobileStats from './MobileStats';

interface TodoListProps {
  todos: Todo[];
  allTodos: Todo[];
  selectedCategory: string;
  categories: string[];
  onCategorySelect: (category: string) => void;
}

export default function TodoList({ 
  todos, 
  allTodos, 
  selectedCategory, 
  categories,
  onCategorySelect 
}: TodoListProps) {
  return (
    <>
      {/* Mobile Category Selection */}
      <div className="lg:hidden mb-4">
        <MobileCategorySelector
          selectedCategory={selectedCategory}
          categories={categories}
          todos={allTodos}
          onCategorySelect={onCategorySelect}
        />
      </div>

      {/* Todo List */}
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="px-4 py-3 sm:px-6 sm:py-4 border-b">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            <h2 className="text-base sm:text-lg font-semibold text-gray-900">
              {selectedCategory === 'All' ? 'All Tasks' : selectedCategory}
            </h2>
            <div className="flex items-center space-x-2">
              <span className="text-xs sm:text-sm text-gray-500">
                {todos.length} of {allTodos.length} tasks
              </span>
              <span className={`text-xs px-2 py-1 rounded-full ${selectedCategory === 'All' 
                ? 'bg-gray-100 text-gray-800' 
                : 'bg-blue-100 text-blue-800'}`}>
                {selectedCategory}
              </span>
            </div>
          </div>
        </div>
        
        <div className="p-3 sm:p-4 md:p-6">
          {todos.length === 0 ? (
            <EmptyState selectedCategory={selectedCategory} />
          ) : (
            <div className="space-y-3">
              {todos.map(todo => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Mobile Stats */}
      <div className="lg:hidden mt-4">
        <MobileStats todos={allTodos} />
      </div>
    </>
  );
}

function EmptyState({ selectedCategory }: { selectedCategory: string }) {
  return (
    <div className="text-center py-6 sm:py-8">
      <div className="text-gray-300 mb-3 sm:mb-4">
        <svg className="w-12 h-12 sm:w-16 sm:h-16 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      </div>
      <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-1">No tasks found</h3>
      <p className="text-gray-500 text-sm sm:text-base">
        {selectedCategory === 'All' 
          ? 'Start by creating your first task!' 
          : `No tasks in "${selectedCategory}" category`}
      </p>
    </div>
  );
}