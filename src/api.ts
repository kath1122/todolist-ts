import request from "@/utils/request";
import type { Todo,TodoList } from '@/types/todo';

export function getAllTasks() {
  return request<TodoList>({
    url: "/tasks",
    method: "get",
  });
}

export function addNewTask(task: Todo) {
  return request({
    url: "/task",
    method: "post",
    data: task 
  });
}

export function putTaskItem(task: Todo, id: number) {
  return request({
    url: `/task/${id}`,
    method: "put",
    data: task 
  });
}

export function delTaskItem(id: number) {
  return request({
    url: `/task/${id}`,
    method: "delete"
  });
}