<template>
  <div>
   <!-- <list
      :columns="columns"
      :loading="loading"
      :list="list"
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       class="list-main"
       selfAdaption
    />-->
    <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true" @row-dblclick="dblclick"  @row-click="rowClick">
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
    </el-table>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { permissionsList,getRoleMenu} from "@/api/system/permissions";
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
      list: [],
      fid: null,
      type: null,
        checkDate:null,
      columns: [
        { text: "rid", name: "rid" },
        { text: "用户编码", name: "" },
        { text: "用户名称", name: "" },
        { text: "用户组", name: "" },
        { text: "对应职员", name: "" },
        { text: "说明", name: "" },
      ]
    };
  },

  methods: {
    handlerForm() {},
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
    // 弹窗拖拽
    handleDrag() {
      this.$refs.select.blur();
    },
    closedDialog() {},
    dblclick(obj) {
        this.$emit('showDialog',obj)
    },
      getClickRow(){
        return this.checkDate
      },
      //监听单击某一行
      rowClick(obj) {
          this.checkDate=obj;
          this.$emit('showTree',obj)
          this.$store.dispatch("list/setClickData", obj);
      },
    fetchData(fid, type) {
      //this.loading = true;

      const data = {
      /*  fid: fid,
        type: type,*/
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      };
      /*  permissionsList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });*/
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
