<template>
  <div class="dashboard">
    <div class="chart" v-for="(chart, index) in charts" :key="index">
      <div :ref="setChartRef(index)" class="chart-container"></div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref, VNodeRef } from 'vue';
import * as echarts from 'echarts';

const charts = ref([1, 2, 3, 4, 5, 6]); // 더미 차트를 위한 배열
const chartRefs = ref<Array<HTMLElement | null>>(new Array(charts.value.length).fill(null)); // 각 차트의 참조
const chartInstances = ref<Array<echarts.ECharts | null>>(new Array(charts.value.length).fill(null));

// 각 차트의 참조를 설정하는 함수
const setChartRef = (index: number) => (el: VNodeRef | undefined) => {
  chartRefs.value[index] = el?.valueOf() as HTMLElement;
};

onMounted(() => {
  charts.value.forEach((_, index) => {
    const chartDom = (chartRefs.value[index] as HTMLElement);
    if (chartDom) {
      chartInstances.value[index] = echarts.init(chartDom);

      let option: echarts.EChartsCoreOption = {};
      switch (index) {
        case 0: // 막대 차트
          option = {
            title: { text: `Bar Chart` },
            xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
            yAxis: {},
            series: [{ type: 'bar', data: [12, 23, 34, 45, 56] }]
          };
          break;
        case 1: // 라인 차트
          option = {
            title: { text: `Line Chart` },
            xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
            yAxis: {},
            series: [{ type: 'line', data: [56, 34, 23, 12, 45] }]
          };
          break;
        case 2: // 파이 차트
          option = {
            title: { text: `Pie Chart` },
            series: [{
              type: 'pie',
              radius: '50%',
              data: [
                { value: 1048, name: 'A' },
                { value: 735, name: 'B' },
                { value: 580, name: 'C' },
                { value: 484, name: 'D' },
                { value: 300, name: 'E' }
              ]
            }]
          };
          break;
        case 3: // 산포도 차트
          option = {
            title: { text: `Scatter Chart` },
            xAxis: {},
            yAxis: {},
            series: [{
              type: 'scatter',
              data: Array.from({ length: 20 }, () => [Math.random() * 100, Math.random() * 100])
            }]
          };
          break;
        case 4: // 영역 차트
          option = {
            title: { text: `Area Chart` },
            xAxis: { data: ['A', 'B', 'C', 'D', 'E'] },
            yAxis: {},
            series: [{
              type: 'line',
              data: [12, 32, 45, 23, 16],
              areaStyle: {}
            }]
          };
          break;
        case 5: // 레이더 차트
          option = {
            title: { text: `Radar Chart` },
            radar: {
              indicator: [
                { name: 'A', max: 100 },
                { name: 'B', max: 100 },
                { name: 'C', max: 100 },
                { name: 'D', max: 100 },
                { name: 'E', max: 100 }
              ]
            },
            series: [{
              type: 'radar',
              data: [{ value: [60, 73, 85, 40, 90], name: 'Series 1' }]
            }]
          };
          break;
      }

      chartInstances.value[index]?.setOption(option);
    }
  });
});
</script>

<style scoped>
.dashboard {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  gap: 10px;
  padding: 20px;
}

.chart {
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 10px;
}

.chart-container {
  width: 100%;
  height: 200px;
}
</style>
