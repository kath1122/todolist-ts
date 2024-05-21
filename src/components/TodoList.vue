<template>
  <div class="px-4">
    <el-input
      v-model="searchInputText"
      placeholder="Search a todo item."
    >
      <template #prepend>Search</template>
    </el-input>
  </div>
  <div class="px-4">
    <el-tabs v-model="currentTab">
      <el-tab-pane label="All Task" name="all">
        <div class="tab-content">
          <ul>
            <li v-for="(item, index) in searchResult" :key="index">
              <TodoItem :item="item" :index="index"></TodoItem>
            </li>
          </ul>
          <div v-if="searchResult.length === 0">
            <p class="text-center">No Data found</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="To Do" name="todo">
        <div class="tab-content">
          <ul>
            <li v-for="(item, index) in taskItems" :key="`todo-${index}`">
              <TodoItem :item="item" :index="index"></TodoItem>
            </li>
          </ul>
          <div v-if="taskItems.length === 0">
            <p class="text-center">No Data found</p>
          </div>
        </div>
      </el-tab-pane>
      <el-tab-pane label="Done" name="done">
        <div class="tab-content">
          <ul>
            <li v-for="(item, index) in taskItems" :key="`done-${index}`">
              <TodoItem :item="item" :index="index"></TodoItem>
            </li>
          </ul>
          <div v-if="taskItems.length === 0">
            <p class="text-center">No Data found</p>
          </div>
        </div>
      </el-tab-pane>
    </el-tabs>

    <p class="text-center text-sm text-green-600">* task項目前有<el-icon color="red"><WarningFilled /></el-icon>符號 表示任務已過期</p>
  </div>
</template>

<script setup lang="ts">
import {
  getAllTasks
} from "@/api";

import { useTodoStore } from '../stores/todo'
import { storeToRefs } from 'pinia';
import TodoItem from './TodoItem.vue'
import { computed, onMounted, ref } from 'vue';
import {
  WarningFilled
} from '@element-plus/icons-vue'

interface Task {
  text: string;
  isComplete: boolean;
}
const searchInputText = ref<string>('')
const todoStore = useTodoStore()
const { todoItems } = storeToRefs(todoStore)
const currentTab = ref('all');
const allTaskList = ref<Task[]>([])
const allTaskCount = computed(() => todoItems.value.length);

const searchResult = computed(() => {
  return allTaskList.value && allTaskList.value.length > 0?allTaskList.value.filter(task => task.text && task.text.toLowerCase().includes(searchInputText.value.toLowerCase()) ): [];
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

const setTodoListHeight = () => {
  const navbarHeight = 64
  const addTodoHeight = 108
  const windowHeight = window.innerHeight;
  const searchInputHeight = 32;
  const totalCountHeight = 65;
  const tabHeight = 40;
  const todoListHeight = (windowHeight - navbarHeight - addTodoHeight - searchInputHeight - totalCountHeight - tabHeight-24)
  const tabContents = document.querySelectorAll('.tab-content');
  tabContents.forEach(tabContent => {
    (tabContent as HTMLElement).style.height = `${todoListHeight}px`;
  });
};
const getApi = () => {
  getAllTasks().then((response) => {
      if (response.data) {
        allTaskList.value = response.data.listing && response.data.listing.length > 0 ? response.data.listing : [];
      }
    });
}

onMounted(() => {
  getApi()
  setTodoListHeight();
  window.addEventListener('resize', setTodoListHeight);
})
</script>
<style lang="postcss" scoped>
.tab-content {
  overflow-y: auto;
}
</style>