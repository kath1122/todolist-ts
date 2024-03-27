<template>
  <el-input
    class="w-52 max-w-[600px]"
    v-model="searchInputText"
    placeholder="Search a todo item."
  >
    <template #prepend>Search</template>
  </el-input>
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
import { computed, ref, watch } from 'vue';

const searchInputText = ref<string>('')
const todoStore = useTodoStore()
const { todoItems } = storeToRefs(todoStore)
const isFilter = ref(false)

const searchResult = computed(() => {
  return todoItems.value.filter(task => task.text.toLowerCase().includes(searchInputText.value.toLowerCase()) );
})

watch(searchInputText, (newValue) => {
  if(!newValue){
    isFilter.value = false
  }
});

</script>
