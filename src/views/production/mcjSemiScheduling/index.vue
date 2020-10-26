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
        <tabs-bar ref="tabs" @exportData="exportData" @showDialog="handlerDialog" @handleMove="handleMove" @handleSplit="handleSplit" @handleSpell="handleSpell" @queryBtn="query" @theDelivery="delivery" @uploadList="upload" @reportInfo="report" />
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
    <el-dialog
      :visible.sync="visible2"
      title="挪单信息"
      v-if="visible2"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <move-detail @hideMove="hideMove" @uploadList="upload" :listInfo="listInfo"></move-detail>
    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="拆单信息"
      v-if="visible3"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <split-detail @hideSplit="hideSplit" @uploadList="upload" :listInfo="listInfo"></split-detail>
    </el-dialog>
    <el-dialog
      :visible.sync="visible4"
      title="拼单信息"
      v-if="visible4"
      v-dialogDrag
      :width="'80%'"
      destroy-on-close
    >
      <spell-detail @hideSpell="hideSpell" @uploadList="upload" :listInfo="listInfo"></spell-detail>
    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List  } from "./components"
import { Info, Report, moveDetail, spellDetail, splitDetail} from "./form"
import { getMcjSemiSchedulingType } from "@/api/basic"
import { schedulingDel, exportSemiSchedulin } from "@/api/production/index"
export default {
  components: {
    TabsBar,
    List,
    Info,
    moveDetail,
    spellDetail,
    splitDetail,
    Report,
  },
  data() {
    return {
      listInfo: null,
      visible: null,
      visibleR: null,
      visible2: null,
      visible3: null,
      visible4: null,
      plaIdS: null,
      plaArray: [],
      batch: null,
    };
  },
  mounted() {
    this.fetchFormat()
  },
  methods: {
    exportData() {
     /* const obj = this.$refs.tabs.qFilter()
      obj.tpId = this.plaIdS
      exportSemiSchedulin(obj).then(res => {
        this.$refs.tabs.download(res)
      })*/
      this.$refs.list.ExportData()
    },
    selectChange(val) {
      this.plaArray.forEach((item, index) =>{
        if(item.tpId == val) {
          if (item.tpName == '美瓷胶调色线') {
            this.batch = true
            this.$refs.list.setHType(false)
          } else if(item.tpName == '美瓷胶灌装线') {
            this.$refs.list.setHType(true)
            this.batch = false
          } else {
            this.batch = false
            this.$refs.list.setHType(false)
          }
        }
      })
      this.$refs.list.resetBatch(this.batch)
      this.$refs.tabs.fetchLine(val)
      this.upload({tpId: val })
    },
    delivery(obj) {
      if(obj) {
        schedulingDel(obj.taskId, {interfaceType: '美瓷胶半成品生产计划' }).then(res => {
          if (res.flag) {
            this.upload({ tpId: this.plaIdS })
          }
        })
      }
    },
    fetchFormat() {
      getMcjSemiSchedulingType().then(res => {
        if(res.flag) {
          this.plaArray = res.data
          this.$refs.tabs.fetchLine(res.data[0].tpId)
          this.plaIdS = res.data[0].tpId
          const array = this.$refs.tabs.getODate()
          this.$refs.list.fetchData({tpId: this.plaIdS, productionDateStart: array[0], productionDateEnd: array[1], allocatedStatus: '计划中'})
        }
      });
    },
    hideWindow(val) {
      this.visible = val
    },
    hideReport(val) {
      this.visibleR = val
    }, hideMove(val) {
      this.visible2 = val
    }, hideSplit(val) {
      this.visible3 = val
    }, hideSpell(val) {
      this.visible4 = val
    },
    report(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visibleR = true
    },
    handleMove(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible2 = true
    },
    handleSplit(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible3 = true
    },
    handleSpell(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      }
      this.visible4 = true
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
          if(this.batch) {
            this.listInfo.isPalette = true
          } else {
            this.listInfo.isPalette = false
          }
          console.log(this.listInfo)
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
        if(this.batch) {
          this.listInfo.isPalette = true
        } else {
          this.listInfo.isPalette = false
        }
      }

      console.log(this.listInfo)
      this.visible = true
    },// 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload(val = { tpId: this.plaIdS }) {
      const obj = this.$refs.tabs.qFilter()
      obj.tpId = this.plaIdS
      console.log(obj)
      this.$refs.list.fetchData(obj)
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
