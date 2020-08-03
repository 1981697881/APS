<template>
  <div class="app-list">
    <el-container style="height: 100%">
      <el-container>
        <el-aside width="calc(100vh/2)">
          <pie-chart ref="pie"></pie-chart>
        </el-aside>
        <el-container>
          <el-main>
            <div class="list-containerOther">
              <el-card class="box-card box-card-component">
                <div slot="header" class="clearfix" style="text-align: left">
                  <span>加急生产任务</span>
                </div>
                <list ref="list"/>
              </el-card>
            </div>
          </el-main>
          <el-footer>
            <el-card class="box-card box-card-component">
              <div slot="header" class="clearfix" style="text-align: left">
                <span>重要事项</span>
              </div>
              <info ref="info"/>
            </el-card>
          </el-footer>
        </el-container>
      </el-container>
    </el-container>
    <span class="numberTitle">美瓷胶调色线当班人数：{{number}}</span>
  </div>
</template>

<script>
import { List, PieChart, Info } from "./components";
import { productBoard } from "@/api/production/index"
export default {
  components: {
    List,
    PieChart,
    Info
  },
  data() {
    return {
      visible: null,
      number: 0,
      oid: null,
      loading: false,
      orderId: null,
      createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
  mounted() {
    this.loading = true;
    productBoard('美瓷胶调色').then(res => {
      this.loading = false;
      console.log()
      this.number = res.data['numberOfPeopleOnDuty']
      this.$nextTick(() => {
        this.$refs.pie.initChart({quantityToBeProduced: res.data['quantityToBeProduced'],numberOfPeopleOnDuty: res.data['numberOfPeopleOnDuty'],numberOfCompleted: res.data['numberOfCompleted']})
        this.$refs.info.fetchData(res.data['importantMatters'])
        this.$refs.list.fetchData(res.data['urgentTask'])
      })
    });

  },
  methods: {

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
  .numberTitle{
    text-align: center;
    position: absolute;
    width: calc(100vh/2);
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
