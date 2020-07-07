<template>
  <div class="list-main box-shadow">
    <el-table :data="list" height="100%" class="test" :cell-style="tableCellStyle" :v-loading="loading" border size="mini"  :cell-class-name="tableCellClassName" @cell-dblclick="celldblclick" @cell-click="cellclick"  @selection-change="handleSelectionChange">
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
          v-for="(a,b) in t.data"
          v-if="t.colspan!=undefined&&a.default!=false?t.colspan:false"
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
        isBatch: false,
        result: [],
        columns: []
      };
    },
    methods: {
      resetBatch(val) {
        this.isBatch = val
      },
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
      fetchData(val) {
        this.loading = true
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
        };
        getSemiList(data, val).then(res => {
          if (res.flag) {
            const data = res.data
            this.columns = [
              {text: '', name: 'gid', default: false },
              {text: '计划日期', width: '150px', name: '', colspan: true, type: false, data: [{text: '生产设备', width: '150px', name: 'plName'}]}
            ]
            var array = []
            const columns = this.columns
            var count = 0
            var arr = []
            var result = []
            var result2 = []
            var result3 = []
            // 根据时间生成表头 把时间包含数据重新组装 -》array
            for (const i in data) {
              columns.push({text: i + '', name: i + '', colspan: true, data: [{text: '旧料号', name: 'oldCode' + count}, {text: '单批次数量（kg）', default: this.isBatch, name: 'singleLotNum' + count }, {text: '批次数', default: this.isBatch, name: 'lotNum' + count }, {text: '数量(kg)', name: 'allocatedNum' + count},{text: '生产状态', name: 'allocatedStatus' + count},{text: '任务警示', name: 'alertStatus' + count, formatt: 'taskWarning'}]})
              count++
              data[i][0].time = i
              array.push(data[i])
            }
            // 遍历组装数据
            array.forEach((item1, index) => {
              item1.forEach((item2, index2) => {
                var obj = {}
                // 根据每个时间里的数据量生成数据行
                if(result.length == 0){
                  eval("obj.oldCode" + index + "='" + item2.color + "'")
                  eval("obj.goodName" + index + "='" + item2.goodName + "'")
                  eval("obj.taskId" + index + "='" + item2.taskId + "'")
                  eval("obj.allocatedNum" + index + "='" + item2.allocatedNum + "'")
                  eval("obj.taskNum" + index + "='" + item2.taskNum + "'")
                  eval("obj.plId" + index + "='" + item2.plId + "'")
                  eval("obj.tpId" + index + "='" + item2.tpId + "'")
                  eval("obj.singleLotNum" + index + "='" + item2.singleLotNum + "'")
                  eval("obj.lotNum" + index + "='" + item2.lotNum + "'")
                  eval("obj.alertStatus" + index + "=" + item2.alertStatus )
                  eval("obj.productionDate" + index + "='" + item2.productionDate + "'")
                  eval("obj.remark" + index + "='" +  (item2.remark == null? '' : item2.remark) + "'")
                  eval("obj.allocatedStatus" + index + "='" + item2.allocatedStatus + "'")
                  eval("obj.plName ='" + item2.plName + "'")
                  result.push(item2.plName)
                  result2.push(item2.plName+"/"+item2.productionDate)
                  arr.push(obj)
                } else {
                  if(result.indexOf(item2.plName) == '-1'){
                    eval("obj.oldCode" + index + "='" + item2.color + "'")
                    eval("obj.goodName" + index + "='" + item2.goodName + "'")
                    eval("obj.taskId" + index + "='" + item2.taskId + "'")
                    eval("obj.allocatedNum" + index + "='" + item2.allocatedNum + "'")
                    eval("obj.taskNum" + index + "='" + item2.taskNum + "'")
                    eval("obj.plId" + index + "='" + item2.plId + "'")
                    eval("obj.tpId" + index + "='" + item2.tpId + "'")
                    eval("obj.singleLotNum" + index + "='" + item2.singleLotNum + "'")
                    eval("obj.lotNum" + index + "='" + item2.lotNum + "'")
                    eval("obj.alertStatus" + index + "=" + item2.alertStatus )
                    eval("obj.productionDate" + index + "='" + item2.productionDate + "'")
                    eval("obj.remark" + index + "='" +  (item2.remark == null? '' : item2.remark) + "'")
                    eval("obj.allocatedStatus" + index + "='" + item2.allocatedStatus + "'")
                    eval("obj.plName ='" + item2.plName + "'")
                    result.push(item2.plName)
                    result2.push(item2.plName+"/"+item2.productionDate)
                    arr.push(obj)
                  } else {
                    if(result2.indexOf((item2.plName+"/"+item2.productionDate)) != '-1'){
                      eval("obj.oldCode" + index + "='" + item2.color + "'")
                      eval("obj.goodName" + index + "='" + item2.goodName + "'")
                      eval("obj.taskId" + index + "='" + item2.taskId + "'")
                      eval("obj.allocatedNum" + index + "='" + item2.allocatedNum + "'")
                      eval("obj.taskNum" + index + "='" + item2.taskNum + "'")
                      eval("obj.plId" + index + "='" + item2.plId + "'")
                      eval("obj.tpId" + index + "='" + item2.tpId + "'")
                      eval("obj.singleLotNum" + index + "='" + item2.singleLotNum + "'")
                      eval("obj.lotNum" + index + "='" + item2.lotNum + "'")
                      eval("obj.alertStatus" + index + "=" + item2.alertStatus )
                      eval("obj.productionDate" + index + "='" + item2.productionDate + "'")
                      eval("obj.remark" + index + "='" +  (item2.remark == null? '' : item2.remark) + "'")
                      eval("obj.allocatedStatus" + index + "='" + item2.allocatedStatus + "'")
                      eval("obj.plName ='" + item2.plName + "'")
                      arr.push(obj)
                    } else {
                      arr.some((item,index1)=>{
                        if(item.plName == item2.plName) {
                          if (result3.indexOf(item2.taskNum) == '-1') {
                            // 根据每个时间插入数据列
                            eval("arr[" + index1 + "].oldCode" + index + "='" + item2.color + "'")
                            eval("arr[" + index1 + "].goodName" + index + "='" + item2.goodName + "'")
                            eval("arr[" + index1 + "].taskId" + index + "='" + item2.taskId + "'")
                            eval("arr[" + index1 + "].allocatedNum" + index + "='" + item2.allocatedNum + "'")
                            eval("arr[" + index1 + "].taskNum" + index + "='" + item2.taskNum + "'")
                            eval("arr[" + index1 + "].alertStatus" + index + "=" + item2.alertStatus)
                            eval("arr[" + index1 + "].plId" + index + "='" + item2.plId + "'")
                            eval("arr[" + index1 + "].tpId" + index + "='" + item2.tpId + "'")
                            eval("arr[" + index1 + "].singleLotNum" + index + "='" + item2.singleLotNum + "'")
                            eval("arr[" + index1 + "].lotNum" + index + "='" + item2.lotNum + "'")
                            eval("arr[" + index1 + "].productionDate" + index + "='" + item2.productionDate + "'")
                            eval("arr[" + index1 + "].remark" + index + "='" + (item2.remark == null ? '' : item2.remark) + "'")
                            eval("arr[" + index1 + "].allocatedStatus" + index + "='" + item2.allocatedStatus + "'")
                            result3.push(item2.taskNum)
                          }
                        }
                      })
                      result2.push(item2.plName+"/"+item2.productionDate)
                    }
                  }
                }
              })
            })
            this.loading = false
            this.list = arr
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc((100vh - 330px));
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
