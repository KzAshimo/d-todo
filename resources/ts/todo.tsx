// src/TodoList.tsx
import React, { useState, useEffect } from 'react';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [newTodo, setNewTodo] = useState<string>('');

    useEffect(() => {
        // タスク一覧の取得
        const fetchTodos = async () => {
            const response = await fetch('http://localhost/api/todos');
            const data = await response.json();
            setTodos(data);
        };

        fetchTodos();
    }, []);

    const handleAddTodo = async () => {
        if (newTodo.trim() === '') return;

        const response = await fetch('http://localhost/api/todos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ title: newTodo }),
        });

        const addedTodo = await response.json();
        setTodos([...todos, addedTodo]);
        setNewTodo('');
    };

    const handleToggleComplete = async (id: number, completed: boolean) => {
        const response = await fetch(`http://localhost/api/todos/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ completed: !completed }),
        });

        const updatedTodo = await response.json();
        setTodos(todos.map(todo => (todo.id === id ? updatedTodo : todo)));
    };

    const handleDeleteTodo = async (id: number) => {
        await fetch(`http://localhost/api/todos/${id}`, {
            method: 'DELETE',
        });

        setTodos(todos.filter(todo => todo.id !== id));
    };

    return (
        <div>
            <h1>Todo List</h1>

            <input
                type="text"
                value={newTodo}
                onChange={(e) => setNewTodo(e.target.value)}
                placeholder="新しいタスクを入力"
            />
            <button onClick={handleAddTodo}>タスクを追加</button>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => handleToggleComplete(todo.id, todo.completed)}
                        />
                        {todo.title}
                        <button onClick={() => handleDeleteTodo(todo.id)}>削除</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoList;
