import { ref } from 'vue'
import { defineStore } from 'pinia'

import type { Todo, CurItem } from '../types/todo'
import { saveTodos, getTodosItems } from '@/utils/localStorageUtils'

export const useTodoStore = defineStore('todo', () => {
  const todoItems = ref<Todo[]>(getTodosItems()!)

  function getItemIndex(id: number){
    return todoItems.value.findIndex(function(todo){
        return todo.id === id;
      })
  }


  function addItem(todo: Todo) {
    todoItems.value.unshift(todo)
    /**
     * TODO saveTodos參數型別錯誤
     */
    saveTodos(todoItems.value)
  }


  /**
   * TODO 可以直接filter掉就好了
   */
  function deleteItem(id: number) {
    todoItems.value.splice(getItemIndex(id), 1)
    saveTodos(todoItems.value)
  }

  /**
   * TODO 既然直接有index了 何不直接用他的index修改？
   */
  function updateItem(item: CurItem, id: number){
    todoItems.value[getItemIndex(id)].isComplete = item.isComplete
    todoItems.value[getItemIndex(id)].text = item.text
    saveTodos(todoItems.value)
  }

  return {
    todoItems,
    addItem,
    deleteItem,
    updateItem
  }
})
