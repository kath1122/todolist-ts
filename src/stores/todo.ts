import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo, CurItem } from '../types/todo'

export const useTodoStore = defineStore(
  'todo', 
  () => {
    const todoItems = ref<Todo[]>([])

    function getItemIndex(id: number){
      return todoItems.value.findIndex(function(todo){
          return todo.id === id;
        })
    }


    function addItem(todo: Todo) {
      todoItems.value.unshift(todo)
    }


    /**
     * TODO 可以直接filter掉就好了 => ok!
     */
    function deleteItem(id: number) {
      todoItems.value = todoItems.value.filter(item => item.id !== id)
    }

    /**
     * TODO 既然直接有index了 何不直接用他的index修改？ => ok!
     */
    function updateItem(item: CurItem, index: number){
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
