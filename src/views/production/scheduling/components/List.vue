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
import { getSchedulingList ,delivery} from "@/api/production/index";
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
        { text: "订单日期", name: "" },
        { text: "订单号", name: "" },
        { text: "生产线", name: "" },
        { text: "订单数量", name: "" },
          { text: "旧料号", name: "" },
          { text: "色号", name: "" },
          { text: "客户", name: "" },
          { text: "到货城市", name: "" },
          { text: "销售部门", name: "" },
          { text: "销售业务员", name: "" },
          { text: "订单类型", name: "" },
          { text: "生产状态", name: "" },
      ]
    };
  },
  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
          this.fetchData(this.node.data.fid,this.node.data.type);
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
          this.fetchData(this.node.data.fid,this.node.data.type);
      },
    dblclick(obj) {
      this.$emit('showDialog',obj.row)
    },
      Delivery(val){
          delivery(val).then(res => {
              this.$emit('uploadList')
          });
      },
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    fetchData(val) {
      this.loading = true;
      const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      }
      let obj = {}
      val != null || val != undefined ? obj.query = val : null
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
  height: calc((100vh - 320px)/2);
}
</style>
