<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @uploadList="upload" @showDialog="handlerDialog" @queryBtn="query"/>
      </div>
      <list ref="list" @uploadList="uploadPage"/>
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
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info } from "./form";
export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      gid: null,
      listInfo: null,
      orderId: null,
      createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
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
    // 更新列表
    upload() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }, // 查询
    uploadPage() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
