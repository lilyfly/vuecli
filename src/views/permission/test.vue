<template>
  <div class="app-container">
    <div :key="key" style="margin-top:30px;">
      <div>
        <span v-permission="['admin']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">admin</el-tag>can see this
        </span>
        <el-tag
          v-permission="['admin']"
          class="permission-sourceCode"
          type="info"
        >v-permission="['admin']"</el-tag>
      </div>

      <div>
        <span v-permission="['editor']" class="permission-alert">
          Only
          <el-tag class="permission-tag" size="small">editor</el-tag>can see this
        </span>
        <el-tag
          v-permission="['editor']"
          class="permission-sourceCode"
          type="info"
        >v-permission="['editor']"</el-tag>
      </div>

      <div>
        <span v-permission="['admin','editor']" class="permission-alert">
          Both
          <el-tag class="permission-tag" size="small">admin</el-tag>and
          <el-tag class="permission-tag" size="small">editor</el-tag>can see this
        </span>
        <el-tag
          v-permission="['admin','editor']"
          class="permission-sourceCode"
          type="info"
        >v-permission="['admin','editor']"</el-tag>
      </div>
    </div>
  </div>
</template>

<script>
import permission from '@/directive/permission/index.js' // 权限判断指令

export default {
  name: 'DirectivePermission',
  directives: { permission },
  data() {
    return {
      key: 1 // 为了能每次切换权限的时候重新初始化指令
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
</style>

