<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
       timeColor
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @selection-change="handleSelectionChange"
       @row-click="rowClick"
    />
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getSchedulingList } from "@/api/production/index";
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
      list: {},
      multipleSelection: [],
      columns: [
        { text: '订单日期', name: 'soDate', width: '150px', sort: true },
        { text: '色号/旧料号', name: 'color', width: '180px' },
        { text: '参照料号1', name: 'codeOne', width: '180px'},
       /* { text: '参照料号2', name: 'codeTwo', width: '180px'},*/
        { text: '订单数量', name: 'odPrNum' },
        { text: '库存数量', name: 'evenNum' },
        { text: '最高安全库存', name: 'maxStock' },
        { text: '最低安全库存', name: 'minStock' },
        { text: '计划数量', name: 'allocatedNum' },
        { text: '计划日期', name: 'productionDate', width: '150px', sort: true },
        { text: '实际完工数量', name: 'productionQuantity' },
        { text: '生产设备', name: 'plName' },
        { text: '产品分类', name: 'productType' },
        { text: '任务警示', name: 'alertStatus', formatt: 'taskWarning' },
        { text: '项目名称', name: 'soName' , width: '150px' },
        { text: '生产状态', name: 'allocatedStatus' },
        { text: '生产类型', name: 'productionType', width: '100px' },
        { text: '备注', name: 'remark' },
        { text: '订单号', name: 'soNum' , width: '150px', sort: true },
        { text: '排产单号', name: 'taskNum', width: '150px', sort: true },
      ]
    };
  },
  methods: {
    ExportData() {
      import("@/vendor/Export2Excel").then(excel => {
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
        console.log(list)
        console.log(filterVal)
        const data = this.formatJson(filterVal, list);
        console.log(data)
        // 这里还是使用export_json_to_excel方法比较好，方便操作数据
        excel.export_json_to_excel([tHeader],data,'美瓷胶成品线计划')
      })
    },
    formatJson(filter, jsonDate){
      return jsonDate.map(v =>
        filter.map(j => {
          return v[j]
        })
      )
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections',val)
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList')
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    fetchData(val) {
      this.loading = true
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }
      let obj = {}
      val != null || val != undefined ? obj = val : null
      getSchedulingList(data, obj).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc((100vh - 350px));
}
</style>

