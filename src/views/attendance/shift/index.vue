<template>
  <div class="app-list">
    <Tree ref="tree" class="list-table" @handler-node="handlerNode" />
    <div class="list-containerT">
      <div>
        <tabs-bar @del="delList" @uploadList="upload" @reset="reset"/>
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="排班信息"
      v-if="visible"
      v-dialogDrag
      :width="'30%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" @setTable="setData" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components";
import { Info } from "./form"
export default {
  components: {
    Tree,
    TabsBar,
    Info,
    List
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
    reset(obj) {
      this.$refs.list.reset()
    },
    delList() {
      this.$refs.list.delData()
    },
    setData(val) {
      this.$refs.list.setList(val)
    },
    // 更新列表
    upload(){
      this.$refs.list.fetchData()
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },

  }
};
</script>

<style lang="scss" scoped>
</style>
