import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  // TODO routes的預設值被你砍了@@
  // 有警告 main.ts:16 [Vue Router warn]: No match found for location with path "/"
  routes: [

  ]
})

export default router
