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

  function addItem(todo: Todo) {
    todoItems.value.unshift(todo)
  }

  function deleteItem(index: number) {
    todoItems.value.splice(index, 1)
  }

  function updateItem(item: CurItem, index: number){
    todoItems.value[index].isComplete = item.isComplete
    todoItems.value[index].text = item.text
  }

  const completeItemsLength = computed(() => todoItems.value.filter(item => item.isComplete).length)

  return { 
    todoItems,
    completeItemsLength,
    addItem,
    deleteItem,
    updateItem
  }
})