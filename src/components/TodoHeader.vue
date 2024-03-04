<template>
    {{ msg }}
    <div class="todo-header">
      <input type="text" v-model="newItem">
      <button type="button" @click="addItem">新增</button>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  
  export default defineComponent({
    name: 'TodoHeader',
    props: {
      msg: {
        type: String,
        require: true
      }
    },
    setup: () => {
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
      
      return {
        newItem,
        addItem,
      }
    }
  })
  </script>
  
  <style scoped>
  </style>
  