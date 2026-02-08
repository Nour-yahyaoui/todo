'use client';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import DashboardHeader from './components/DashboardHeader';
import CategoriesSidebar from './components/CategoriesSidebar';
import StatsCard from './components/StatsCard';
import TodoList from './components/TodoList';
import MobileSidebar from './components/MobileSidebar';
import LoadingState from './components/LoadingState';
import ErrorState from './components/ErrorState';
import AddTodoButton from './components/AddTodoButton';

export interface User {
  id: number;
  name: string;
}

export interface Todo {
  id: number;
  user_id: number;
  title: string;
  description: string | null;
  category: string | null;
  deadline: string | null;
  done: boolean;
}

export default function Dashboard() {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [todos, setTodos] = useState<Todo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [categories, setCategories] = useState<string[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const checkAuthAndLoadData = async () => {
      try {
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        const isLoggedIn = localStorage.getItem('isLoggedIn');
        const userData = localStorage.getItem('user');
        
        if (!isLoggedIn || !userData) {
          router.push('/login');
          return;
        }
        
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        
        const response = await fetch(`/api/todos?userId=${parsedUser.id}`);
        
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(`API error: ${response.status} - ${errorData.error || 'Unknown error'}`);
        }
        
        const todosData = await response.json();
        setTodos(todosData);
        
        const categorySet = new Set<string>();
        todosData.forEach((todo: Todo) => {
          if (todo.category && todo.category.trim()) {
            categorySet.add(todo.category);
          }
        });
        
        setCategories(Array.from(categorySet));
        setLoading(false);
      } catch (err: any) {
        console.error('Error in dashboard:', err);
        setError(err.message || 'Failed to load data');
        setLoading(false);
      }
    };
    
    checkAuthAndLoadData();
  }, [router, refreshKey]);

  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    document.cookie = 'user=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    window.location.href = '/login';
  };

  const handleTodosChange = () => {
    setRefreshKey(prev => prev + 1);
  };

  const filteredTodos = selectedCategory === 'All' 
    ? todos 
    : todos.filter(todo => todo.category === selectedCategory);

  if (loading) {
    return <LoadingState />;
  }

  if (error) {
    return <ErrorState error={error} onRetry={() => window.location.reload()} onLogout={handleLogout} />;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <DashboardHeader 
        user={user}
        todosCount={todos.length}
        onLogout={handleLogout}
        onMenuToggle={() => setIsSidebarOpen(!isSidebarOpen)}
      />

      <MobileSidebar
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
        categories={categories}
        selectedCategory={selectedCategory}
        onCategorySelect={setSelectedCategory}
        todos={todos}
      />

      <main className="max-w-7xl mx-auto px-4 py-4 sm:py-6 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-4 sm:gap-6 mt-4 sm:mt-0">
          {/* Sidebar for Desktop */}
          <div className="hidden lg:block lg:w-1/4 space-y-4">
            <CategoriesSidebar
              categories={categories}
              selectedCategory={selectedCategory}
              onCategorySelect={setSelectedCategory}
              todos={todos}
            />
            <StatsCard todos={todos} categories={categories} />
          </div>

          {/* Main Content */}
          <div className="w-full lg:w-3/4">
            {/* Add Todo Button */}
            <div className="mb-6">
              <AddTodoButton 
                userId={user?.id || 0} 
                onTodoAdded={handleTodosChange}
              />
            </div>

            {/* Todo List - WITHOUT userId prop if TodoList doesn't need it */}
            <TodoList
              todos={filteredTodos}
              allTodos={todos}
              selectedCategory={selectedCategory}
              categories={categories}
              onCategorySelect={setSelectedCategory}
            />
          </div>
        </div>
      </main>
    </div>
  );
}