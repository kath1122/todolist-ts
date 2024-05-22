<template>
  <div class="mt-16 px-4">
    <el-input class="w-full"
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
  import type { Todo } from '@/types/todo';
  import {
    addNewTask
  } from "@/api";


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
      date: newItemInputText.value.date?.toString(),
      isComplete: false,
      isShow: true
    }
    addNewTask(todo).then(({ data }) => {
      alert(data.message)
    });
    newItemInputText.value.text = ''
    newItemInputText.value.date = null
  }
</script>