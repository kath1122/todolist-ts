<template>
    <div class="todo-header margin">
      <input type="text" v-model="newItem">
      <button type="button" @click="addItem">新增</button>
    </div>
    <hr>
  </template>
  
  <script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  
  const todoStore = useTodoStore()
  const newItem = ref('')
  
  const addItem = () => {
    if(!newItem.value.trim()) {
      console.log('請輸入值')
      return
    }
    const todo = {
      id: Date.now(),
      text: newItem.value
    }
    todoStore.addItem(todo)
    newItem.value = ''
  }

  </script>
  
  <style scoped>
  .margin{
    margin: 10px 0px;
  }
  </style>
  