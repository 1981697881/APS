<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { delReportRules, getReportRulesList} from "@/api/basic/index";
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
        { text: "priId", name: "priId", default: false },
        { text: "名称", name: "name" },
        { text: "类型", name: "tpName" },
        { text: "包含料号", name: "includeCode" },
        { text: "不包含料号", name: "excludeCode" },
        { text: "包含名称", name: "includeName" },
        { text: "不包含名称", name: "excludeName" },
        { text: "包含旧料号", name: "includeOldCode" },
        { text: "不包含旧料号", name: "excludeOldCode" },
        { text: "生产设备包含名称", name: "includePlName" },
        { text: "生产设备不包含名称", name: "excludePlName" },
        { text: "料号开头", name: "startCode" },
        { text: "旧料号开头", name: "startOldCode" },
      ]
    };
  },
  methods: {
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
      this.$emit('showDialog',obj.row)
    },
      Delivery(val){
        delReportRules(val).then(res => {
          if(res.flag){
            this.$store.dispatch("list/setClickData", '');
            this.fetchData();
          }
          });
      },
      //监听单击某一行
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
      getReportRulesList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
