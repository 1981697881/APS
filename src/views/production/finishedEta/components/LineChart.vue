<template>
  <div :class="className" :style="{width:width}" style=" height: calc(100vh /3)">
  </div>
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
      number: 0,
      chart: null
    }
  },
  mounted() {
    this.$nextTick(() => {
      //this.initChart()
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
    initChart(value) {
      console.log(value)
      this.mainYield = value.mainYield
      this.mainEfficiency = value.mainEfficiency
      this.otherYield = value.otherYield
      this.otherEfficiency = value.otherEfficiency
      this.chart = echarts.init(this.$el, 'macarons')
      this.chart.setOption({
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
           /* dataView: {show: true, readOnly: false},
            magicType: {show: true, type: ['line', 'bar']},
            restore: {show: true},
            saveAsImage: {show: true}*/
          }
        },
        legend: {
          top: 'bottom',
          data: ['真石漆线产量(kg)', 'PCK线产量(kg)', '真石漆线效率(kg/h)', 'PCK线效率(kg/h)']
        },
        xAxis: [
          {
            type: 'category',
            data: value.arrayDay,
            axisPointer: {
              type: 'shadow'
            }
          }
        ],
        yAxis: [
          {
            type: 'value',
            name: '产量',
            min: 0,
            max: 1000000,
            interval: 150000,
            axisLabel: {
              formatter: '{value} kg'
            }
          },
          {
            type: 'value',
            name: '效率',
            min: 0,
            max: 100000,
            interval: 10000,
            axisLabel: {
              formatter: '{value} kg/h'
            }
          }
        ],
        series: [
          {
            name: '真石漆线产量(kg)',
            type: 'bar',
            data: this.mainYield
          },
          {
            name: 'PCK线产量(kg)',
            type: 'bar',
            data: this.mainEfficiency
          },
          {
            name: '真石漆线效率(kg/h)',
            type: 'line',
            yAxisIndex: 0,
            data: this.otherYield
          },
          {
            name: 'PCK线效率(kg/h)',
            type: 'line',
            yAxisIndex: 0,
            data: this.otherEfficiency
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh /3);
  }
</style>
