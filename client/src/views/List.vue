<template>
  <div class="list">
    <el-button @click="go">发贴</el-button>
    <el-table :data="form.tableData" stripe class="mytable">
      <el-table-column prop="datetime" label="捡到时间" width="180" />
      <el-table-column prop="name" label="物品名称" width="180" />
      <el-table-column prop="phone" label="联系方式" width="180" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleDetail(scope.row.id)"
            >查看详情</el-button
          >
          <el-button size="small" @click="handleEdit(scope.$index, scope.row)"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script  setup>
import { onMounted, reactive } from 'vue';
import service from '../request/service';
import { useRouter } from 'vue-router';
const router = useRouter();
const form = reactive({
  tableData: []
});
service.get('post/list').then(res => {
  if (res.status === 200 && Array.isArray(res.data)) {
    form.tableData = res.data;// res.data.map(item => item);
  }
});

// const tableData = reactive([]);

const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  console.log(index, row);
};
const handleDetail = (id) => router.push('/detail?id=' + id);
const go = () => {
  router.push('./post');
}
</script>
<style lang="less" scoped>
.list {
  width: 100%;
  min-width: 800px;
  overflow-x: auto;
}
.mytable {
  width: 800px;
  margin: auto;
}
</style>