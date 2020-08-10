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
import { efficiency } from '@/api/production/index'
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
    getDaysBetween(dateString1,dateString2){
      let dateStart = Date.parse(dateString1);
      let dateEnd = Date.parse(dateString2);
      let days = (dateEnd - dateStart)/(1*24*60*60*1000);
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
      let interval = this.getDaysBetween(val.dateStart, val.dateEnd)
      if(interval > 100){
        return this.$message({
          message: '抱歉，超出可查询范围！',
          type: 'warning'
        });
      } else {
        let startData = val.dateStart
        startData = startData.replace(/:/g,'-')
        startData = startData.replace(/ /g,'-')
        let arr = startData.split('-')
        this.columns = [
          {text: '项目', width: '150px', name: 'project' }
        ]
        const columns = this.columns
        for (let i = 0; i<= Number(interval); i++) {
          // 根据时间生成表头 把时间包含数据重新组装 -》array
          columns.push({text: this.getDay(arr, i).date + '', name: this.getDay(arr, i).date + ''})
        }
        efficiency('美瓷胶灌装', val).then(res => {
          if (res.flag) {
            const data = res.data
            let array = [
              { project: '美瓷胶灌装线产量(pcs)' },
              { project: '美瓷胶灌装线效率(pcs/h)' },
              { project: '美瓷胶包装线产量(pcs)' },
              { project: '美瓷胶包装线效率(pcs/h)' },

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
                  item2[key] = item.mainYield
                } else if(index2 == 1){
                  item2[key] = item.mainEfficiency
                }else if(index2 == 2){
                  item2[key] = item.otherYield
                }else if(index2 == 3){
                  item2[key] = item.otherEfficiency
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
