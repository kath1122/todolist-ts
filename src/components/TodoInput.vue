<template>
    <div>
      <input class="padding w-52 border border-gray-300 rounded-l focus:border-green-500 focus:outline-none" type="text" v-model="newItemInputText" placeholder="Enter a todo item.">
      <button class="padding bg-green-600 text-white mx-1 my-1.5 rounded cursor-pointer" type="button" @click="addItem">Submit</button>
    </div>
  </template>

  <script setup lang="ts">
  import { ref } from 'vue'
  import { useTodoStore } from '../stores/todo'
  import type { Todo } from '@/types/todo';

  const todoStore = useTodoStore()
  const newItemInputText = ref<string>('')

  const addItem = () => {
    if(!newItemInputText.value.trim()) {
      console.log('請輸入值')
      return
    }
    const todo: Todo = {
      id: Date.now(),
      text: newItemInputText.value,
      isComplete: false
    }
    todoStore.addItem(todo)
    newItemInputText.value = ''
  }
  </script>

<style lang="postcss" scoped>
.padding {
  @apply px-4 py-2;
}
</style>
