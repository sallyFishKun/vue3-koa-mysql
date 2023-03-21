<template>
  <el-dialog
    v-model="props.visible"
    title="申请领取"
    @close="emit('updateVisible', false)"
  >
    <el-form :model="form">
      <el-form-item label="领取人名称" label-width="100px">
        <el-input v-model="form.user" autocomplete="off" />
      </el-form-item>
      <el-form-item label="联系方式" label-width="100px">
        <el-input v-model="form.dec" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('updateVisible', false)">Cancel</el-button>
        <el-button type="primary" @click="onRecipient"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, computed, defineProps, defineEmits } from 'vue';
import service from '../../request/service';
import { ElMessage } from 'element-plus';
const props = defineProps({
  id: String,
  visible: Boolean
});
const emit = defineEmits(['onComplete', 'updateVisible'])

const form = reactive({
  user: '',
  dec: '',
});

const onRecipient = () => {
  const { user, dec } = form;
  // let i = list.filter(item => {
  //   console.log(item.user, user, item.user == user);
  //   if (item.user == user) { return item; }
  // });
  // if (i.length > 0) {
  //   ElMessage('一个人不能同时申请多次');
  //   return;
  // }
  service.post('recipient/add', { pid: props.id, user, dec, date: new Date().toLocaleString() }).then(res => {
    if (res && res.status == 200) {
      emit('onComplete', res.data)
      emit('updateVisible', false)
      ElMessage({
        message: res.message,
        type: 'success',
      });
    }
  });
}
</script>

<style>
</style>