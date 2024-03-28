<template>
  <div>
    <el-input class="max-w-[600px] w-52 rounded-l focus:border-green-500 focus:outline-none"
      type="text" 
      v-model="newItemInputText.text"
      placeholder="Enter a todo item.">
    </el-input>
    <el-date-picker
      v-model="newItemInputText.date"
      type="date"
      placeholder="Select date">
    </el-date-picker>
    <el-button class="px-4 py-2 bg-green-600 text-white mx-1 my-1.5 rounded cursor-pointer" @click="addItem">Submit</el-button>
  </div>
</template>

<script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  import type { Todo } from '@/types/todo';

  const todoStore = useTodoStore()
  const newItemInputText = ref<{ text: string; date: Date | null }>({
    text: '',
    date: null
  })


  const addItem = () => {
    if(!newItemInputText.value.text.trim()) {
      console.log('請輸入值')
      return
    }
    const todo: Todo = {
      id: Date.now(),
      text: newItemInputText.value.text,
      date: newItemInputText.value.date,
      isComplete: false,
      isShow: true
    }
    todoStore.addItem(todo)
    newItemInputText.value.text = ''
    newItemInputText.value.date = null
  }
</script>