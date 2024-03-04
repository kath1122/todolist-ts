import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo } from '../types/todo'

export const useTodoStore = defineStore('todo', () => {
  const todoItems = ref([
    {
      id: 1,
      text: 'item1-aaaa'
    }
  ] as Todo[])

  function addItem(todo: Todo) {
    todoItems.value.unshift(todo)
  }

  function deleteItem(index: number) {
    todoItems.value.splice(index, 1)
  }

  function updateItem(text: string, index: number){
    todoItems.value[index].text = text
  }

  return { 
    todoItems,
    addItem,
    deleteItem,
    updateItem
  }
})