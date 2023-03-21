<template>
  <div class="detail">
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>物品信息</span>
          <el-button class="button" type="danger" @click="go">删除</el-button>
        </div>
      </template>
      <EidtPostFrom :id="route.query.id" />
    </el-card>
    <AdminRec :id="route.query.id" />
    <AdminMsg :id="route.query.id" />
  </div>
</template>
<script setup>
import AdminRec from './components/AdminRec.vue';
import AdminMsg from './components/AdminMsg.vue';
import EidtPostFrom from './EidtPostFrom.vue';
import { onMounted, reactive, ref } from 'vue';
import service from '../request/service';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
const route = useRoute();
const router = useRouter();
const dialogFormVisible = ref(false);
const dialogFormVisible2 = ref(false);
const formLabelWidth = '80px';
const formLabelWidth2 = '100px';
const form = reactive({
  user: '',
  dec: '',
  myinfo: {},
  myMsgs: [

  ],

  mydata: [
    { label: '物品名称', key: 'name' },
    { label: '捡到地点', key: 'address' },
    { label: '联系方式', key: 'phone' },
    { label: '联系人', key: 'pepole' },
    { label: '捡到时间', key: 'datetime' },
    { label: '相关描述', key: 'desc' },
  ]
});
const form2 = reactive({
  user: '',
  dec: '',
  list: []
});
onMounted(() => {

});
// service.post('post/detail', { id: route.query.id }).then(res => {
//   if (res && res.status == 200) {
//     form.myinfo = res.data;
//   }
// });
// function getMsgList() {
//   service.post('msg/list', { id: route.query.id }).then(res => {
//     if (res && res.status == 200) {
//       form.myMsgs = res.data;
//     }
//   });
// }
// function getRecipient() {
//   service.post('recipient/list', { id: route.query.id }).then(res => {
//     if (res && res.status == 200) {
//       form2.list = res.data;
//     }
//   });
// }
// getRecipient();
// getMsgList();
const go = () => router.push('/post');



</script>
<style lang="less" scoped>
.detail {
  width: 100%;
  text-align: left;
  .box-card {
    margin: auto;
    .label {
      width: 80px;
      display: inline-block;
    }
    .value {
      word-break: break-all;
    }
    em {
      font-size: 12px;
      color: #999;
    }
  }
  .liuyanban {
    margin-top: 20px;
    min-width: 850px;
  }
}
.card-header {
  display: flex;
  justify-content: space-between;
  //   align-items: center;
}

.text {
  font-size: 14px;
}

.item {
  margin-bottom: 18px;
}

.box-card {
  width: 480px;
}
</style>
