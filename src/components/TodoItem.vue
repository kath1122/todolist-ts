<template>
    <li class="inline-flex">
      <div class="inline-flex w-52 items-center">
        <input class="form-checkbox text-green-500 h-5 w-5" type="checkbox" :checked="props.item.isComplete" @change="switchCompleteStatus">
        <!-- 任務名稱 -->
        <span class="w-48 my-1.5 px-4 py-1.5" :class="{'text-gray-400': editData.isComplete }" v-show="!isEdit" @dblclick="editItem">{{props.item?.text}}</span>
        <el-input class="border border-gray-300 rounded-l focus:border-green-500 focus:outline-none" 
          v-show="isEdit" 
          type="text" 
          v-model="editData.text"
          @keyup.enter ="saveItem"
          @blur="saveItem">
        </el-input>
      </div>
      <el-button class="bg-red-400 button" :icon="Delete" type="danger" @click="deleteItem">delete</el-button>
    </li>
</template>

<script setup lang="ts">
import { ref } from 'vue'
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
