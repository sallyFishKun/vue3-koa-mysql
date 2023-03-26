<template>
  <!-- <div ref="chartDom" style="width: 300px; height: 300px"></div> -->
  <div id="chartDom"></div>
  <div id="chartDom2"></div>
</template>

<script setup>
import * as echarts from 'echarts';
import { onMounted, reactive, ref } from 'vue'
import service from '../request/service';
// const chartDom = ref();
const option = {
  legend: {},
  tooltip: {},
  dataset: {
    dimensions: ['product', '申领人数', '留言数'],
    source: [

    ]
  },
  xAxis: { type: 'category' },
  yAxis: {},
  // Declare several bar series, each will be mapped
  // to a column of dataset.source by default.
  series: [{ type: 'bar' }, { type: 'bar' }]
};
const option2 = {
  title: {
    text: '用户操作时间',
    // subtext: 'Fake Data'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'cross'
    }
  },
  toolbox: {
    show: true,
    feature: {
      saveAsImage: {}
    }
  },
  xAxis: {
    type: 'category',
    boundaryGap: false,
    // prettier-ignore
    data: []
  },
  yAxis: {
    type: 'value',
    axisLabel: {
      formatter: '{value}'
    },
    axisPointer: {
      snap: true
    }
  },
  visualMap: {
    show: false,
    dimension: 0,
    pieces: [
      {
        lte: 6,
        color: 'green'
      },
      {
        gt: 6,
        lte: 8,
        color: 'red'
      },
      {
        gt: 8,
        lte: 14,
        color: 'green'
      },
      {
        gt: 11,
        lte: 17,
        color: 'red'
      },
      {
        gt: 17,
        color: 'green'
      }
    ]
  },
  series: [
    {
      name: 'Electricity',
      type: 'line',
      smooth: true,
      // prettier-ignore
      data: [],
      markArea: {
        itemStyle: {
          color: 'rgba(255, 173, 177, 0.4)'
        },
        data: [
          [
            {
              name: 'Morning Peak',
              xAxis: '07:30'
            },
            {
              xAxis: '10:00'
            }
          ],
          [
            {
              name: 'Evening Peak',
              xAxis: '17:30'
            },
            {
              xAxis: '21:15'
            }
          ]
        ]
      }
    }
  ]
}
var myChart
var myChart2
onMounted(() => {
  myChart = echarts.init(document.getElementById('chartDom'));
  myChart2 = echarts.init(document.getElementById('chartDom2'));
  onData()
})

const form = reactive({

  postList: [],
  msgList: [],
  recipientList: [],
})
async function onList() {

  const res = await service.get('post/list')
  if (res.status === 200 && Array.isArray(res.data)) {
    form.postList = res.data;
  }
  const res2 = await service.post('msg/list', { id: 'all' })
  if (res2.status === 200 && Array.isArray(res2.data)) {
    form.msgList = res2.data;
  }
  const res3 = await service.post('recipient/list', { id: 'all' })
  if (res3.status === 200 && Array.isArray(res3.data)) {
    form.recipientList = res3.data;
  }



}
async function onData() {
  await onList()
  let score = [];
  let data = [];
  let times = {};
  let num = 0
  let num2 = 0
  form.postList.forEach(item => {
    let str = item.datetime.substr(11, 5);
    if (times[str]) {
      times[str]++;
    } else {
      times[str] = 1;
    }
    // times.push(item.datetime.substr(11, 5))
    form.recipientList.forEach(k => {
      if (k.id == item.id) {
        num = k.list.length;
      }
      let str = item.datetime.substr(11, 5);
      if (times[str]) {
        times[str]++;
      } else {
        times[str] = 1;
      }
    })
    form.msgList.forEach(k => {
      if (k.id == item.id) {
        num2 = k.list.length;
      }
      let str = item.datetime.substr(11, 5);
      if (times[str]) {
        times[str]++;
      } else {
        times[str] = 1;
      }
    })

    let obj = {
      'product': item.name,
      '申领人数': num,
      '留言数': num2,
    }
    score.push(obj)
  })
  option.dataset.source = score;

  option2.xAxis.data = Object.keys(times);
  option2.series[0].data = Object.values(times);
  option && myChart.setOption(option);
  option2 && myChart2.setOption(option2);

}
</script>

<style lang="less" scoped>
#chartDom,
#chartDom2 {
  max-height: 500px;
  // max-height: 400px;
  height: 500px;
}
</style>