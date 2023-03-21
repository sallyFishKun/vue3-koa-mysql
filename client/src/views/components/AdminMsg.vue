<template>
  <el-card class="box-card liuyanban">
    <template #header>
      <div class="card-header">
        <span>留言板</span>
        <el-button
          class="button"
          style="float: right"
          @click="dialogFormVisible = true"
          >新增留言</el-button
        >
      </div>
    </template>
    <el-table :data="form.tableData" stripe class="mytable">
      <el-table-column prop="date" label="时间" width="180" />
      <el-table-column prop="user" label="用户名" width="180" />
      <el-table-column prop="dec" label="留言" width="180" />
      <el-table-column label="Operations">
        <template #default="scope">
          <el-button
            size="small"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
            >删除</el-button
          >
        </template>
      </el-table-column>
    </el-table>
    <MsgDialog
      :id="props.id"
      @onComplete="getMsgList"
      @updateVisible="(is) => (dialogFormVisible = is)"
      :visible="dialogFormVisible"
    />
  </el-card>
</template>

<script  setup>
import { onMounted, reactive, ref } from 'vue';
import service from '../../request/service';
import MsgDialog from './MsgDialog.vue'
import { useRouter } from 'vue-router';
const router = useRouter();
const form = reactive({
  tableData: []
});
const dialogFormVisible = ref(false);

const props = defineProps({
  id: String
});

function getMsgList() {
  service.post('msg/list', { id: props.id }).then(res => {
    if (res && res.status == 200) {
      form.tableData = res.data;
    }
  });
}
getMsgList();
const handleEdit = (index, row) => {
  console.log(index, row);
};
const handleDelete = (index, row) => {
  service.post('msg/del', { pid: props.id, id: row.id }).then(res => {
    if (res && res.status == 200) {
      form.tableData = res.data;
      ElMessage({
        message: res.message,
        type: 'success',
      });
    }
  });
};

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