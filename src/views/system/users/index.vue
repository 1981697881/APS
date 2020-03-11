<template>
  <div class="app-list">
    <Tree ref="tree" class="list-tree" />
    <div class="list-container">
      <div>
        <tabs-bar @showDialog="handlerDialog" @delList="delList" @delGroup="delGroup" @showGroupDialog="groupDialog"  />
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
      title="用户组信息"
      v-if="visible2"
      :width="'40%'"
      destroy-on-close
    >
      <group @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></group>

    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar, List } from "./components";
import { Info, Group } from "./form";
import { delGroup, delUsers} from "@/api/system/index";
export default {
  components: {
    Tree,
    TabsBar,
    List,
    Group,
    Info
  },
  data() {
    return {
      visible: null,
      gpInfo: null,
      listInfo: null,
      visible2: null,
      floorId: null
    }
  },
  mounted() {
    this.$refs.list.fetchData();
    this.$refs.tree.fetchData();
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    hideGroupWindow(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj)this.listInfo = obj
      this.visible = true
    },
    groupDialog(obj) {
      this.gpInfo = null
      if(obj)this.gpInfo = obj
      this.visible2 = true
    },
    // 更新列表
    upload() {
      this.$refs.list.fetchData()
    },
    // 更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList(val) {
      this.loading = true
      delUsers(val).then(res => {
        this.loading = false
        this.list = res.data
        this.uploadGroup()
      })
    },
    delGroup(val) {
      this.loading = true
      delGroup(val).then(res => {
        this.loading = false
        this.list = res.data
        this.uploadGroup()
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
