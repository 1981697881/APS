<template>
  <div class="app-list">
    <type ref="tree" class="list-tree" />
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
      <info @hideDialog="hideWindow" @uploadList="upload" :uid="uid"></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="生产线信息"
      v-if="visible2"
      :width="'40%'"
      destroy-on-close
    >
      <t-detail @hideGroupDialog="hideGroupWindow" @uploadGroup="uploadGroup" :gpInfo="gpInfo"></t-detail>

    </el-dialog>
  </div>
</template>

<script>
import { Type, TabsBar, List } from "./components";
import { Info, TDetail } from "./form";
import { delGroup } from "@/api/system/index";
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
        visible:null,
      uid:null,
      gpInfo:null,
      visible2:null,
      floorId: null
    }
  },
    mounted() {
        this.$refs.list.fetchData();
      this.$refs.tree.fetchData();
    },
  methods: {
      hideWindow(val){
          this.visible = val
      },
    hideGroupWindow(val){
      this.visible2 = val
    },
      handlerDialog(obj){
          if(obj)this.uid = obj.uid
          this.visible = true
      },
    groupDialog(obj){
        console.log(obj)
      if(obj)this.gpInfo = obj
      this.visible2 = true
    },
      //更新列表
      upload() {
          this.$refs.list.fetchData()
      },
    //更新列表
    uploadGroup() {
      this.$refs.tree.fetchData()
    },
    delList() {

    },
    delGroup(val) {
      this.loading = true
      delGroup(val).then(res => {
        this.loading = false
        this.list = res.data
      })
    }

  }
}
</script>

<style lang="scss" scoped>
</style>
