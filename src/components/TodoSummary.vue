<template>
  <div class="inline-flex w-52 items-center">
    <span class="text-green-600 font-bold">Completed: {{ completedCount }}</span> /
    <span class="font-bold">Total: {{ total }}</span>
  </div>
  <el-button class="del-button" type="button" :disabled="completedCount == 0" @click="clearCompletedTodos">Clear Task completed</el-button>
  <el-button class="del-button" type="button" :class="{ 'checked': isChecked }" @click="checkAll">Checked ALL</el-button>
</template>

  <script setup lang="ts">
  import { computed, ref } from 'vue';
  import { useTodoStore } from '../stores/todo'

  const isChecked = ref(false)
  const completedCount = computed(() => {
    const items = useTodoStore().todoItems
    return items ? items.filter(item => item && item.isComplete).length : 0;
  })
  const total = computed(() => {
    const items = useTodoStore().todoItems
    return items? items.length : 0
  })

  const clearCompletedTodos = () => {
    useTodoStore().todoItems = useTodoStore().todoItems.filter(item => !item.isComplete)
  }

  const checkAll = () => {
    isChecked.value = !isChecked.value;
    const items = useTodoStore().todoItems
    items.forEach(item => {
      item.isComplete = isChecked.value? false : true
    })
  }

  </script>

<style lang="postcss" scoped>
.del-button {
  @apply bg-red-400 text-white mx-1 my-1.5 rounded;
}
</style>
