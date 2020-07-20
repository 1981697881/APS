<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showSync="handlerSync" @queryBtn="query"  @uploadList="upload"/>
      </div>
      <list ref="list" @uploadList="uploadPage"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" :listInfo="listInfo" @uploadList="upload" ></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="同步信息"
      v-if="visible2"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <sync-info @hideDialog="syncWindow"  @uploadList="upload" ></sync-info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info, syncInfo } from "./form";
export default {
  components: {
    TabsBar,
    List,
    Info,
    syncInfo
  },
  data() {
    return {
      visible: null,
      listInfo: null,
      visible2: null
    };
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    syncWindow(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    handlerSync() {
      this.visible2 = true
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
