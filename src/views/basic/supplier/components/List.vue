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
import { supplierList} from "@/api/basic/index";
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
        { text: "承运商编码", name: "" },
        { text: "承运商名称", name: "" },
        { text: "联系人", name: "" },
        { text: "联系地址", name: "" },
        { text: "联系电话", name: "" },
        { text: "描述", name: "" },
      ]
    };
  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.fetchData()
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val
          this.fetchData()
      },
    dblclick(obj) {
      /*this.$emit('showDialog', obj.row)*/
    },
      Delivery(val){
          delSupplier(val).then(res => {
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
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      };
        supplierList(data).then(res => {
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
