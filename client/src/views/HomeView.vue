<template>
  <div>
    <div></div>
    <div id="main"></div>
    <div id="maychar"></div>
  </div>
</template>

<script >
import * as echarts from 'echarts';
import axios from 'axios'
import { defineComponent, onMounted } from "vue"; // 主要
import service from '../request/service'
export default defineComponent({
  setup(props, context) {
    service.get('seller')
    onMounted(() => {
      var myChart = echarts.init(document.getElementById('main'));
      // 绘制图表
      myChart.setOption({
        title: {
          text: 'ECharts 入门示例'
        },
        tooltip: {},
        xAxis: {
          data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
        },
        yAxis: {},
        series: [
          {
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    });

    return {

    };
  }
});
</script>

<style lang="less" scoped>
#main {
  min-width: 200px;
  min-height: 200px;
  // max-height: 500px;
}

#maychar {
  max-height: 500px;
  // max-height: 400px;
  height: 500px;
}
</style>
