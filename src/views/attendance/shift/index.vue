<template>
  <div class="app-list">
    <Tree ref="tree" class="list-table" @showTree="handlerNode" />
    <div class="list-containerT">
      <div>
        <tabs-bar @del="delList" @uploadList="upload" @handlerSave="handlerSave" @reset="reset"/>
      </div>
      <list ref="list" @showDialog="handlerDialog" @uploadList="upload" />
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
    this.$refs.tree.fetchData()
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
      this.$refs.list.reset()
    },
    handlerNode(val) {
      this.$refs.list.fetchData(val.oowId)
    },

  }
};
</script>

<style lang="scss" scoped>
</style>
