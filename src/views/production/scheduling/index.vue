<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <el-tabs  class="table-card" type="border-card">
      <el-tab-pane label="成品线计划">
        <div class="list-containerOther">
          <div style="width: 100%;display: inline-block">
            <el-select v-model="plaIdS" style="float: right;" placeholder="请选择" @change="selectChangeO">
              <el-option
                v-for="(t,i) in plaArray"
                :key="i"
                :label="t.plName"
                :value="t.plId">
              </el-option>
            </el-select>
          </div>
          <div>
            <tabs-bar @showDialog="handlerDialog" @theDelivery="delivery" @uploadList="upload" @reportInfo="report"/>
          </div>
          <list ref="list1"  @showDialog="handlerDialog" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="半成品线生产计划">
        <div class="list-containerOther">
          <div style="width: 100%;display: inline-block">
            <el-select v-model="plaIdS" style="float: right;" placeholder="请选择" @change="selectChangeT">
              <el-option
                v-for="(t,i) in plaArray"
                :key="i"
                :label="t.platformName"
                :value="t.plaId">
              </el-option>
            </el-select>
          </div>
          <div>
            <tabs-bar-e @showDialog="handlerDialog" @theDelivery="deliveryT" @uploadList="uploadT"/>
          </div>
          <scheduling ref="list2"  @showDialog="handlerDialog"/>
        </div>
      </el-tab-pane>
    </el-tabs>
   <!-- <div class="list-containerOther">
      <el-card class="box-card box-card-component">
        <div slot="header" class="clearfix" >
          <span>美瓷胶包装线色系统计表</span>
        </div>
        <div>
          <tabs-bar-s @showDialog="handlerDialog" @theDelivery="delivery"/>
        </div>
        <detail ref="list3"  @showDialog="handlerDialog"/>
      </el-card>
    </div>-->
    <el-dialog
      :visible.sync="visible"
      title="基本信息"
      v-if="visible"
      :width="'80%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visibleR"
      title="汇报信息"
      v-if="visibleR"
      :width="'80%'"
      destroy-on-close
    >
      <Report @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></Report>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List ,Scheduling, TabsBarE } from "./components"
import { Info, Report} from "./form"
import { getFinalGoods, getSemiFinishedProducts } from "@/api/basic"
export default {
  components: {
    TabsBar,
    List,
    Info,
    Report,
    Scheduling,
    TabsBarE
  },
  data() {
    return {
      listInfo: null,
      visible: null,
      visibleR: null,
      plaIdS: null,
      plaArray: [],
      plaIdB: null,
      plaBArray: [],
    };
  },
  mounted() {
    this.fetchFormat()
  },
  methods: {
    selectChangeO(val) {
     this.upload({plId: val })
    },
    selectChangeT(val) {
      this.upload({plId: val })
    },
    delivery(obj) {
      if(obj) {

      }
    },
    deliveryT(obj) {
      if(obj) {

      }
    },
    fetchFormat() {
      getFinalGoods().then(res => {
        if(res.flag) {
          this.plaArray = res.data
          this.plaIdS = res.data[0].plId
          this.$refs.list1.fetchData({plId: this.plaIdS})
        }
      })
      getSemiFinishedProducts().then(res => {
        if(res.flag) {
          this.plaBArray = res.data
          this.plaIdB = res.data[0].plId
        }
      });
    },
    hideWindow(val) {
      this.visible = val
    },
    hideReport(val) {
      this.visibleR = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      console.log(obj)
      if(obj) this.listInfo = obj
      this.visible = true
    },
    report(obj) {
      this.listInfo = null
      if(obj) this.listInfo = obj
      this.visibleR = true
    },
    // 更新列表
    upload(val = {plId: this.plaIdS}) {
      this.$refs.list1.fetchData(val)
    },
    // 更新列表
    uploadT(val = {plId: this.plaIdB}) {
      this.$refs.list2.fetchData(val)
    }
  }
};
</script>

<style lang="scss" scoped>
  .list-containerOther{
    height: calc((100vh - 180px));
    padding-left: 10px;
    padding-right: 10px;
  }
  .table-card{
    margin: 5px;
  }
</style>
