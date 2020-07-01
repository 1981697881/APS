<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog"  @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list" @showDialog="handlerDialog" @uploadList="uploadPage" />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="明细信息"
      v-if="visible"
      v-dialogDrag
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>
<script>
import { TabsBar, List } from "./components";
import { Info, } from "./form";
export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      listInfo: null,
    }
  },
  mounted() {
    this.$refs.list.fetchData()
  },
  methods: {
    queryList(val) {
      this.$refs.list.fetchData(val)
    },
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
