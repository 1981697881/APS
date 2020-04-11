<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar @showDialog="handlerDialog" @delList="delivery" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
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
      listInfo: null
    };
  },
  mounted() {
    this.$refs.list.fetchData()
  },
  methods: {
    delivery(obj) {
      if(obj) {
        this.$refs.list.Delivery(obj.eid)
      }
    },
    hideWindow(val) {
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
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
