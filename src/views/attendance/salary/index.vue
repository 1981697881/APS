<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @uploadList="upload" @theDelivery="delivery"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :oid="oid" :orderId="orderId" :createTime="createTime"></info>

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
      oid: null,
      orderId: null,
      createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
  mounted() {
    console.log(this.$refs.tabs.qFilter())
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    delivery(obj){
      if(obj){
        this.$refs.list.Delivery(obj.oid)
        this.$refs.list.fetchData()
      }
    },
    hideWindow(val){
      this.visible = val
    },
    handlerDialog(obj){
      if(obj)this.oid = obj.oid;this.orderId=obj.orderId;this.createTime=obj.createTime
      this.visible = true
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload(val){
      this.$refs.list.fetchData(val)
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
