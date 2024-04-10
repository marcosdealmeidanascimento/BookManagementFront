import { createRouter, createWebHistory } from 'vue-router'
import BaseLayout from '@/layouts/BaseLayout.vue'
import BookIndex from '@/views/Books/BookIndex.vue'
import BookCreate from '@/views/Books/BookCreate.vue'
import BookEdit from '@/views/Books/BookEdit.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: BaseLayout,
      children: [
        {
          name: 'bookIndex',
          component: BookIndex,
          path: '',
        },
        {
          component: BookCreate,
          path: 'books/create',
        },
        {
          name: 'bookEdit',
          component: BookEdit,
          path: 'books/edit/:id',
        }
      ]
    }
  ]
})

export default router
