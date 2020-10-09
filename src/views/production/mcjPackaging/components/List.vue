<template>
  <div class="list-main box-shadow">
   <!-- <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @dblclick="dblclick"
      @row-click="rowClick"
    />-->
    <el-table :height="height" :data="list.records" border size="mini" >
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :fixed="t.fixed"
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
  import { colorStoreParticleSize } from '@/api/production/index'
  import { getReportRulesList } from '@/api/basic/index'
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
          const multiHeader = []
          // 与表头相对应的数据里边的字段
          const filterVal = []
          let result = []
          columns.forEach((item, index) => {
            if(item.colspan){
              item.data.forEach((item2, index2) =>{
                multiHeader.push(item2.text)
                if(result.indexOf(item.text)==-1){
                  tHeader.push(item.text)
                  result.push(item.text)
                }else{
                  tHeader.push('')
                }
                filterVal.push(item2.name)
              })
            }else{
              multiHeader.push('')
              tHeader.push(item.text)
              filterVal.push(item.name)
            }
          })
          const merges = []
          const list = this.list.records
          const data = this.formatJson(filterVal, list)
          // 这里还是使用export_json_to_excel方法比较好，方便操作数据
          excel.export_json_to_excel([tHeader], data, '美瓷胶包装线色系统计表', multiHeader, merges)
        })
      },
      formatJson(filter, jsonDate){
        return jsonDate.map(v =>
            filter.map(j => {
              return v[j]
            })
        )
      },
      getDaysBetween(date1,date2){
        // 拆分年月日
        date1 = date1.split('-');
        // 得到月数
        date1 = parseInt(date1[0]) * 12 + parseInt(date1[1]);
        // 拆分年月日
        date2 = date2.split('-');
        // 得到月数
        date2 = parseInt(date2[0]) * 12 + parseInt(date2[1]);
        var m = Math.abs(date1 - date2);
        // alert(days);
        return  m
      },
      uploadPr(val) {
        this.fetchData(val)
      },
      // 查询前后三天日期
      getMonth(date, day){
        var today = new Date(date[0], date[1]-1);
        var targetday_milliseconds=today.getTime()
        today.setTime(targetday_milliseconds) //注意，这行是关键代码
        var tYear = today.getFullYear()
        var tMonth = today.getMonth()
        var tDate = today.getDate()
        var getDay = today.getDay()
        tMonth = this.doHandleMonth(tMonth + 1 + day)
        tDate = this.doHandleMonth(tDate)
        var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
        var week = weeks[getDay]
        return {
          day: tDate,
          week: week,
          month: tYear + "-" + tMonth
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
        let array1 = []
        let array2 = []
        getReportRulesList({
          pageNum: 1,
          pageSize: 50
        }, { tpName: '美瓷胶色系' }).then(reso => {
          array1 = reso.data.records
          getReportRulesList({
            pageNum: 1,
            pageSize: 50
          }, { tpName: '美瓷胶产品分类' }).then(rest => {
            array2 = rest.data.records
            let interval = this.getDaysBetween(val.startDate, val.endDate)
            if(interval > 3){
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
                {text: '时间段', width: '150px', colspan: true,fixed: true, data: [{width: '250px', text: '色系/产品分类', name: 'project'}] }
              ]
              const columns = this.columns
              for (let i = 0; i <= Number(interval); i++) {
                // 根据时间生成表头 把时间包含数据重新组装 -》array
                const obj = { text: this.getMonth(arr, i).month + '', name: '', colspan: true}
                let rArray = []
                array2.forEach((ao, aoIndex) => {
                  let rbj = { width: '250px', text: ao.name, name: this.getMonth(arr, i).month + '/' + ao.name }
                  rArray.push(rbj)
                })
                obj.data = rArray
                columns.push(obj)
              }
              let array = []
              array1.forEach((a, b) => {
                let obj = { project: a.name }
                array.push(obj)
              })
               colorStoreParticleSize(val, '美瓷胶色系').then(res => {
                 if (res.flag) {
                   const data = res.data
                     for(let item in data){
                       let key = item
                       for(let val in data[item]) {
                         data[item][val].forEach((item2, index2) => {
                           if(array[index2]['project'] == item2.name) {
                             array[index2][key+'/'+val] = item2.num
                           }
                           /*if(index2 == 0) {
                             item2[key] = item.rspWorkHours
                           } else if(index2 == 1){
                             item2[key] = item.pckWorkHours
                           }else if(index2 == 2){
                             item2[key] = item.baseWorkHours
                           }else if(index2 == 3){
                             item2[key] = item.colorStoreWorkHours
                           }else if(index2 == 4){
                             item2[key] = item.apgBaseWorkHours
                           }else if(index2 == 5){
                             item2[key] = item.apgToningWorkHours
                           }else if(index2 == 6){
                             item2[key] = item.apgFillingWorkHours
                           } else if(index2 == 7){
                             item2[key] = item.apgPackageWorkHours
                           }*/
                         })
                       }
                     }
                   }
                    console.log(array)
                   this.list = { records: array }
                   this.loading = false
               })
            }
          })
        })


      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc(100vh - 250px);
  }
</style>

