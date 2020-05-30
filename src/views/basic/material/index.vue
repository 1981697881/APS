<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @syncDialog="handlerSyncDialog" @printDialog="handlerPrintDialog" @queryBtn="query"  @delList="delivery" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="upload"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" :listInfo="listInfo" @uploadList="upload" ></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="同步信息"
      v-if="visible2"
      :width="'50%'"
      v-dialogDrag
      destroy-on-close
    >
      <sync-info @hideDialog="hideSyncWindow"  @uploadList="upload" ></sync-info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="打印信息"
      v-if="visible3"
      :width="'50%'"
      v-dialogDrag
      destroy-on-close
    >
      <print-detail @hideDialog="hidePrintWindow" :listInfo="listInfo" @uploadList="upload" ></print-detail>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info, syncInfo, printDetail } from "./form";

export default {
  components: {
    TabsBar,
    List,
    printDetail,
    syncInfo,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      visible3: null,
      listInfo: null,
    };
  },
  mounted() {
    this.$refs.list.fetchData()
  },
  methods: {
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj.gid)
      }
    },
    hideWindow(val){
      this.visible = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) {
        this.obj = JSON.parse(JSON.stringify(obj));
        this.listInfo = this.obj
        this.visible = true
      }
    },
    hideSyncWindow(val) {
      this.visible2 = val
    },
    hidePrintWindow(val) {
      this.visible3 = val
    },
    handlerSyncDialog(obj) {
      this.visible2 = true
    },
    handlerPrintDialog(obj) {
      this.listInfo = null
      if (obj) {
        this.obj = JSON.parse(JSON.stringify(obj));
        this.listInfo = this.obj
        this.visible3 = true
      }
    },
    // 更新列表
    upload(){
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 查询
    query(val) {
      this.$refs.list.fetchData(val)
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
