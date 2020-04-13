<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar @showDialog="handlerDialog" @uploadList="upload" @queryBtn="query"/>
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="用户信息"
      v-if="visible"
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
      if (obj) this.listInfo = obj
      this.visible = true
    },
    // 查询
    query(val) {
      this.$refs.list.uploadPr(val)
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData()
    },
  }
}
</script>

<style lang="scss" scoped>
</style>
