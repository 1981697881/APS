<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <el-select v-model="plaIdS" style="float: left;z-index: 999;" placeholder="请选择" @change="selectChange">
        <el-option
          v-for="(t,i) in plaArray"
          :key="i"
          :label="t.tpName"
          :value="t.tpId">
        </el-option>
      </el-select>
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @queryBtn="query" @theDelivery="delivery" @uploadList="upload" @reportInfo="report" />
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
    </div>
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
import { TabsBar, List  } from "./components"
import { Info, Report} from "./form"
import { getSemiFinishedProductsType } from "@/api/basic"
import { schedulingDel } from "@/api/production/index"
export default {
  components: {
    TabsBar,
    List,
    Info,
    Report,
  },
  data() {
    return {
      listInfo: null,
      visible: null,
      visibleR: null,
      plaIdS: null,
      plaArray: [],
    };
  },
  mounted() {
    this.fetchFormat()
    console.log(this.$route)
  },

  methods: {
    selectChange(val) {
      this.upload({tpId: val })
    },
    delivery(obj) {
      if(obj) {
        schedulingDel(obj.taskId).then(res => {
          if (res.flag) {
            this.upload({ tpId: this.plaIdS })
          }
        })
      }
    },
    fetchFormat() {
      getSemiFinishedProductsType().then(res => {
        if(res.flag) {
          this.plaArray = res.data
          this.plaIdS = res.data[0].tpId
          const array = this.$refs.tabs.getODate()
          this.$refs.list.fetchData({tpId: this.plaIdS, productionDateStart: array[0], productionDateEnd: array[1]})
        }
      });
    },
    hideWindow(val) {
      this.visible = val
    },
    hideReport(val) {
      this.visibleR = val
    },
    report(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visibleR = true
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
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
          this.listInfo = listInfo
        } else {
          this.$message({
            message: "当前选中无数据！",
            type: "warning"
          });
        }
      } else {
        this.listInfo = {
          flag: true,
          tpId: this.plaIdS
        }
      }
      this.visible = true
    },
    // 更新列表
    upload(val = { tpId: this.plaIdS }) {
      const obj = this.$refs.tabs.qFilter()
      obj.tpId = this.plaIdS
      console.log(obj)
      this.$refs.list.fetchData(obj)
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
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
