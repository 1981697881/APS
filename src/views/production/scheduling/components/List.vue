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
        { text: "taskId", name: "taskId",default: false },
        { text: "plId", name: "plId",default: false },
        { text: "订单日期", name: "soDate" },
        { text: "订单号", name: "soNum" },
        { text: "排产单号", name: "taskNum" },
        { text: "项目名称", name: "soName" },
        { text: "色号/旧料号", name: "color" },
        { text: "订单数量", name: "odPrNum" },
        { text: "计划数量", name: "allocatedNum" },
        { text: "实际完工数量", name: "productionQuantity" },
        { text: "计划日期", name: "productionDate" },
        { text: "产品分类", name: "" },
        { text: "生产设备", name: "plName" },
        { text: "生产类型", name: "productionType" },
        { text: "生产状态", name: "allocatedStatus" },
        { text: "任务警示", name: "" },
        { text: "备注", name: "remark" },
      ]
    };
  },
  methods: {

    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections',val)
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData();
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.fetchData();
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
  height: calc((100vh - 330px));
}
</style>

