<template>
  <div class="app-container">
    <el-table border :data="list" style="width: 100%" :row-class-name="tableRowClassName">
      <el-table-column prop="pageviews" label="名称" width="180"></el-table-column>
      <el-table-column prop="author" label="活动区域" width="180"></el-table-column>
      <el-table-column prop="title" label="活动形式"></el-table-column>
      <el-table-column fixed="right" label="操作" width="100">
        <template slot-scope="scope">
          <el-button @click="handleClick(scope.row)" type="text" size="small">编辑</el-button>
          <el-button type="text" size="small" v-permission="['admin']">删除</el-button>
        </template>
      </el-table-column>

    </el-table>
    <div class="page">
      <el-pagination :page-size="15" @current-change="pageChange" layout="prev, pager, next" :total="total">
      </el-pagination>
    </div>
    <el-dialog title="修改信息" :visible.sync="dialogVisible" width="30%" :before-close="handleClose">
      <div style="margin: 20px;"></div>
      <el-form label-position="left" label-width="80px" :model="selectTable">
        <el-form-item label="名称">
          <el-input v-model="selectTable.pageviews"></el-input>
        </el-form-item>
        <el-form-item label="活动区域">
          <el-input v-model="selectTable.author"></el-input>
        </el-form-item>
        <el-form-item label="活动形式">
          <el-input v-model="selectTable.title"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="updateInfo">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script>
import permission from '@/directive/permission/index.js' // 权限判断指令
import { getList, updateList } from '@/api/schoolList'

export default {
  name: 'role',
  directives: { permission },
  data() {
    return {
      list: null,
      listLoading: true,
      total: 60,
      dialogVisible: false,
      selectTable: {}
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
    },
    handleClick(row) {
      this.dialogVisible = true;
      this.selectTable = row;
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done();
        })
        .catch(_ => { });
    },
    updateInfo() {
      this.dialogVisible = false;
      updateList(this.selectTable);
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