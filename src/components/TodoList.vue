<template>
  <div>
      <input class="padding w-52 border border-gray-300 rounded-l focus:border-green-500 focus:outline-none" type="text" v-model="searchInputText" placeholder="Search a todo item.">
      <button class="padding bg-green-600 text-white mx-1 my-1.5 rounded cursor-pointer" type="button" @click="searchItem">Search</button>
  </div>
  <div v-if="!isFilter && todoItems && todoItems.length">
    <ul v-for="(item, index) in todoItems" :key="`${item.id}${index}`">
      <TodoItem :item="item" :index="index"></TodoItem>
    </ul>
  </div>
  <div v-else>
    <ul v-for="(item, index) in filterItems" :key="`${item.id}${index}`">
      <TodoItem :item="item" :index="index"></TodoItem>
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
let filterItems = ref([])

const searchItem = () => {
  const term = searchInputText.value.toLowerCase();
  if(term){
    isFilter.value = true
  } else {
    isFilter.value = false
  }
  filterItems.value = todoStore.todoItems.filter(task => task.text.toLowerCase().includes(term));
}

watch(searchInputText, (newValue) => {
  if(!newValue){
    isFilter.value = false
  }
});

</script>

<style lang="postcss" scoped>
.padding {
  @apply px-4 py-2;
}
</style>
