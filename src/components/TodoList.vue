<template>
  <el-input
    class="mt-3.5"
    v-model="searchInputText"
    placeholder="Search a todo item."
  >
    <template #prepend>Search</template>
  </el-input>
  <div class="mt-3.5">
    <el-tabs v-model="currentTab">
      <el-tab-pane label="All Task" name="all">
        <div class="tab-content">
          <ul>
            <li v-for="(item, index) in searchResult" :key="`${item.id}${index}`">
              <TodoItem :item="item" :index="index"></TodoItem>
            </li>
          </ul>
          <div v-if="searchResult.length === 0">
            <p>No Data found</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="To Do" name="todo">
        <div class="tab-content">
          <ul>
            <li v-for="(item, index) in taskItems" :key="`${item.id}${index}`">
              <TodoItem :item="item" :index="index"></TodoItem>
            </li>
          </ul>
          <div v-if="taskItems.length === 0">
            <p>No Data found</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Done" name="done">
        <div class="tab-content">
          <ul>
            <li v-for="(item, index) in taskItems" :key="`${item.id}${index}`">
              <TodoItem :item="item" :index="index"></TodoItem>
            </li>
          </ul>
          <div v-if="taskItems.length === 0">
            <p>No Data found</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script setup lang="ts">
import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia';
import TodoItem from './TodoItem.vue'
import { computed, ref } from 'vue';

const searchInputText = ref<string>('')
const todoStore = useTodoStore()
const { todoItems } = storeToRefs(todoStore)
const currentTab = ref('all');

const searchResult = computed(() => {
  return todoItems.value.filter(task => task.text.toLowerCase().includes(searchInputText.value.toLowerCase()) );
})

const taskItems = computed(() => {
  return searchResult.value.filter(item => {
    if (currentTab.value === 'todo') {
      return !item.isComplete;
    } else if (currentTab.value === 'done') {
      return item.isComplete;
    } else {
      return true;
    }
  });
})
</script>
<style lang="postcss" scoped>
.tab-content {
  height: 300px;
  overflow-y: auto;
}
</style>