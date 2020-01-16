<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <list ref="list1"  @showDialog="handlerDialog"/>
    </div>
    <div class="list-containerOther">
     <bar-chart />
    </div>
    <div class="list-containerOther">
      <eta-o ref="list2"  @showDialog="handlerDialog"/>
    </div>
    <div class="list-containerOther">
      <eta-t ref="list3"  @showDialog="handlerDialog"/>
    </div>
    <div class="list-containerOther">
      <eta-th ref="list4"  @showDialog="handlerDialog"/>
    </div>
  </div>
</template>

<script>
import {List ,BarChart,EtaO,EtaT,EtaTh} from "./components";

export default {
  components: {
    List,
      EtaO,
      EtaT,
      EtaTh,
      BarChart
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
