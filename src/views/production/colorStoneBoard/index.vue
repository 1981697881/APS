<template>
  <div class="app-list">
    <el-container>
      <el-container>
        <el-aside width="calc(100vh/2)">
          <pie-chart></pie-chart>
        </el-aside>
        <el-container>
          <el-main>
            <div class="list-containerOther">
              <el-card class="box-card box-card-component">
                <div slot="header" class="clearfix" style="text-align: left">
                  <span>加急生产任务</span>
                </div>
                <list ref="list" />
              </el-card>
            </div>
          </el-main>
          <el-footer>
            <el-card class="box-card box-card-component">
              <div slot="header" class="clearfix" style="text-align: left">
                <span>重要事项</span>
              </div>
              <info/>
            </el-card>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
  </div>
</template>

<script>
import { List, PieChart, Info } from "./components";

export default {
  components: {
    List,
    PieChart,
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
        this.$refs.list.fetchData()
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
    },
    handlerNode(node) {
      this.$refs.list.fetchData(node.data.fid,node.data.type)
    },
      //更新列表
      upload(){
          this.$refs.list.fetchData()
      }
  }
};
</script>
<style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .el-card__body{
      padding: 0px!important;
    }
  }
</style>
<style>
  .el-header, .el-footer {
   /* background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
  }

  .el-aside {
    text-align: center;
    line-height: 200px;
  }

  .el-main {
    /*background-color: #E9EEF3;*/
    color: #333;
    text-align: center;
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }
</style>
