<template>
  <div class="app-list">
    <type ref="tree" class="list-tree" @queryList="queryList" />
    <div class="list-container">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @delList="delList" @uploadList="uploadAll" @queryBtn="query" @delGroup="delType" @showGroupDialog="groupDialog"  />
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="用户设备信息"
      v-if="visible"
      :width="'60%'"
      v-dialogDrag
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="生产线信息"
      v-if="visible2"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <t-detail @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></t-detail>
    </el-dialog>
  </div>
</template>
<script>
import { Type, TabsBar, List } from "./components";
import { Info, TDetail } from "./form";

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
      if (obj) {
        this.obj = JSON.parse(JSON.stringify(obj));
        this.obj.workDay = this.obj.workDay==''?[]:this.obj.workDay.split(',')
        this.obj.tpId = this.obj.type.tpId
        delete this.obj.type
        this.listInfo = this.obj
      }
      console.log(this.listInfo)
      this.visible = true
    },
    groupDialog(obj) {
      this.gpInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        info.type = obj.parent
        this.gpInfo = info
      }
      this.visible2 = true
    },
    uploadAll() {
      this.uploadGroup()
      this.upload()
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData()
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList(val) {
      if(val) {
        this.$refs.list.Delivery(val)
      }
    },
    delType(val) {
      if(val) {
        this.$refs.tree.Delivery(val)
      }
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
