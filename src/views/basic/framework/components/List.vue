<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
    <!--<el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true" @row-dblclick="dblclick"  @row-click="rowClick">
      <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        v-if="t.default!=undefined?t.default:true"
        :width="t.width?t.width:''"
      ></el-table-column>
    </el-table>-->
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import {getFrameList} from "@/api/basic/index";
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
      visible: false,
      list: {},
      fid: null,
      type: null,
      checkDate:null,
      columns: [
        { text: "deptId", name: "deptId", default: false},
        { text: "编码", name: "deptCode" },
        { text: "名称", name: "deptName" },
        { text: "上级组织", name: "deptParent", default: false },
        { text: "上级组织", name: "deptParentName" },
        { text: "组织属性", name: "orgAttr" },
        { text: "状态", name: "isDel" },
      ]
    };
  },

  methods: {
    handlerForm() {},
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.checkDate = obj
      this.$emit('showTree', obj)
      this.$store.dispatch("list/setClickData", obj.row)
    },
    fetchData(fid, type) {
      this.loading = true;
      const data = {
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }
      getFrameList(data).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
