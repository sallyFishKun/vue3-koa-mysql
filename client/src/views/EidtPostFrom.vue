<template>
  <el-card class="box-card">
    <template #header>
      <div class="card-header">
        <span>物品信息</span>
        <!-- <el-button class="button" type="danger" @click="go">删除</el-button> -->
      </div>
    </template>
    <el-form :model="form" label-width="120px" class="myform">
      <el-form-item label="物品名称" required>
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="捡到地点">
        <el-input v-model="form.address" />
      </el-form-item>
      <el-form-item label="联系方式" required>
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item label="联系人">
        <el-input v-model="form.pepole" required />
      </el-form-item>

      <el-form-item label="捡到时间">
        <el-date-picker
          v-model="form.datetime"
          type="datetime"
          placeholder="Pick a Date"
          format="YYYY/MM/DD hh:mm:ss"
          value-format="YYYY/MM/DD hh:mm:ss"
        />
      </el-form-item>
      <el-form-item label="相关描述">
        <el-input v-model="form.desc" type="textarea" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">修改</el-button>
        <!-- <el-button>取消</el-button> -->
      </el-form-item>
    </el-form>
  </el-card>
</template>

<script setup>
import router from '@/router';
import { reactive } from 'vue';
import service from '../request/service';
import { ElMessage } from 'element-plus';

const props = defineProps({
  id: String
});
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  pepole: '',
  address: '',
  phone: '',
  datetime: '',
  desc: '',
  id: props.id
});
console.log('---------')
service.post('post/detail', { id: props.id }).then(res => {
  if (res && res.status == 200) {
    Object.keys(res.data).forEach(k => {
      form[k] = res.data[k];
    });
  }
});
const onSubmit = () => {
  console.log(form);
  service.post('post/eidt', form).then(res => {
    if (res && res.status == 200 && res.data) {
      // router.replace('/detail?id=' + res.data);
      ElMessage({
        message: res.message,
        type: 'success',
      });
    }
  });
}
</script>
<style lang="less" scoped>
.myform {
  width: 100%;
  margin: auto;
}
</style>