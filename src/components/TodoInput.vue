<template>
    <div>
      <!-- TODO 相同的css程式碼抽出來 -->
      <input class="w-52 border border-gray-300 px-4 py-2 rounded-l focus:border-green-500 focus:outline-none" type="text" v-model="searchInput" placeholder="Search a todo item.">
      <button class="bg-green-600 text-white mx-1 my-1.5 px-4 py-2 rounded cursor-pointer" type="button" @click="searchItem">Search</button>
    </div>
    <div>
      <input class="w-52 border border-gray-300 px-4 py-2 rounded-l focus:border-green-500 focus:outline-none" type="text" v-model="newItem" placeholder="Enter a todo item.">
      <button class="bg-green-600 text-white mx-1 my-1.5 px-4 py-2 rounded cursor-pointer" type="button" @click="addItem">Submit</button>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  import type { Todo } from '@/types/todo';

  const todoStore = useTodoStore()
  // TODO newItem的意義是一個輸入值 newItemInputText or InputText or newItemText will be better
  const newItem = ref<string>('')
  // TODO searchInput的意義是一個輸入值 searchInputText or  searchText or queryText will be better
  const searchInput = ref<string>('')

  const addItem = () => {
    if(!newItem.value.trim()) {
      console.log('請輸入值')
      return
    }
    const todo: Todo = {
      id: Date.now(),
      text: newItem.value,
      isComplete: false
    }
    todoStore.addItem(todo)
    newItem.value = ''
  }
  const searchItem = () => {
    // const term = searchInput.value.toLowerCase();
    // todoStore.todoItems = todoStore.todoItems.filter(task => task.text.toLowerCase().includes(term));
  }

  </script>
