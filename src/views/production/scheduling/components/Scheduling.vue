<template>
  <div class="list-main box-shadow">
    <el-table :data="list" height="100%" border   stripe size="mini" :highlight-current-row="true"  @cell-dblclick="celldblclick" @cell-click="cellclick"  @selection-change="handleSelectionChange">
      <el-table-column type="selection"></el-table-column>
      <el-table-column prop="date" label="序号" align="center" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        align="center"
        :label="t.text"
        :width="t.width?t.width:'120px'"
        v-if="t.default!=undefined?t.default:true"
      >
        <el-table-column
          v-if="t.colspan!=undefined?t.colspan:false"
          v-for="(a,b) in t.data"
          :prop="a.name"
          :key="b"
          :label="a.text"
          align="center"
          :width="a.width?a.width:'120px'">
        </el-table-column>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import {getSemiList} from "@/api/production/index";
  import List from "@/components/List";

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
        list: [],
        columns: []
      };
    },
    methods: {
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
      Delivery(val) {
        delivery(val).then(res => {
          this.$emit('uploadList')
        });
      },
      celldblclick(row, column, cell, event) {
        this.$emit('showDialog', [row, column.property.match(/\d+/g)[0]])
      },
      cellclick(row, column, cell, event) {
        this.$store.dispatch("list/setClickData", [row, column.property.match(/\d+/g)[0]])
      },
      fetchData(val) {
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
        };
        getSemiList(data, val).then(res => {
          if (res.flag) {
            const data = res.data
            this.columns = [
              {text: '', name: 'gid', default: false},
              {text: '计划日期',width: '150px', name: '', colspan: true, data: [{text: '生产设备', width: '150px', name: 'plName'}]}
            ]
            var array = []
            const columns = this.columns
            var count = 0
            var arr = []
            // 根据时间生成表头 把时间包含数据重新组装 -》array
            for (const i in data) {
              columns.push({text: i + '', name: i + '', colspan: true, data: [{text: '旧料号', name: 'oldCode' + count}, {text: '数量', name: 'allocatedNum' + count},{text: '生产状态', name: 'allocatedStatus' + count},{text: '任务警示', name: '' + count}]})
              count++
              data[i][0].time = i
              array.push(data[i])
            }
            // 遍历组装数据
            array.forEach((item1, index) => {
              item1.forEach((item2, index2) => {
                var obj = {}
                // 根据每个时间里的数据量生成数据行
               if(arr.length == index2) {
                 eval("obj.oldCode" + index + "='" + item2.color + "'")
                 eval("obj.goodName" + index + "='" + item2.goodName + "'")
                 eval("obj.taskId" + index + "='" + item2.taskId + "'")
                 eval("obj.allocatedNum" + index + "='" + item2.allocatedNum + "'")
                 eval("obj.taskNum" + index + "='" + item2.taskNum + "'")
                 eval("obj.plId" + index + "='" + item2.plId + "'")
                 eval("obj.tpId" + index + "='" + item2.tpId + "'")
                 eval("obj.productionDate" + index + "='" + item2.productionDate + "'")
                 eval("obj.remark" + index + "='" +  (item2.remark == null? '' : item2.remark) + "'")
                 eval("obj.allocatedStatus" + index + "='" + item2.allocatedStatus + "'")
                 eval("obj.plName ='" + item2.plName + "'")
                 arr.push(obj)
               } else {
                 // 根据每个时间插入数据列
                 eval("arr["+index2+"].oldCode" + index + "='" + item2.color + "'")
                 eval("arr["+index2+"].goodName" + index + "='" + item2.goodName + "'")
                 eval("arr["+index2+"].taskId" + index + "='" + item2.taskId + "'")
                 eval("arr["+index2+"].allocatedNum" + index + "='" + item2.allocatedNum + "'")
                 eval("arr["+index2+"].taskNum" + index + "='" + item2.taskNum + "'")
                 eval("arr["+index2+"].plId" + index + "='" + item2.plId + "'")
                 eval("arr["+index2+"].tpId" + index + "='" + item2.tpId + "'")
                 eval("arr["+index2+"].productionDate" + index + "='" + item2.productionDate + "'")
                 eval("arr["+index2+"].remark" + index + "='" + (item2.remark == null? '' : item2.remark) + "'")
                 eval("arr["+index2+"].allocatedStatus" + index + "='" + item2.allocatedStatus + "'")
               }
              })
            })
            this.loading = false
            console.log(arr)
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
