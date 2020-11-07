<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showDialogT="handlerDialogT" @queryBtn="query" @uploadList="uploadList"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="uploadPage"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="异常排程信息"
      v-if="visible"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="uploadList" :soId="soId"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="厂务预计出厂日期"
      v-if="visible2"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <detail-t @hideDialog="hideWindow2" @uploadList="uploadList" :listInfo="listInfo"></detail-t>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components"
import { Info,DetailT } from "./form"

export default {
  components: {
    TabsBar,
    List,
    DetailT,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      soDeId: null,
      listInfo: null,
      soId: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    hideWindow2(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      if (obj) this.soId = obj.soId
      this.visible = true
    },
    handlerDialogT(obj) {
      this.listInfo = null
      if (obj) {
        this.obj = JSON.parse(JSON.stringify(obj));
        this.listInfo = this.obj
        this.visible2 = true
      }
    },
    // 更新列表
    uploadList(val) {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    //查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
