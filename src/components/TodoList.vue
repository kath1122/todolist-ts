<template>
  <el-input
    class="w-52 max-w-[600px]"
    v-model="searchInputText"
    placeholder="Search a todo item."
  >
    <template #prepend>Search</template>
  </el-input>
  <div class="mt-3.5">
    <el-button :class="{ 'focus': currentButton === 'all' }" @click="showAllTodos">All Task</el-button>
    <el-button :class="{ 'focus': currentButton === 'todo' }" :icon="Warning" @click="clearCompletedTodos">To Do</el-button>
    <el-button :class="{ 'focus': currentButton === 'done' }" :icon="CircleCheckFilled" @click="showCompletedTodos">Done</el-button>
  </div>
  <div v-if="todoItems && todoItems.length">
    <ul v-for="(item, index) in searchResult" :key="`${item.id}${index}`">
      <TodoItem :item="item" :index="index" v-show="item.isShow"></TodoItem>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia';
import TodoItem from './TodoItem.vue'
import { computed, onMounted, ref } from 'vue';
import { Warning,CircleCheckFilled } from '@element-plus/icons-vue'

const searchInputText = ref<string>('')
const todoStore = useTodoStore()
const { todoItems, currentStatus } = storeToRefs(todoStore)
const currentButton = ref<string>('all');

const searchResult = computed(() => {
  return todoItems.value.filter(task => task.text.toLowerCase().includes(searchInputText.value.toLowerCase()) );
})

const clearCompletedTodos = () => {
  todoStore.switchStatus('todo')
  todoItems.value.forEach((item) => {
    item.isShow = !item.isComplete
  })
}

const showCompletedTodos = () => {
  todoStore.switchStatus('done')
  todoItems.value.forEach((item) => {
    item.isShow = item.isComplete
  })
}

const showAllTodos = () => {
  todoStore.switchStatus('all')
  todoItems.value.forEach((item) => {
    item.isShow = true
  })
}
onMounted(() => {
  currentButton.value = currentStatus.value;
});

</script>
<style lang="postcss" scoped>
.focus {
  background-color: #e6f7ff !important;
  border-color: #91d5ff !important;
}

.del-button {
  @apply bg-green-600 text-white mx-1 my-1.5 rounded;
}
</style>