<template>
  <div class="app-list">
    <Tree ref="tree" class="list-table" @handler-node="handlerNode" />
    <div class="list-containerT">
      <div>
        <tabs-bar @showDialog="handlerDialog" @del="delList" @uploadList="upload"/>
      </div>
      <list ref="list" @showDialog="handlerDialog"  />
    </div>
  </div>
</template>

<script>
import { Tree, TabsBar,List } from "./components";
export default {
  components: {
    Tree,
    TabsBar,
    List
  },
  data() {
    return {
        visible:null,
        rid:null,
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
          if(obj)this.rid = obj.rid
          this.visible = true
      },
      delList(){
          this.$refs.list.delData()
      },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
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
