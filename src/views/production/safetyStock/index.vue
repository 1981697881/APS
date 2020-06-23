<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @uploadList="uploadList"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
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
  </div>
</template>

<script>
import { TabsBar, List } from "./components"
import { Info } from "./form"

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      soId: null
    };
  },
  mounted() {
    this.$refs.list.fetchData()
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      if (obj) this.soId = obj.soId
      this.visible = true
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    uploadList(val) {
      this.$refs.list.fetchData(val)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
