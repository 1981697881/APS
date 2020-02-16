<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar @showDialog="handlerDialog" @syncDialog="handlerSyncDialog" @delList="delivery" @uploadList="upload"/>
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
      <info @hideDialog="hideWindow" :gid="gid" @uploadList="upload" ></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="同步信息"
      v-if="visible2"
      :width="'50%'"
      destroy-on-close
    >
      <sync-info @hideDialog="hideSyncWindow"  @uploadList="upload" ></sync-info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info, syncInfo } from "./form";

export default {
  components: {
    TabsBar,
    List,
    syncInfo,
      Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      gid: null,
        orderId: null,
        createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
        this.$refs.list.fetchData()
    },
  methods: {
      delivery(obj){
          if(obj){
              this.$refs.list.Delivery(obj.gid)
          }
      },
      hideWindow(val){
          this.visible = val
      },
    handlerDialog(obj){
      if(obj)this.gid = obj.gid
      this.visible = true
    },
    hideSyncWindow(val){
      this.visible2 = val
    },
    handlerSyncDialog(obj){
      if(obj)this.gid = obj.gid
      this.visible2 = true
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
