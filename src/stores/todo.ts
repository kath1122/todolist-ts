import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo } from '../types/todo'

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todoItems = ref<Todo[]>([
      { text: 'Learn Vue3', isComplete: true, id: 1 },
      { text: 'Learn TypeScript', isComplete: false, id: 2 },
      { text: 'Build an amazing TodoList', isComplete: false, id: 3},
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
      todoItems.value = todoItems.value.filter((item, idx) => item.id !== id)
    }

    function updateItem(item: Todo, id: number){
      todoItems.value[getItemIndex(id)].isComplete = item.isComplete
      todoItems.value[getItemIndex(id)].text = item.text
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
