import type { Todo } from "@/types/todo";

export function saveTodos(todos:Todo){
    localStorage.setItem("todos", JSON.stringify(todos));
}

export function getTodosItems():Todo[] | null{
    // const todosJson = localStorage.getItem('todos')
    // if(todosJson !== null){
    //     return JSON.parse(todosJson)
    // } else {
    //     return null
    // }
    return JSON.parse(localStorage.getItem('todos')!)
}