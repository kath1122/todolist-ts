import { computed, ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo, CurItem } from '../types/todo'

export const useTodoStore = defineStore('todo', () => {
  const todoItems = ref<Todo[]>([
    {
      id: 1,
      text: 'TS',
      isComplete: false
    },
    {
      id: 2,
      text: 'Vue3',
      isComplete: false
    },
  ])

  function getItemIndex(id: number){
    return todoItems.value.findIndex(function(todo){
        return todo.id === id;
      })
  }

  function addItem(todo: Todo) {
    todoItems.value.unshift(todo)
  }

  function deleteItem(id: number) {
    todoItems.value.splice(getItemIndex(id), 1)
  }

  function updateItem(item: CurItem, id: number){
    todoItems.value[getItemIndex(id)].isComplete = item.isComplete
    todoItems.value[getItemIndex(id)].text = item.text
  }

  return { 
    todoItems,
    addItem,
    deleteItem,
    updateItem
  }
})