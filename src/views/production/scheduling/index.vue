<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar @showDialog="handlerDialog" @theDelivery="delivery"/>
      </div>
      <list ref="list1"  @showDialog="handlerDialog"/>
    </div>
    <div class="list-containerOther">
      <div>
        <tabs-bar-e @showDialog="handlerDialog" @theDelivery="delivery"/>
      </div>
      <scheduling ref="list2"  @showDialog="handlerDialog"/>
    </div>
    <div class="list-containerOther">
      <div>
        <tabs-bar-s @showDialog="handlerDialog" @theDelivery="delivery"/>
      </div>
      <detail ref="list3"  @showDialog="handlerDialog"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'80%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" ></info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List ,Detail,Scheduling,TabsBarE,TabsBarS} from "./components";
import { Info } from "./form";

export default {
  components: {
    TabsBar,
    List,
      Info,
      Detail,
      Scheduling,
      TabsBarE,
      TabsBarS
  },
  data() {
    return {
      visible: null,
      oid: null,
        orderId: null,
        createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
        this.$refs.list1.fetchData()
    },
  methods: {
      delivery(obj){
          if(obj){
              this.$refs.list1.Delivery(obj.oid)
              this.$refs.list1.fetchData()
          }
      },
      hideWindow(val){
          this.visible = val
      },
    handlerDialog(obj){
      //if(obj)
      this.visible = true
    },
    handlerNode(node) {
      this.$refs.list1.fetchData(node.data.fid,node.data.type)
    },
      //更新列表
      upload(){
          this.$refs.list1.fetchData()
      }
  }
};
</script>

<style lang="scss" scoped>
  .list-containerOther{
    padding-left: 10px;
    padding-right: 10px;
  }
</style>
