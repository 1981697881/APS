<template>
  <div :class="className" :style="{height:height,width:width}" />
</template>

<script>
import echarts from 'echarts'
require('echarts/theme/macarons') // echarts theme
import resize from './mixins/resize'

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
      default: '100%'
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initChart(this.fetchData())
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
    fetchData(value) {
     return value
    },
    initChart(value) {
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
        tooltip: {
          trigger: 'item',
          formatter: '{a} <br/>{b} : {c} ({d}%)'
        },
        title: {
          text: 'XX线生产进度',
          left: 'center',
          top: '15'
        },
        legend: {
          left: 'center',
          bottom: '10',
          data: ['当日已完工任务', '当日待产任务']
        },
        series: [
          {
            type: 'pie',
            name: '分类',
            radius: '55%',
            center: ['50%', '50%'],
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            },
            data: [
              { value: 320, name: '当日已完工任务' },
              { value: 240, name: '当日待产任务' },
            ]
          }
        ]
      })
    }
  }
}
</script>
