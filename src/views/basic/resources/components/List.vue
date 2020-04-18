<template>
  <div>
    <list
      class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      selfAdaption
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { productionLineList, delProductionLine} from "@/api/basic/index";
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
      checkDate: null,
      columns: [
        { text: "plId", name: "plId", default: false},
        { text: "所属类别", name: "plTypeName" },
        { text: "产线", name: "type.tpName" },
        { text: "生产设备", name: "plName" },
        { text: "正常资源", name: "normalResources" },
        { text: "加班资源", name: "overtimeResources" },
        { text: "其他资源", name: "otherResources" },
        { text: "描述", name: "description" },
      ]
    };
  },

  methods: {
    handlerForm() {},
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
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    },
    Delivery(val) {
      delProductionLine(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.fetchData()
        }
      })
    },
    dblclick(obj) {
        this.$emit('showDialog', obj.row)
    },
      getClickRow(){
        return this.checkDate
      },
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    fetchData(val) {
      this.loading = true;
      const data = {
        /*  fid: fid,
          type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
      let obj = {}
      val != null || val != undefined ? obj.tpId = val : null
      productionLineList(data, obj).then(res => {
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
