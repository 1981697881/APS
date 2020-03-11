<template>
  <div class="app-list">
    <Tree ref="tree" class="list-tree" @handler-node="handlerNode" />
    <div class="list-container">
      <div>
        <tabs-bar @showDialog="handlerDialog" @del="delList" @uploadList="upload"/>
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'40%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components"
import { Info } from "./form"
import { delFrame } from "@/api/basic/index";
export default {
  components: {
    Tree,
    TabsBar,
    List,
      Info
  },
  data() {
    return {
      visible: null,
      rid: null,
      listInfo: null,
      floorId: null
    }
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
      hideWindow(val){
          this.visible = val
      },
      handlerDialog(obj){
        this.listInfo = null
          if(obj)this.listInfo = obj
          this.visible = true
      },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
      },
    delList(val) {
      this.loading = true
      delFrame(val).then(res => {
        this.loading = false
        this.list = res.data
        this.$refs.list.fetchData()
      })
    },
    handlerNode(node) {
      // 触发列表的获取数据函数（原为像list组件传入id并监听变动在list组件里触发函数，已销毁）
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },


  }
};
</script>

<style lang="scss" scoped>
</style>
