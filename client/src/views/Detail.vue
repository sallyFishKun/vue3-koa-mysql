<template>
  <div class="detail">
    <div class="affix" :offset="220" style="text-align: left">
      <el-button
        type="primary"
        v-if="isAdmin == 0"
        @click="router.push('/admindetail?id=' + route.query.id)"
        >编辑</el-button
      >
    </div>
    <el-card class="box-card">
      <template #header>
        <div class="card-header">
          <span>物品信息</span>
          <el-button class="button" @click="go">发帖</el-button>
        </div>
      </template>
      <ul>
        <li v-for="(item, index) in form.mydata" :key="index">
          <p>
            <span class="label">{{ item.label }}：</span>
            <span class="value" v-if="Object.values(form.myinfo).length > 0">{{
              form.myinfo[item.key]
            }}</span>
          </p>
        </li>
      </ul>
    </el-card>
    <el-card class="box-card liuyanban">
      <template #header>
        <div class="card-header">
          <span>领取人信息</span>
          <el-button class="button" @click="dialogFormVisible2 = true"
            >申请领取</el-button
          >
        </div>
      </template>
      <ul>
        <li v-for="(item, index) in form2.list" :key="index">
          <p class="value">
            领取人：{{ item.user }} ,联系方式{{ item.dec }}
            <em>{{ item.date }}</em>
          </p>

          <el-divider />
        </li>
      </ul>
    </el-card>
    <el-card class="box-card liuyanban">
      <template #header>
        <div class="card-header">
          <span>留言板</span>
          <el-button class="button" @click="dialogFormVisible = true"
            >发表评论</el-button
          >
        </div>
      </template>
      <ul>
        <li v-for="(item, index) in form.myMsgs" :key="index">
          <p class="label2">
            【{{ item.user }}】<em>发表于{{ item.date }}</em>
          </p>
          <p class="value">{{ item.dec }}</p>
          <el-divider />
        </li>
      </ul>
    </el-card>

    <el-dialog v-model="dialogFormVisible" title="留言">
      <el-form :model="form">
        <el-form-item label="用户名" :label-width="formLabelWidth">
          <el-input v-model="form.user" autocomplete="off" />
        </el-form-item>
        <el-form-item label="留言" :label-width="formLabelWidth">
          <el-input v-model="form.dec" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible = false">Cancel</el-button>
          <el-button type="primary" @click="onMsgBoard"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
    <el-dialog v-model="dialogFormVisible2" title="申请领取">
      <el-form :model="form2">
        <el-form-item label="领取人名称" :label-width="formLabelWidth2">
          <el-input v-model="form2.user" autocomplete="off" />
        </el-form-item>
        <el-form-item label="联系方式" :label-width="formLabelWidth2">
          <el-input v-model="form2.dec" type="textarea" autocomplete="off" />
        </el-form-item>
      </el-form>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="dialogFormVisible2 = false">Cancel</el-button>
          <el-button type="primary" @click="onRecipient"> Confirm </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>
<script setup>
import { onMounted, reactive, ref, computed } from 'vue';
import service from '../request/service';
import { useRouter, useRoute } from 'vue-router';
import { ElMessage } from 'element-plus';
import { useStore } from 'vuex'
const route = useRoute();
const router = useRouter();
const store = useStore();
const isAdmin = computed(() => store.state.isAdmin)
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
service.post('post/detail', { id: route.query.id }).then(res => {
  if (res && res.status == 200) {
    form.myinfo = res.data;
  }
});
function getMsgList() {
  service.post('msg/list', { id: route.query.id }).then(res => {
    if (res && res.status == 200) {
      form.myMsgs = res.data;
    }
  });
}
function getRecipient() {
  service.post('recipient/list', { id: route.query.id }).then(res => {
    if (res && res.status == 200) {
      form2.list = res.data;
    }
  });
}
getRecipient();
getMsgList();
const go = () => router.push('/post');
const onMsgBoard = () => {
  const { user, dec } = form;
  service.post('msg/add', { pid: route.query.id, user, dec, date: new Date().toLocaleString() }).then(res => {
    if (res && res.status == 200) {

      dialogFormVisible.value = false;
      form.myMsgs.push(res.data);
      ElMessage({
        message: res.message,
        type: 'success',
      });
    }
  });
};

const onRecipient = () => {
  const { user, dec, list } = form2;
  // let i = list.filter(item => {
  //   console.log(item.user, user, item.user == user);
  //   if (item.user == user) { return item; }
  // });
  // if (i.length > 0) {
  //   ElMessage('一个人不能同时申请多次');
  //   return;
  // }
  service.post('recipient/add', { pid: route.query.id, user, dec, date: new Date().toLocaleString() }).then(res => {
    if (res && res.status == 200) {

      dialogFormVisible2.value = false;

      getRecipient();
      ElMessage({
        message: res.message,
        type: 'success',
      });
    }
  });
}
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
.affix {
  position: fixed;
  top: 120px;
  left: calc(100%-500px);
}
</style>

