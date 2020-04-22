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
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { salesList ,delivery} from "@/api/indent/sales";
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
        { text: "oid", name: "oid",default:false },
        { text: "汇报日期", name: "" },
        { text: "单据号码", name: "" },
        { text: "汇报人", name: "" },
        { text: "审核人", name: "" },
          { text: "审核时间", name: "" },
          { text: "物料编码", name: "" },
          { text: "物料名称", name: "" },
        { text: "旧料号", name: "" },
        { text: "仓库", name: "" },
        { text: "仓位", name: "" },
        { text: "汇报数量", name: "" },
        { text: "入库数量", name: "" },
        { text: "批号", name: "" },
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
          delivery(val).then(res => {
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
      //this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      };
       /* salesList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });*/
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
