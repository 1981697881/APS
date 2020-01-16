<template>
  <div style="border: 1px solid rgba(0,21,41,0.08)" :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from '@/views/dashboard/components/mixins/resize'

const animationDuration = 6000

export default {
  mixins: [resize],
  props: {
    className: {
      type: String,
      default: 'chart'
    },
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: String,
      default: '400px'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart()
    })
  },
  beforeDestroy() {
    if (!this.chart) {
      return
    }
    this.chart.dispose()
    this.chart = null
  },
  methods: {
    initChart() {
      this.chart = echarts.init(this.$el, 'macarons')

      this.chart.setOption({
          title: {
              text: '主营业务成品线效率图',
              left: 'center',
              align: 'right'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  type: 'cross',
                  crossStyle: {
                      color: '#999'
                  }
              }
          },
          toolbox: {
              feature: {
                  dataView: {show: true, readOnly: false},
                  magicType: {show: true, type: ['line', 'bar']},
                  restore: {show: true},
                  saveAsImage: {show: true}
              }
          },
          legend: {
              bottom : '10',
              data: ['真石漆自动线(桶)', '真石漆手动线(桶)', 'PCK线(桶)', '真石漆自动线(kg/h)', '真石漆手动线(kg/h)', 'PCK线(kg/h)']
          },
          xAxis: [
              {
                  type: 'category',
                  data: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12'],
                  axisPointer: {
                      type: 'shadow'
                  }
              }
          ],
          yAxis: [
              {
                  type: 'value',
                 // name: '水量',
                  min: 0,
                  max: 1000,
                  interval: 200,
                  axisLabel: {
                      formatter: '{value} '
                  }
              },
              {
                  type: 'value',
                  //name: '温度',
                  min: 0,
                  max: 5000,
                  interval: 1000,
                  axisLabel: {
                      formatter: '{value} '
                  }
              }
          ],
          series: [
              {
                  name: '真石漆自动线(桶)',
                  type: 'bar',
                  data: [100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100, 100]
              },
              {
                  name: '真石漆手动线(桶)',
                  type: 'bar',
                  data: [200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200, 200]
              },
              {
                  name: 'PCK线(桶)',
                  type: 'bar',
                  data: [150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150, 150]
              },
              {
                  name: '真石漆自动线(kg/h)',
                  type: 'line',
                  yAxisIndex: 1,
                  data: [1000, 1110, 1020, 1230, 1040, 1400, 1640, 1004, 1850, 1050, 1040, 1040]
              },
              {
                  name: '真石漆手动线(kg/h)',
                  type: 'line',
                  yAxisIndex: 1,
                  data: [2000, 2070, 2750, 2403, 2500, 2860, 2050, 2570, 2070, 2070, 2040, 2500]
              },
              {
                  name: 'PCK线(kg/h)',
                  type: 'line',
                  yAxisIndex: 1,
                  data: [3000, 3107, 3209, 3380, 3480, 3570, 3760, 3740, 3810, 3590, 4300, 3700]
              }
          ]
      })
    }
  }
}
</script>
