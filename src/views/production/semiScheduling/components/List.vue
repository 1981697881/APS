<template>
  <div class="list-main box-shadow">
    <el-table :data="list" height="100%" :cell-style="tableCellStyle" :v-loading="loading" size="mini" :highlight-current-row="true" :cell-class-name="tableCellClassName" @cell-dblclick="celldblclick" @cell-click="cellclick"  @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号" align="center" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        align="center"
        :label="t.text"
        :width="t.width?t.width:'120px'"
        :formatter="null"
        v-if="t.default!=undefined?t.default:true"
      >
        <el-table-column
          v-if="t.colspan!=undefined?t.colspan:false"
          v-for="(a,b) in t.data"
          :prop="a.name"
          :key="b"
          :label="a.text"
          align="center"
          :formatter="a.formatt!=undefined?taskWarning: null"
          :width="a.width?a.width:'120px'">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import {getSemiList} from "@/api/production/index";
  export default {
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: [],
        result: [],
        columns: []
      };
    },
    methods: {
      taskWarning(row, column) {
        let stau = ''
        for(let i in row) {
          if (row[column.property] == 1) {
            if(row['isClash' + column.property.replace('alertStatus','')]) {
              stau = '延误,冲突'
            } else {
              stau = '延误'
            }
          } else if (row[column.property] == 3) {
            if(row['isClash' + column.property.replace('alertStatus','')]) {
              stau = '加急,冲突'
            } else {
              stau = '加急'
            }
          } else if (row[column.property] == 4) {
            if(row['isClash' + column.property.replace('alertStatus','')]) {
              stau = '暂停,冲突'
            } else {
              stau = '暂停'
            }
          } else if (row[column.property] == 0) {
            if(row['isClash' + column.property.replace('alertStatus','')]) {
              stau = '正常,冲突'
            } else {
              stau = '正常'
            }
          }
        }
        return stau
      },
      tableCellClassName({row, column, rowIndex, columnIndex}) {
        if((columnIndex-2) % 4 == 0 && (columnIndex-2) != 0) {
          for(let i in row){
            if(i.replace(/\d+/g,"") == 'alertStatus'){
              if (row[column.property] == 3) {
                if(row['isClash' + column.property.split("alertStatus")[1]]){
                  return 'suspended-row1'
                }else{
                  return 'urgent-row'
                }
              } else if (row[column.property] == 4) {
                if(row['isClash' + column.property.split("alertStatus")[1]]){
                  return 'suspended-row2'
                }else{
                  return 'conflict-row'
                }
              } else if (row[column.property] == 1) {
                if(row['isClash' + column.property.split("alertStatus")[1]]){
                  return 'suspended-row3'
                }else{
                  return 'delay-row'
                }
              } else if (row[column.property] == 0) {
                if(row['isClash' + column.property.split("alertStatus")[1]]){
                  return 'suspended-row0'
                }else{
                  return ''
                }
              } else {
                return ''
              }
            }
          }
        }
        //}
      },
      // 监听多选 参数-所有选中的值
      handleSelectionChange(val){
        this.$store.dispatch('list/setSelections',val)
      },
      //监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.fetchData();
      },
      //监听当前页
      handleCurrent(val) {
        this.list.current = val;
        this.fetchData();
      },
      dblclick(obj) {
        this.$emit('showDialog', obj.row)
      },
      celldblclick(row, column, cell, event) {
        this.$emit('showDialog', [row, column.property.match(/\d+/g)[0]])
      },
      cellclick(row, column, cell, event) {
        this.row = row
        this.column = column
        this.$store.dispatch("list/setClickData", [row, column.property.match(/\d+/g)[0]])
      },
      getDaysBetween(dateString1,dateString2){
        let startDate = Date.parse(dateString1);
        let endDate = Date.parse(dateString2);
        let days = (endDate - startDate)/(1*24*60*60*1000);
        // alert(days);
        return  days
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
      tableCellStyle(row, rowIndex, column) {
        if (this.row === row.row) {
          let col1 = row.column.property
          let col2 = this.column.property
          if(col1 != undefined && col2 != undefined){
            if(col2.replace(/[^0-9]/ig,"") === col1.replace(/[^0-9]/ig,"")){
              return 'background-color:#ccc;'
            }else {
              return 'background-color:#fff;'
            }
          }
        }
      },
      compare(p){
        return function (m, n) {
          let a = m[p]
          let b = n[p]
          return a.localeCompare(b);
        }
      },
      fetchData(val) {
        this.loading = true
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
        };
        let interval = this.getDaysBetween(val.productionDateStart, val.productionDateEnd)
        if(interval > 100){
          return this.$message({
            message: '抱歉，超出可查询范围！',
            type: 'warning'
          });
        } else {
          getSemiList(data, val).then(res => {
            if (res.flag) {
              const data = res.data
              this.columns = [
                {text: '', name: 'gid', default: false},
                {text: '计划日期',width: '150px', name: '', colspan: true, data: [{text: '生产设备', width: '150px', name: 'plName'}]}
              ]
              var array = []
              let startData = val.productionDateStart
              startData = startData.replace(/:/g,'-')
              startData = startData.replace(/ /g,'-')
              let arr = startData.split('-')
              const columns = this.columns
              var result = []
              var result2 = []
              // 根据时间生成表头 把时间包含数据重新组装 -》array
              for (let i = 0; i<= Number(interval); i++) {
                columns.push({text: this.getDay(arr, i).date + '', name: this.getDay(arr, i).date + '', colspan: true, data: [{text: '旧料号', name: 'oldCode' + i}, {text: '数量(kg)', name: 'allocatedNum' + i},{text: '生产状态', name: 'allocatedStatus' + i},{text: '任务警示', name: 'alertStatus' + i, formatt: 'taskWarning'}]})
                array.push(this.getDay(arr, i).date)
              }
              var arrObj = {}
              // 遍历组装数据
              for(let i in data){
                  data[i].some((item3, index3) => {
                    array.forEach((item2, index2) => {
                    let date = item3['productionDate']
                    date = date.replace(/:/g,'-')
                    date = date.replace(/ /g,'-')
                    let arr1 = date.split('-')
                    let key = this.getDay(arr1, 0).date + ''
                    if(item2 == key){
                      if(result.length > 0){
                        result.some((item4, index4)=>{
                            console.log(index4)
                            if(typeof(item4['oldCode'+index2]) == 'undefined' && item4['plName'] == i){
                              console.log(1)
                              console.log(item3.allocatedNum)
                              eval("item4.oldCode" + index2 + "='" + item3.color + "'")
                              eval("item4.goodName" + index2 + "='" + item3.goodName + "'")
                              eval("item4.taskId" + index2 + "='" + item3.taskId + "'")
                              eval("item4.allocatedNum" + index2 + "='" + item3.allocatedNum + "'")
                              eval("item4.taskNum" + index2 + "='" + item3.taskNum + "'")
                              eval("item4.alertStatus" + index2 + "=" + item3.alertStatus)
                              eval("item4.plId" + index2 + "='" + item3.plId + "'")
                              eval("item4.tpId" + index2 + "='" + item3.tpId + "'")
                              eval("item4.lotNo" + index2 + "='" + item3.lotNo + "'")
                              eval("item4.estimatedStorage" + index2 + "='" + item3.estimatedStorage + "'")
                              eval("item4.singleLotNum" + index2 + "='" + item3.singleLotNum + "'")
                              eval("item4.lotNum" + index2 + "='" + item3.lotNum + "'")
                              eval("item4.productionDate" + index2 + "='" + item3.productionDate + "'")
                              eval("item4.productionQuantity" + index2 + "='" + item3.productionQuantity + "'")
                              eval("item4.remark" + index2 + "='" + (item3.remark == null ? '' : item3.remark) + "'")
                              eval("item4.allocatedStatus" + index2 + "='" + item3.allocatedStatus + "'")
                              return true
                            } else {
                              console.log(2)
                              console.log(item3.allocatedNum)
                              var obj = {}
                              // 根据每个时间里的数据量生成数据行
                              eval("obj.oldCode" + index2 + "='" + item3.color + "'")
                              eval("obj.goodName" + index2 + "='" + item3.goodName + "'")
                              eval("obj.taskId" + index2 + "='" + item3.taskId + "'")
                              eval("obj.allocatedNum" + index2 + "='" + item3.allocatedNum + "'")
                              eval("obj.taskNum" + index2 + "='" + item3.taskNum + "'")
                              eval("obj.plId" + index2 + "='" + item3.plId + "'")
                              eval("obj.tpId" + index2 + "='" + item3.tpId + "'")
                              eval("obj.alertStatus" + index2 + "=" + item3.alertStatus )
                              eval("obj.productionDate" + index2 + "='" + item3.productionDate + "'")
                              eval("obj.remark" + index2 + "='" +  (item3.remark == null? '' : item3.remark) + "'")
                              eval("obj.allocatedStatus" + index2 + "='" + item3.allocatedStatus + "'")
                              eval("obj.plName ='" + i + "'")
                              eval("obj.productionQuantity" + index2 + "='" + item3.productionQuantity + "'")
                              eval("obj.estimatedStorage" + index2 + "='" + item3.estimatedStorage + "'")
                              eval("obj.lotNo" + index2 + "='" + item3.lotNo + "'")
                              result.push(obj)
                              return true
                            }
                        })
                      } else {
                        var obj = {}
                        // 根据每个时间里的数据量生成数据行
                        eval("obj.oldCode" + index2 + "='" + item3.color + "'")
                        eval("obj.goodName" + index2 + "='" + item3.goodName + "'")
                        eval("obj.taskId" + index2 + "='" + item3.taskId + "'")
                        eval("obj.allocatedNum" + index2 + "='" + item3.allocatedNum + "'")
                        eval("obj.taskNum" + index2 + "='" + item3.taskNum + "'")
                        eval("obj.plId" + index2 + "='" + item3.plId + "'")
                        eval("obj.tpId" + index2 + "='" + item3.tpId + "'")
                        eval("obj.alertStatus" + index2 + "=" + item3.alertStatus )
                        eval("obj.productionDate" + index2 + "='" + item3.productionDate + "'")
                        eval("obj.remark" + index2 + "='" +  (item3.remark == null? '' : item3.remark) + "'")
                        eval("obj.allocatedStatus" + index2 + "='" + item3.allocatedStatus + "'")
                        eval("obj.plName ='" + i + "'")
                        eval("obj.productionQuantity" + index2 + "='" + item3.productionQuantity + "'")
                        eval("obj.estimatedStorage" + index2 + "='" + item3.estimatedStorage + "'")
                        eval("obj.lotNo" + index2 + "='" + item3.lotNo + "'")
                        result.push(obj)
                      }
                    }
                  })
                })
              }
             /* result.sort(this.compare('plName'))*/
            /*  console.log(result)*/
              this.loading = false
              this.list = result
            }
          });
        }
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc((100vh - 350px));
  }
</style>
<style>
  .urgent-row {
    color: red;
  }
  .delay-row {
    color: orange;
  }
  .conflict-row {
    color: blue;
  }
  .suspended-row0 {
    background-color: #CD69C9 !important;
  }
  .suspended-row1 {
    background-color: #CD69C9 !important;
    color: red;
  }
  .suspended-row2 {
    background-color: #CD69C9 !important;
    color: blue;
  }
  .suspended-row3 {
    background-color: #CD69C9 !important;
    color: orange;
  }

</style>
