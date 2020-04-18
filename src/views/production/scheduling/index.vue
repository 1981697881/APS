<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <el-tabs  class="table-card" type="border-card">
      <el-tab-pane label="成品线计划">
        <div class="list-containerOther">
            <el-select v-model="plaIdS" style="float: left;z-index: 999;" placeholder="请选择" @change="selectChangeO">
              <el-option
                v-for="(t,i) in plaArray"
                :key="i"
                :label="t.tpName"
                :value="t.tpId">
              </el-option>
            </el-select>
          <div>
            <tabs-bar ref="tabs" @showDialog="handlerDialog" @theDelivery="delivery" @uploadList="upload" @reportInfo="report"/>
          </div>
          <list ref="list1"  @showDialog="handlerDialog" />
        </div>
      </el-tab-pane>
      <el-tab-pane label="半成品线生产计划">
        <div class="list-containerOther">
          <!--<div style="width: 100%;display: inline-block">-->
            <el-select v-model="plaIdB" style="float: left;z-index: 999;" placeholder="请选择" @change="selectChangeT">
              <el-option
                v-for="(t,i) in plaBArray"
                :key="i"
                :label="t.tpName"
                :value="t.tpId">
              </el-option>
            </el-select>
        <!--  </div>-->
          <div>
            <tabs-bar-e ref="tabse" @showDialog="handlerBlank" @theDelivery="deliveryT" @uploadList="uploadT" @reportInfo="report" />
          </div>
          <scheduling ref="list2"  @showDialog="handlerBlank"/>
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
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>
    </el-dialog>
    <el-dialog
      :visible.sync="visibleBlank"
      title="基本信息"
      v-if="visibleBlank"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <blank @hideDialog="hideBlank" @uploadList="uploadT" :listBlank="listBlank"></blank>
    </el-dialog>
    <el-dialog
      :visible.sync="visibleR"
      title="汇报信息"
      v-if="visibleR"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <Report @hideReport="hideReport" @uploadList="upload" :listInfo="listInfo"></Report>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List ,Scheduling, TabsBarE } from "./components"
import { Info, Report, Blank} from "./form"
import { getFinalGoodsType, getSemiFinishedProductsType } from "@/api/basic"
export default {
  components: {
    TabsBar,
    List,
    Info,
    Blank,
    Report,
    Scheduling,
    TabsBarE
  },
  data() {
    return {
      listInfo: null,
      listBlank: null,
      visible: null,
      visibleBlank: null,
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
      this.upload({tpId: val })
    },
    selectChangeT(val) {
      this.uploadT({tpId: val })
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
      getFinalGoodsType().then(res => {
        if(res.flag) {
          console.log(res)
          this.plaArray = res.data
          this.plaIdS = res.data[0].tpId
          this.$refs.list1.fetchData({tpId: this.plaIdS})
        }
      })
      getSemiFinishedProductsType().then(res => {
        if(res.flag) {
          this.plaBArray = res.data
          this.plaIdB = res.data[0].tpId
          const array = this.$refs.tabse.getODate()
          this.$refs.list2.fetchData({tpId: this.plaIdB, productionDateStart: array[0], productionDateEnd: array[1]})
        }
      });
    },
    hideWindow(val) {
      this.visible = val
    },
    hideReport(val) {
      this.visibleR = val
    },
    hideBlank(val) {
      this.visibleBlank = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj){
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible = true
    },
    report(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visibleR = true
    },
    handlerBlank(obj) {
      this.listBlank = null
      if(obj){
        if(obj.length > 0) {
          const listBlank = obj[0]
          const listInfo = {}
          for(const i in listBlank) {
            if(i.match(/\d+/g) != null) {
              if(i.match(/\d+/g)[0] == obj[1]) {
                eval("listInfo." + i.replace(/\d+/g,'') + "='" + listBlank[i] + "'")
              }
            }
          }
          this.listBlank = listInfo
        } else {
          this.$message({
            message: "当前选中无数据！",
            type: "warning"
          });
        }
      }
      this.visibleBlank = true
    },
    // 更新列表
    upload(val = { tpId: this.plaIdS }) {
      const obj = this.$refs.tabs.qFilter()
      obj.tpId = this.plaIdS
      console.log(obj)
      this.$refs.list1.fetchData(obj)
    },
    // 更新列表
    uploadT(val = { tpId: this.plaIdB }) {
      const obj = this.$refs.tabse.qFilter()
      obj.tpId = this.plaIdB
      this.$refs.list2.fetchData(obj)
    },
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
