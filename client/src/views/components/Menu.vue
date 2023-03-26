<template>
  <el-menu
    :default-active="activeIndex"
    class="el-menu-demo"
    mode="horizontal"
    background-color="#545c64"
    text-color="#fff"
    active-text-color="#ffd04b"
  >
    <div class="myheard" @click="onChange">
      <el-avatar :size="50" />
      <span class="myname">
        {{ isAdmin == 1 ? '我是管理员' : '我是用户' }}
      </span>
    </div>

    <template v-if="isAdmin == 1">
      <el-menu-item
        :index="item.path"
        :key="item.path"
        v-for="item in form.adminRouter"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </el-menu-item>
    </template>
    <template v-else>
      <el-menu-item
        :index="item.path"
        :key="item.path"
        v-for="item in form.userRouter"
      >
        <router-link :to="item.path">{{ item.name }}</router-link>
      </el-menu-item>
    </template>
  </el-menu>
</template>

<script  setup>
import { ref, reactive, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router';
import { useStore, mapMutations, mapState } from 'vuex';
// const activeIndex = ref(0)
const store = useStore();
const router = useRouter()
const route = useRoute()
const form = reactive({
  //   isAdmin: Number(route.query.isAdmin)
  adminRouter: [{
    index: 0,
    path: '/list',
    name: '失物列表'
  }],
  userRouter: [
    {
      index: 0,
      path: '/list',
      name: '失物列表'
    },
    {
      index: 1,
      path: '/post',
      name: '发布失物招领'
    },
  ]
})
const isAdmin = computed(() => store.state.isAdmin)

const activeIndex = computed(() => {
  //   const arr = isAdmin ? form.adminRouter : form.userRouter
  //   arr.map(item => item.path == route.path)
  //   console.log(arr)
  return route.path
})


const onChange = () => {
  const is = isAdmin.value == 1 ? 0 : 1;
  localStorage.setItem('isAdmin', is)
  store.dispatch('setIsAdmin', is)
  setTimeout(() => {
    router.replace('/list')

  }, 0);
}
</script>
<style scoped lang="less">
.el-menu {
  margin-bottom: 20px;
  :deep(.el-menu-item) {
    &.is-active2 {
      color: red;
    }
  }
}
.myheard {
  display: flex;
  align-items: center;
  margin-right: 100px;
  .myname {
    margin-left: 10px;
    display: inline-block;
    color: #fff;
  }
}
</style>
