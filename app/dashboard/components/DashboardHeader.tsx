import { User } from '../page';

interface DashboardHeaderProps {
  user: User | null;
  todosCount: number;
  onLogout: () => void;
  onMenuToggle: () => void;
}

export default function DashboardHeader({ user, todosCount, onLogout, onMenuToggle }: DashboardHeaderProps) {
  return (
    <header className="bg-white shadow sticky top-0 z-30">
      <div className="max-w-7xl mx-auto px-4 py-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left side: Menu button + Title */}
          <div className="flex items-center space-x-3">
            <button
              onClick={onMenuToggle}
              className="lg:hidden p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            <div>
              <h1 className="text-lg sm:text-xl font-bold text-gray-900">Todo Dashboard</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Manage your tasks</p>
            </div>
          </div>

          {/* Right side: User info + Logout */}
          <div className="flex items-center space-x-3">
            <div className=" hidden sm:block text-right">
              <p className="text-sm font-medium text-gray-900">{user?.name}</p>
              <p className="text-xs text-gray-500">{todosCount} tasks</p>
            </div>
            <button
              onClick={onLogout}
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg text-sm transition-colors"
            >
              <span className="hidden sm:inline">Logout</span>
              <span className="sm:hidden">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                </svg>
              </span>
            </button>
          </div>
        </div>
        
       
      </div>
    </header>
  );
}