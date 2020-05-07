<template>
  <div class="app-list">
    <Tree ref="tree" class="list-table" @showTree="handlerNode" />
    <div class="list-containerT">
      <div>
        <tabs-bar @del="delList" @uploadList="upload" @showDialog="handlerDialog" />
      </div>
      <list ref="list" @uploadList="upload" />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="排班信息"
      v-if="visible"
      v-dialogDrag
      :width="'60%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
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
    this.$refs.tree.fetchData()
  },
  methods: {
    hideWindow(val) {
      this.visible = val
    },
    handlerDialog(obj) {
      console.log(1123)
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
    delList(val) {
      this.$refs.tree.delData(val)
    },
    setData(val) {
      this.$refs.list.setList(val)
    },
    handlerSave() {
      this.$refs.list.saveData()
    },
    // 更新列表
    upload() {
      this.$refs.tree.fetchData()
    },
    handlerNode(val) {
      this.$refs.list.fetchData(val.oowId)
    },

  }
};
</script>

<style lang="scss" scoped>
</style>
