'use client';

import { useState } from 'react';
import { Trash2, Plus, Check } from 'lucide-react';

interface Todo {
  id: number;
  text: string;
  completed: boolean;
}

export default function Home() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [inputValue, setInputValue] = useState('');

  const addTodo = () => {
    if (inputValue.trim() === '') return;

    const newTodo: Todo = {
      id: Date.now(),
      text: inputValue,
      completed: false,
    };

    setTodos([...todos, newTodo]);
    setInputValue('');
  };

  const toggleTodo = (id: number) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id: number) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      addTodo();
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-purple-600 via-pink-500 to-orange-400">
      {/* Animated background circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-pink-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute top-40 left-40 w-80 h-80 bg-orange-400 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      {/* Glass morphism container */}
      <div className="relative w-full max-w-md">
        {/* Glass card */}
        <div className="backdrop-blur-lg bg-white/10 rounded-3xl shadow-2xl border border-white/20 p-8">
          <h1 className="text-4xl font-bold text-white mb-8 text-center drop-shadow-lg">
            📝 TODO リスト
          </h1>

          {/* Input section */}
          <div className="flex gap-2 mb-6">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="新しいタスクを入力..."
              className="flex-1 px-4 py-3 rounded-xl bg-white/20 backdrop-blur-md border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-white/50 transition-all"
            />
            <button
              onClick={addTodo}
              className="px-4 py-3 rounded-xl bg-white/30 backdrop-blur-md border border-white/40 text-white hover:bg-white/40 transition-all hover:scale-105 active:scale-95"
            >
              <Plus size={24} />
            </button>
          </div>

          {/* Todo list */}
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {todos.length === 0 ? (
              <p className="text-center text-white/60 py-8">
                タスクがありません
              </p>
            ) : (
              todos.map((todo) => (
                <div
                  key={todo.id}
                  className="group flex items-center gap-3 p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all"
                >
                  <button
                    onClick={() => toggleTodo(todo.id)}
                    className={`flex-shrink-0 w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${
                      todo.completed
                        ? 'bg-white/30 border-white/50'
                        : 'border-white/40 hover:border-white/60'
                    }`}
                  >
                    {todo.completed && <Check size={16} className="text-white" />}
                  </button>

                  <span
                    className={`flex-1 text-white transition-all ${
                      todo.completed
                        ? 'line-through opacity-60'
                        : ''
                    }`}
                  >
                    {todo.text}
                  </span>

                  <button
                    onClick={() => deleteTodo(todo.id)}
                    className="opacity-0 group-hover:opacity-100 p-2 rounded-lg hover:bg-red-500/30 text-white/80 hover:text-white transition-all"
                  >
                    <Trash2 size={18} />
                  </button>
                </div>
              ))
            )}
          </div>

          {/* Stats */}
          {todos.length > 0 && (
            <div className="mt-6 pt-4 border-t border-white/20 text-center">
              <p className="text-white/80 text-sm">
                完了: {todos.filter(t => t.completed).length} / 全体: {todos.length}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
