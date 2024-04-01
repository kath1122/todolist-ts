<template>
  <div class="inline-flex items-center justify-between">
    <input class="form-checkbox text-green-500 h-5 w-4" type="checkbox" :checked="props.item.isComplete" @change="switchCompleteStatus">
    <!-- 任務名稱 -->
    <div class="inline-flex items-center w-40">
      <span class="w-full my-1.5 px-4 py-1.5" :class="{'text-gray-400': editData.isComplete }" v-show="!isEdit" @click="editItem">{{props.item?.text}}</span>
      <el-input ref="inputRef" :class="{'w-60': isEdit, 'flex-grow': !isEdit}"
        v-show="isEdit" 
        type="text" 
        v-model="editData.text"
        @keyup.enter ="saveItem"
        @blur="saveItem">
      </el-input>
    </div>
    <el-tag type="danger" v-if="isExpired">expired</el-tag>
    <el-button class="bg-red-400 float-right" :icon="Delete" type="danger" @click="deleteItem">delete</el-button>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import { useTodoStore } from '../stores/todo'
import type { Todo } from '@/types/todo';
// TODO: tsconfig 加了compilerOptions還是有紅字
import { ElMessageBox } from "element-plus";
import {
  Delete
} from '@element-plus/icons-vue'


const props = defineProps({
  item: {
      type: Object as () => Todo,
      required: true
  },
  index: {
      type: Number,
      required: true
  }
})

const isEdit = ref(false)
const todoStore = useTodoStore()
const isComplete = ref<boolean>(props.item.isComplete)
const editData = ref<Todo>({text: '', isComplete: isComplete.value})
const expirationDate = new Date();
const inputRef = ref<HTMLInputElement | null>(null); 

const isExpired = computed(() => {
  if (!props.item.date) return false;
  const createdDate = new Date(props.item.date);
  return createdDate < expirationDate;
});

const deleteItem = () => {
  ElMessageBox.confirm(`确定删除吗？`, "删除操作", {
    confirmButtonText: "删除",
    cancelButtonText: "取消",
    type: "warning",
  }).then(() => {
    todoStore.deleteItem(props.index)
  });
}
const editItem = () => {
  isEdit.value = true
  editData.value.text = props.item.text
  editData.value.isComplete = props.item.isComplete
  nextTick(() => {
    if (inputRef.value !== null) {
      inputRef.value.focus();
    }
  });
}

const saveItem = () => {
  if(!editData.value.text){
      return
  }
  todoStore.updateItem(editData.value, props.index)
  editData.value.text = ''
  isEdit.value = false
}

const switchCompleteStatus = (event: Event) => {
  const isChecked = (event.target as HTMLInputElement).checked;
  editData.value = {...props.item, isComplete: isChecked}
  todoStore.updateItem(editData.value, props.index)
}
</script>
<style lang="postcss" scoped>
.button {
  @apply text-white mx-1 my-1.5 px-4 py-1.5 rounded;
}
</style>
