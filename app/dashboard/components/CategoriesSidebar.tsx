import { Todo } from '../page';

interface CategoriesSidebarProps {
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  todos: Todo[];
}

export default function CategoriesSidebar({ 
  categories, 
  selectedCategory, 
  onCategorySelect,
  todos
}: CategoriesSidebarProps) {
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <h2 className="text-base sm:text-lg font-semibold mb-3">Categories</h2>
      <div className="space-y-1">
        <button
          onClick={() => onCategorySelect('All')}
          className={`w-full text-left px-3 py-2 rounded text-sm ${selectedCategory === 'All' 
            ? 'bg-blue-50 text-blue-700 border border-blue-200' 
            : 'hover:bg-gray-50 text-gray-700'}`}
        >
          <div className="flex justify-between items-center">
            <span className="truncate">All Tasks</span>
            <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded whitespace-nowrap ml-2">
              {todos.length}
            </span>
          </div>
        </button>
        
        {categories.map(category => {
          const categoryCount = todos.filter(t => t.category === category).length;
          return (
            <button
              key={category}
              onClick={() => onCategorySelect(category)}
              className={`w-full text-left px-3 py-2 rounded text-sm ${selectedCategory === category 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'hover:bg-gray-50 text-gray-700'}`}
            >
              <div className="flex justify-between items-center">
                <span className="truncate">{category}</span>
                <span className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded whitespace-nowrap ml-2">
                  {categoryCount}
                </span>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}