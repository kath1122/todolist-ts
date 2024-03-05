<template>
  <div class="todo-list">
    <ul v-for="(item, index) in items" :key="item.id">
      <TodoItem :item="item" :index="index"></TodoItem>
    </ul>
  </div>
</template>

<script lang="ts">
// defineProps<{
//   msg: string
// }>()
import { defineComponent, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import TodoItem from './TodoItem.vue'

export default defineComponent({
  name: 'TodoList',
  components: {
    TodoItem
  },
  setup: () => {
    const todoStore = useTodoStore()
    const items = todoStore.todoItems
    
    return {
      items,
    }
  }
})
</script>

<style scoped>
</style>
