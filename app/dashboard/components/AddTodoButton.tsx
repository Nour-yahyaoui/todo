'use client';
import { useState } from 'react';
import { Todo } from '../page';
import TodoForm from './TodoForm';

interface AddTodoButtonProps {
  userId: number;
  onTodoAdded: () => void;
}

export default function AddTodoButton({ userId, onTodoAdded }: AddTodoButtonProps) {
  const [showForm, setShowForm] = useState(false);

  const handleTodoAdded = (todo: Todo) => {
    onTodoAdded();
    setShowForm(false);
  };

  return (
    <>
      <button
        onClick={() => setShowForm(!showForm)}
        className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
        </svg>
        <span>{showForm ? 'Cancel' : 'Add Todo'}</span>
      </button>

      {showForm && (
        <div className="mt-4">
          <TodoForm
            userId={userId}
            onTodoAdded={handleTodoAdded}
            onClose={() => setShowForm(false)}
          />
        </div>
      )}
    </>
  );
}