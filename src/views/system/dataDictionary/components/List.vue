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
import { delReportRules, getDictList} from "@/api/system/index";
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
        { text: "trId", name: "trId", default: false },
        { text: "名称", name: "name" },
        { text: "编码", name: "code" },
        { text: "内容", name: "remark" },
       /* { text: "数量大于", name: "numGe" },
        { text: "数量小于", name: "numLe" },*/
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
      this.loading = true
      const data = {
        /*  fid: fid,
          type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
      getDictList(data).then(res => {
        this.loading = false
        this.list = res.data
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
