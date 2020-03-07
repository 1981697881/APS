<template>
  <div class="app-list">
    <type ref="tree" class="list-tree" @queryList="queryList" />
    <div class="list-container">
      <div>
        <tabs-bar @showDialog="handlerDialog" @delList="delList" @delGroup="delType" @showGroupDialog="groupDialog"  />
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
    <el-dialog
      :visible.sync="visible2"
      title="生产线信息"
      v-if="visible2"
      :width="'40%'"
      destroy-on-close
    >
      <t-detail @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></t-detail>

    </el-dialog>
  </div>
</template>

<script>
import { Type, TabsBar, List } from "./components";
import { Info, TDetail } from "./form";
import { delProductionLine, delResources} from "@/api/basic/index";
export default {
  components: {
    Type,
    TabsBar,
    List,
    TDetail,
    Info
  },
  data() {
    return {
      visible: null,
      plId: null,
      gpInfo: null,
      listInfo: null,
      visible2: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData()
    this.$refs.tree.fetchData()
  },
  methods: {
    queryList(val) {
      this.$refs.list.fetchData(val)
    },
    hideWindow(val) {
      this.visible = val
    },
    hideGroupWindow(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if (obj) this.listInfo = obj
      this.visible = true
    },
    groupDialog(obj) {
      this.gpInfo = null
      if(obj) this.gpInfo = obj
      this.visible2 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData()
    },
    //更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList(val) {
      this.loading = true
      delProductionLine(val).then(res => {
        this.loading = false
        this.list = res.data
      })
    },
    delType(val) {
      this.loading = true
      delResources(val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
