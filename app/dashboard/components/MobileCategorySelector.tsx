import { Todo } from '../page';

interface MobileCategorySelectorProps {
  selectedCategory: string;
  categories: string[];
  todos: Todo[];
  onCategorySelect: (category: string) => void;
}

export default function MobileCategorySelector({
  selectedCategory,
  categories,
  todos,
  onCategorySelect
}: MobileCategorySelectorProps) {
  return (
    <div className="bg-white rounded-lg shadow p-3 mt-16"> {/* Changed pt-20 to mt-16 */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="font-medium text-sm">Filter by Category</h3>
        <span className="text-xs text-gray-500">
          {todos.filter(t => selectedCategory === 'All' ? true : t.category === selectedCategory).length} tasks
        </span>
      </div>
      <select
        value={selectedCategory}
        onChange={(e) => onCategorySelect(e.target.value)}
        className="w-full border border-gray-300 rounded-lg p-2 text-sm focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
      >
        <option value="All">All Tasks ({todos.length})</option>
        {categories.map(category => (
          <option key={category} value={category}>
            {category} ({todos.filter(t => t.category === category).length})
          </option>
        ))}
      </select>
    </div>
  );
}