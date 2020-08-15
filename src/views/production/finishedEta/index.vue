<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <el-container class="list-containerOther">
      <el-header>
        <tabs-bar ref="tabs" @uploadList="upload" @queryBtn="query"/>
      </el-header>
      <el-main>
        <list ref="list"/>
      </el-main>
      <el-footer>
        <line-chart ref="pie"></line-chart>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import { TabsBar, LineChart, List } from "./components";
import { efficiency } from '@/api/production/index'
export default {
  components: {
    TabsBar,
    List,
    LineChart,
  },
  data() {
    return {
      visible: null,
      visible2: null,
      gid: null,
        orderId: null,
        createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
        this.$refs.list.fetchData(this.fetchData(this.$refs.tabs.qFilter()))
    },
  methods: {
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
    getDaysBetween(dateString1,dateString2){
      let dateStart = Date.parse(dateString1);
      let dateEnd = Date.parse(dateString2);
      let days = (dateEnd - dateStart)/(1*24*60*60*1000);
      // alert(days);
      return  days
    },
    // 查询
    query() {
      this.$refs.list.fetchData(this.fetchData(this.$refs.tabs.qFilter()))
    },
    fetchData(val) {
      let interval = this.getDaysBetween(val.dateStart, val.dateEnd)
      let columns = []
      let array = []
      let arrayDay = []
      let mainYield = []
      let mainEfficiency = []
      let otherYield = []
      let otherEfficiency = []
      if (interval > 100) {
        return this.$message({
          message: '抱歉，超出可查询范围！',
          type: 'warning'
        });
      } else {
        let startData = val.dateStart
        startData = startData.replace(/:/g, '-')
        startData = startData.replace(/ /g, '-')
        let arr = startData.split('-')
        columns = [
          {text: '项目', width: '150px', name: 'project'}
        ]
        /*for (let i = 0; i <= Number(interval); i++) {
          // 根据时间生成表头 把时间包含数据重新组装 -》array
          columns.push({text: this.getDay(arr, i).date + '', name: this.getDay(arr, i).date + ''})
          arrayDay.push(this.getDay(arr, i).date)
        }*/
        array = [
          {project: '真石漆线产量(kg)'},
          {project: '真石漆线效率(kg/h)'},
          {project: 'PCK线产量(kg)'},
          {project: 'PCK线效率(kg/h)'},
        ]
        let arrayTemp = [
          {project: '真石漆线产量(kg)'},
          {project: '真石漆线效率(kg/h)'},
          {project: 'PCK线产量(kg)'},
          {project: 'PCK线效率(kg/h)'},
        ]
        efficiency('主业成品', val).then(res => {
          if (res.flag) {
            const data = res.data
            for (let i = 0; i <= Number(interval); i++) {
              // 根据时间生成表头 把时间包含数据重新组装 -》array
              columns.push({text: this.getDay(arr, i).date + '', name: this.getDay(arr, i).date + ''})
              arrayDay.push(this.getDay(arr, i).day)
              if(typeof data[i] == 'undefined') {
                mainYield.push(0)
                mainEfficiency.push(0)
                otherYield.push(0)
                otherEfficiency.push(0)
              } else {
                for(let j in data[i]){
                  if (j == 'mainYield') {
                    mainYield.push((data[i].mainYield == null ? 0 : data[i].mainYield))
                  } else if (j == 'mainEfficiency') {
                    mainEfficiency.push((data[i].mainEfficiency == null ? 0 : data[i].mainEfficiency))
                  } else if (j == 'otherYield') {
                    otherYield.push((data[i].otherYield == null ? 0 : data[i].otherYield))
                  } else if (j == 'otherEfficiency') {
                    otherEfficiency.push((data[i].otherEfficiency == null ? 0 : data[i].otherEfficiency))
                  }
                }
                /*let aDate = data[i].date.replace(/:/g, '-')
                aDate = aDate.replace(/ /g, '-')
                let nDate = aDate.split('-')
                console.log(this.doHandleMonth(i+1) +","+ this.getDay(nDate, 0).day)
                if (this.doHandleMonth(i+1) == this.getDay(nDate, 0).day) {
                  arrayTemp.forEach((item2, index2) => {
                    if (index2 == 0) {
                      mainYield.push((data[i].mainYield == null ? 0 : data[i].mainYield))
                    } else if (index2 == 1) {
                      mainEfficiency.push((data[i].mainEfficiency == null ? 0 : data[i].mainEfficiency))
                    } else if (index2 == 2) {
                      otherYield.push((data[i].otherYield == null ? 0 : data[i].otherYield))
                    } else if (index2 == 3) {
                      otherEfficiency.push((data[i].otherEfficiency == null ? 0 : data[i].otherEfficiency))
                    }
                  })
                }*/
              }
            }
            data.forEach((item, index) => {
              array.forEach((item2, index2) => {
                let date = item['date']
                date = date.replace(/:/g, '-')
                date = date.replace(/ /g, '-')
                let arr1 = date.split('-')
                let key = this.getDay(arr1, 0).date + ''
                if (index2 == 0) {
                  item2[key] = item.mainYield
                } else if (index2 == 1) {
                  item2[key] = item.mainEfficiency
                } else if (index2 == 2) {
                  item2[key] = item.otherYield
                } else if (index2 == 3) {
                  item2[key] = item.otherEfficiency
                }
              })
            })
          }
          this.$nextTick(() => {
            this.$refs.pie.initChart({arrayDay: arrayDay, mainYield: mainYield, mainEfficiency: mainEfficiency, otherYield: otherYield, otherEfficiency: otherEfficiency})
          })
        })
      }
      return {array: array, columns: columns}
    },
    // 查询
    uploadPage() {
      this.$refs.list.fetchData(this.fetchData(this.$refs.tabs.qFilter()))
    },
    // 更新列表
    upload(){
      this.$refs.list.fetchData(this.fetchData(this.$refs.tabs.qFilter()))
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
