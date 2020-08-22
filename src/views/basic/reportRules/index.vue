<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @delList="delivery" @uploadList="upload"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-dialogDrag
      v-if="visible"
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
      trId: null,
      listInfo: null
    };
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
      delivery(obj){
          if(obj){
              this.$refs.list.Delivery(obj.priId)
          }
      },
      hideWindow(val){
          this.visible = val
      },
    handlerDialog(obj){
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
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
