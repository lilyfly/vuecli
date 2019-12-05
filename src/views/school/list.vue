<template>
  <div class="app-container">
    <el-table border :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="pageviews" label="日期" width="180"></el-table-column>
      <el-table-column prop="author" label="姓名" width="180"></el-table-column>
      <el-table-column prop="title" label="地址"></el-table-column>
    </el-table>
    <div class="page">
      <el-pagination :page-size="15" @current-change="pageChange" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
  </div>
</template>
<script>
import { getList } from '@/api/schoolList'

export default {
  data() {
    return {
      list: null,
      listLoading: true,
      total: 60
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    pageChange(currentPage) {
      this.fetchData({ currentPage });
    },
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return 'warning-row';
      } else if (rowIndex === 3) {
        return 'success-row';
      }
      return '';
    },
    fetchData(pageInfo) {
      this.listLoading = true
      getList(pageInfo).then(response => {
        this.list = response.data.items
        this.listLoading = false
      })
    }
  }
}
</script>
<style lang="scss">
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
.page {
  margin: 30px;
  text-align: right;
}
</style>