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
import { delMaterial,getMaterialList} from "@/api/basic/index";
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
        { text: "gid", name: "gid",default:false },
        { text: "U9料号", name: "goodCode" },
        { text: "名称", name: "goodName" },
        { text: "类别", name: "" },
        { text: "旧料号", name: "oldCode" },
        { text: "规格", name: "spec" },
        { text: "安全数量", name: "safetyStockQty" },
        { text: "计量单位", name: "inventoryUomGroup" },
        { text: "同步时间", name: "syncTime" },
      ]
    };
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList');
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList');
    },
    dblclick(obj) {
      this.$emit('showDialog',obj.row)
    },
    Delivery(val){
      delMaterial(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.$emit('uploadList');
        }
      });
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      /*  fid: fid,
        type: type,*/
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getMaterialList(data, val).then(res => {
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
