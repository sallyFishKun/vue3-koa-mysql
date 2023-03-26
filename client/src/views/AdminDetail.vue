<template>
  <div class="detail">
    <el-tabs type="border-card" v-model="tabId">
      <el-tab-pane label="物品信息" :name="0">
        <EidtPostFrom :id="route.query.id" />
      </el-tab-pane>
      <el-tab-pane label="领取人信息" :name="1">
        <AdminRec :id="route.query.id" v-if="tabId == 1" />
      </el-tab-pane>
      <el-tab-pane label="留言板" :name="2">
        <AdminMsg :id="route.query.id" v-if="tabId == 2" />
      </el-tab-pane>
    </el-tabs>
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
const tabId = ref(0)



const go = () => router.push('/post');



</script>
<style lang="less" scoped>
.detail {
  width: 100%;
  text-align: left;
  .box-card {
    max-width: 850px;
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
