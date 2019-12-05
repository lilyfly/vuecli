import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Layout from '@/layout'

// 解决两次访问相同路由地址报错
const routerPush = Router.prototype.push
Router.prototype.push = function push(location) {
  return routerPush.call(this, location).catch(error => error)
}
Vue.use(Router)

export const constantRoutes = [
  {
    path: '/login',
    name: 'Login',
    component: Login,
    //菜单不显示
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [{
      path: 'dashboard',
      name: 'Dashboard',
      component: () => import('@/views/dashboard/index'),
      //title 菜单名称
      meta: { title: '主页', icon: 'dashboard' }
    }]

  },
  // {
  //   path: '/lily',
  //   component: Layout,
  //   children: [{
  //     path: 'test',
  //     component: () => import('@/views/dashboard/index'),
  //     meta: { title: '简介', icon: 'dashboard' }
  //   }]

  // },

  {
    path: '/school',
    component: Layout,
    redirect: '/school/list',
    name: 'School',
    meta: { title: '学校', icon: 'example' },
    children: [
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/school/list'),
        meta: { title: '列表', icon: 'table' }
      },
      {
        path: 'add',
        name: 'Add',
        component: () => import('@/views/school/addList'),
        meta: { title: '创建', icon: 'tree' }
      }
    ]
  },
  {
    path: '/editor',
    component: Layout,
    children: [
      {
        path: 'editor',
        name: 'Editor',
        component: () => import('@/views/editor/editor.vue'),
        meta: { title: '富文本编辑', icon: 'table' }
      }
    ]
  }

]


export const asyncRoutes = [
  {
    path: '/permission',
    component: Layout,
    redirect: '/permission/role',
    alwaysShow: true,
    name: 'Permission',
    meta: {
      title: '管理员',
      icon: 'lock',
      roles: ['admin', 'editor']
    },
    children: [
      // {
      //   path: 'page',
      //   component: () => import('@/views/permission/page'),
      //   name: 'PagePermission',
      //   meta: {
      //     title: '类型管理',
      //     roles: ['admin']
      //   }
      // },
      // {
      //   path: 'directive',
      //   component: () => import('@/views/permission/directive'),
      //   name: 'DirectivePermission',
      //   meta: {
      //     title: 'Directive Permission'
      //   }
      // }
      // ,
      {
        path: 'role',
        component: () => import('@/views/permission/role'),
        name: 'RolePermission',
        meta: {
          title: '用户列表',
          roles: ['admin', 'editor']
        }
      }
    ]
  }]
const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}
export default router