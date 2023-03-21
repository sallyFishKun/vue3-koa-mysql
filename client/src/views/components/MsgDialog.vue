<template>
  <el-dialog
    v-model="props.visible"
    title="留言"
    @close="emit('updateVisible', false)"
  >
    <el-form :model="form">
      <el-form-item label="用户名" label-width="100px">
        <el-input v-model="form.user" autocomplete="off" />
      </el-form-item>
      <el-form-item label="留言" label-width="100px">
        <el-input v-model="form.dec" type="textarea" autocomplete="off" />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="emit('updateVisible', false)">Cancel</el-button>
        <el-button type="primary" @click="onMsgBoard"> Confirm </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup>
import { onMounted, reactive, ref, computed, defineProps, defineEmits, effect } from 'vue';
import service from '../../request/service';
// import { useRouter, useRoute } from 'vue-router';
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

const onMsgBoard = () => {
  const { user, dec } = form;
  service.post('msg/add', { pid: props.id, user, dec, date: new Date().toLocaleString() }).then(res => {
    if (res && res.status == 200) {
      emit('onComplete', res.data)
      emit('updateVisible', false)
      ElMessage({
        message: res.message,
        type: 'success',
      });
    }
  });
};
</script>

<style>
</style>