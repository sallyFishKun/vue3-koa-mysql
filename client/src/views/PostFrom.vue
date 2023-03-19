<template>
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
      <el-button type="primary" @click="onSubmit">发布</el-button>
      <el-button>取消</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup>
import { reactive } from 'vue';
import service from '../request/service';
// do not use same name with ref
const form = reactive({
  name: '',
  region: '',
  pepole: '',
  address: '',
  phone: '',
  datetime: '',
  desc: ''
});

const onSubmit = () => {
  console.log(form);
  service.post('post/new', form);
}
</script>
<style lang="less" scoped>
.myform {
  width: 500px;
  margin: auto;
}
</style>