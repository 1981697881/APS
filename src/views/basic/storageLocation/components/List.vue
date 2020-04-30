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
       @selection-change="handleSelectionChange"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { getStorageList } from "@/api/basic/index";
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
      columns: [
        { text: "piId", name: "piId", default: false },
        { text: "仓库", name: "" },
        { text: "区域", name: "" },
        { text: "库位编码", name: "piCode" },
        { text: "库位名称", name: "piName" },
        { text: "描述", name: "remark" },
      ]
    };
  },
  methods: {
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
      this.$emit('showDialog',obj.row)
    },
    // 监听多选 参数-所有选中的值
    handleSelectionChange(val){
      this.$store.dispatch('list/setSelections', val)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    fetchData(fid, type) {
      this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
      getStorageList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
