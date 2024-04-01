import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo } from '../types/todo'

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todoItems = ref<Todo[]>([
      { text: 'Learn Vue3', isComplete: true },
      { text: 'Learn TypeScript', isComplete: false },
      { text: 'Build an amazing TodoList', isComplete: false },
    ])
    
    function addItem(todo: Todo) {
      todoItems.value.unshift(todo)
    }

    function deleteItem(index: number) {
      todoItems.value = todoItems.value.filter((item, idx) => idx !== index)
    }

    function updateItem(item: Todo, index: number){
      todoItems.value[index].isComplete = item.isComplete
      todoItems.value[index].text = item.text
    }

    return {
      todoItems,
      addItem,
      deleteItem,
      updateItem
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['todoItems'],
    },
  },
)
