<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @dblclick="dblclick"
       @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { logisticsEfficiencyReport } from '@/api/warehouse/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: []
    };
  },
  methods: {
    ExportData() {
      import('@/vendor/Export2Excel').then(excel => {
        // 表格的表头列表
        const columns = this.columns
        const tHeader = []
        // 与表头相对应的数据里边的字段
        const filterVal = []
        columns.forEach((item, index) => {
          tHeader.push(item.text)
          filterVal.push(item.name)
        })
        const list = this.list.records
        const data = this.formatJson(filterVal, list);
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel(tHeader,data,'效率统计')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    getDaysBetween(dateString1,dateString2){
      let startDate = Date.parse(dateString1);
      let endDate = Date.parse(dateString2);
      let days = (endDate - startDate)/(1*24*60*60*1000);
      // alert(days);
      return  days
    },
    uploadPr(val) {
      this.fetchData(val)
    },
    dblclick(obj) {
      // this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
    },
    // 查询前后日期
    getDay(date, day){
      var today = new Date(date[0], date[1]-1, date[2]);
      var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
      today.setTime(targetday_milliseconds) // 注意，这行是关键代码
      var tYear = today.getFullYear()
      var tMonth = today.getMonth()
      var tDate = today.getDate()
      var getDay = today.getDay()
      tMonth = this.doHandleMonth(tMonth + 1)
      tDate = this.doHandleMonth(tDate)
      var weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
      var week = weeks[getDay]
      return {
        day: tDate,
        week: week,
        date: (tMonth + '/' + tDate)
      }
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = '0' + month;
      }
      return m;
    },
    fetchData(val) {
      this.loading = true
      let interval = this.getDaysBetween(val.startDate, val.endDate)
      if(interval > 100){
        return this.$message({
          message: '抱歉，超出可查询范围！',
          type: 'warning'
        });
      } else {
        let startData = val.startDate
        startData = startData.replace(/:/g,'-')
        startData = startData.replace(/ /g,'-')
        let arr = startData.split('-')
        this.columns = [
          {text: '项目', width: '150px',fixed: true, name: 'project' }
        ]
        const columns = this.columns
        for (let i = 0; i<= Number(interval); i++) {
          // 根据时间生成表头 把时间包含数据重新组装 -》array
          columns.push({text: this.getDay(arr, i).date + '', name: this.getDay(arr, i).date + ''})
        }
        logisticsEfficiencyReport(val).then(res => {
          if (res.flag) {
            const data = res.data
            let array = [
              { project: '原料入库重量（KG）' },
              { project: '原料入库批次' },
              { project: '原料出库重量（KG）' },
              { project: '原料出库批次' },
              { project: '半成品入库重量（KG)' },
              { project: '半成品入库批次' },
              { project: '半成品出库重量' },
              { project: '半成品出库批次' },
              { project: '成品入库重量（KG)' },
              { project: '成品入库批次' },
              { project: '成品出库重量（KG)' },
              { project: '成品出库批次' },
              { project: '成品出货重量（KG)' },
              { project: '成品出货批次' },
              { project: '办公室人员工时' },
              { project: '一线人员工时' },
              { project: '办公室人员加班工时' },
              { project: '一线人员加班工时' },
              { project: '总加班工时' },
              { project: '总工时（H）' },
              { project: '效率' },
              { project: '库存原料重量' },
              { project: '库存半成品重量' },
              { project: '库存成品重量' },
              { project: '仓库周转率' },
            ]
            data.forEach((item, index) => {
              array.forEach((item2, index2) => {
                console.log()
                let date = item['date']
                date = date.replace(/:/g,'-')
                date = date.replace(/ /g,'-')
                let arr1 = date.split('-')
                let key = this.getDay(arr1, 0).date + ''
                if(index2 == 0) {
                  item2[key] = item.stockPutWeight
                } else if(index2 == 1){
                  item2[key] = item.stockPutBatch
                }else if(index2 == 2){
                  item2[key] = item.stockOutWeight
                }else if(index2 == 3){
                  item2[key] = item.stockOutBatch
                }else if(index2 == 4){
                  item2[key] = item.blankPutWeight
                }else if(index2 == 5){
                  item2[key] = item.blankPutBatch
                }else if(index2 == 6){
                  item2[key] = item.blankOutWeight
                }else if(index2 == 7){
                  item2[key] = item.blankOutBatch
                }else if(index2 == 8){
                  item2[key] = item.finishPutWeight
                }else if(index2 == 9){
                  item2[key] = item.finishPutBatch
                }else if(index2 == 10){
                  item2[key] = item.finishOutWeight
                }else if(index2 == 11){
                  item2[key] = item.finishOutBatch
                }else if(index2 == 12){
                  item2[key] = item.finishOutShipWeight
                }else if(index2 == 13){
                  item2[key] = item.finishOutShipBatch
                }else if(index2 == 14){
                  item2[key] = item.officeHour
                }else if(index2 == 15){
                  item2[key] = item.lineHour
                }else if(index2 == 16){
                  item2[key] = item.officeAddHour
                }else if(index2 == 17){
                  item2[key] = item.lineAddHour
                }else if(index2 == 18){
                  item2[key] = item.sumAddHour
                }else if(index2 == 19){
                  item2[key] = item.sumHour
                }else if(index2 == 20){
                  item2[key] = item.efficiency
                }else if(index2 == 21){
                  item2[key] = item.invStockWeight
                }else if(index2 == 22){
                  item2[key] = item.invBlankWeight
                }else if(index2 == 23){
                  item2[key] = item.invFinishWeight
                }else if(index2 == 24){
                  item2[key] = item.positionVelocity
                }
              })
            })
            console.log(array)
            console.log(columns)
            this.list = { records: array }
            this.loading = false
          }
        })
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
