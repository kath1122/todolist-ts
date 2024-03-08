import type { Todo } from "@/types/todo";

export function saveTodos(todos:Todo){
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodosItems(): Todo[] {
    const data = localStorage.getItem('todos');
    return data ? JSON.parse(data) : [];
}