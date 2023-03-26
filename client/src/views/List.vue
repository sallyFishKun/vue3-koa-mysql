<template>
  <div class="list">
    <el-form :inline="true" :model="form" class="demo-form-inline">
      <el-form-item label="失物名称">
        <el-input v-model="form.word" clearable placeholder="失物名称" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">查询</el-button>
      </el-form-item>
    </el-form>
    <el-table :data="form.tableData" stripe border class="mytable">
      <el-table-column prop="datetime" label="捡到时间" width="180" />
      <el-table-column prop="name" label="物品名称" width="180" />
      <el-table-column prop="phone" label="联系方式" width="180" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button size="small" @click="handleDetail(scope.row.id)"
            >查看详情</el-button
          >
          <el-button
            size="small"
            @click="router.push('admindetail?id=' + scope.row.id)"
            v-if="isAdmin == 1"
            >编辑</el-button
          >
          <el-button
            size="small"
            type="danger"
            v-if="isAdmin == 1"
            @click="handleDelete(scope.row.id)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script  setup>
import { onMounted, reactive, computed } from 'vue';
import service from '../request/service';
import { useRouter } from 'vue-router';
import { useStore } from 'vuex'
const router = useRouter();
const store = useStore();
const isAdmin = computed(() => store.state.isAdmin)
const form = reactive({
  tableData: [],
  word: ''
});
service.get('post/list').then(res => {
  if (res.status === 200 && Array.isArray(res.data)) {
    form.tableData = res.data;// res.data.map(item => item);
  }
});
const onSubmit = () => {
  service.get('post/search', { word: form.word }).then(res => {
    if (res.status === 200 && Array.isArray(res.data)) {
      form.tableData = res.data;
    }
  });
}

// const tableData = reactive([]);

const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (id) => {
  service.get('post/del', { id }).then(res => {
    if (res.status === 200 && Array.isArray(res.data)) {
      form.tableData = res.data;
    }
  });
};
const handleDetail = (id) => router.push('/detail?id=' + id);
const go = () => {
  router.push('./post');
}
</script>
<style lang="less" scoped>
.list {
  width: 100%;
  // width: 800px;
  overflow-x: auto;
}
.mytable {
  width: 800px;
  margin: auto;
}
</style>