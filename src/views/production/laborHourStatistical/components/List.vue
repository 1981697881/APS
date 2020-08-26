<template>
  <div>
   <!-- <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @dblclick="dblclick"
      @row-click="rowClick"
    />-->
    <el-table :height="height" :data="list" border size="mini" >
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        v-if="t.default!=undefined?t.default:true"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
      >
        <el-table-column
          v-if="t.data.length > 0"
          v-for="(a,b) in t.data"
          :prop="a.name"
          :key="b"
          :label="a.text"
          align="center"
          width="120">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { ratioOfWorkingHours } from '@/api/production/index'
  import List from '@/components/List'

  export default {
    components: {
      List
    },
    props: {
      // 是否自定义高度 默认100%
      height: {
        type: String,
        default: '100%'
      },
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: false
      },
    },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: [],
        columns: []
      };
    },
    methods: {
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
            {text: '项目', width: '150px', name: 'project' }
          ]
          const columns = this.columns
          for (let i = 0; i<= Number(interval); i++) {
            // 根据时间生成表头 把时间包含数据重新组装 -》array
            const obj = { text: this.getDay(arr, i).date + '', name: '', colspan: true, data: [{ width: '250px', text: '正班工时', name: 'day' + i },{ width: '250px', text: '加班工时', name: 'day' + i }] }
            columns.push(obj)
          }
          ratioOfWorkingHours(val).then(res => {
            if (res.flag) {
              const data = res.data
              let array = [
                { project: '工时' },
                { project: '入库重量' },
                { project: '入库批次' },
                { project: '移库重量' },
                { project: '移库批次' },
                { project: '调整重量' },
                { project: '调整批次' },
              /*  { project: '备料批次' },
                { project: '备料重量' },*/
                { project: '出库重量' },
                { project: '出库批次' },
                { project: '出货重量' },
                { project: '出货批次' },
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
                    item2[key] = item.hour
                  } else if(index2 == 1){
                    item2[key] = item.putWeight
                  }else if(index2 == 2){
                    item2[key] = item.putBatch
                  }else if(index2 == 3){
                    item2[key] = item.warehouseMoveWeight
                  }else if(index2 == 4){
                    item2[key] = item.warehouseMoveBatch
                  }else if(index2 == 5){
                    item2[key] = item.adjustWeight
                  }else if(index2 == 6){
                    item2[key] = item.adjustBatch
                  }
                  /*else if(index2 == 7){
                    item2[key] = item.stockWeight
                  }else if(index2 == 8){
                    item2[key] = item.stockBatch
                  }*/
                  else if(index2 == 7){
                    item2[key] = item.outWeight
                  }else if(index2 == 8){
                    item2[key] = item.outBatch
                  }else if(index2 == 9){
                    item2[key] = item.outShipWeight
                  }else if(index2 == 10){
                    item2[key] = item.outShipBatch
                  }
                })
              })
              console.log(array)
              console.log(columns)
              this.list = { records: array }
              this.loading = false
            }
          })
          console.log(columns)
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

