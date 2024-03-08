<template>
    <div class="todo-header margin">
      <input type="text" v-model="newItem" placeholder="輸入一條代辦事項"  class="fix-width">
      <button type="button" @click="addItem">新增</button>
    </div>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  import type { Todo } from '@/types/todo';
  
  const todoStore = useTodoStore()
  const newItem = ref<string>('')
  
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

  </script>
  
  <style scoped>
  .margin{
    margin: 10px 0px;
  }
  .fix-width{
    width: 200px;
  }
  </style>
  