import { Todo } from '../page';
import CategoriesSidebar from './CategoriesSidebar';
import StatsCard from './StatsCard';

interface MobileSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  categories: string[];
  selectedCategory: string;
  onCategorySelect: (category: string) => void;
  todos: Todo[];
}

export default function MobileSidebar({
  isOpen,
  onClose,
  categories,
  selectedCategory,
  onCategorySelect,
  todos
}: MobileSidebarProps) {
  return (
    <>
      {/* Overlay */}
      {isOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-20"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div className={`
        lg:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-20 transform transition-transform duration-300
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="p-4 border-b flex items-center justify-between">
          <h2 className="text-lg font-semibold">Menu</h2>
          <button
            onClick={onClose}
            className="p-1 rounded-md hover:bg-gray-100"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 overflow-y-auto h-[calc(100vh-4rem)] space-y-4">
          <CategoriesSidebar
            categories={categories}
            selectedCategory={selectedCategory}
            onCategorySelect={(cat) => {
              onCategorySelect(cat);
              onClose();
            }}
            todos={todos}
          />
          <StatsCard todos={todos} categories={categories} />
        </div>
      </div>
    </>
  );
}