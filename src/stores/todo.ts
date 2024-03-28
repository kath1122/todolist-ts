import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo } from '../types/todo'

export const useTodoStore = defineStore(
  'todo',
  () => {
    const todoItems = ref<Todo[]>([])
    const currentStatus = ref<string>('all')

    function switchStatus(status: string) {
      currentStatus.value = status
    }

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
      currentStatus,
      switchStatus,
      addItem,
      deleteItem,
      updateItem
    }
  },
  {
    persist: {
      storage: localStorage,
      paths: ['todoItems', 'currentStatus'],
    },
  },
)
