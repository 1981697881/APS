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
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @theDelivery="delivery" @queryBtn="query" @uploadList="upload" @reportInfo="report"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog" @uploadList="uploadPage" />
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
import { TabsBar, List } from "./components"
import { Info, Report} from "./form"
import { getFinalGoodsType } from "@/api/basic"
import { schedulingDel } from "@/api/production/index"
export default {
  components: {
    TabsBar,
    List,
    Info,
    Report
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
  },
  methods: {
    selectChange(val) {
      this.$refs.tabs.fetchLine(val)
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
      getFinalGoodsType().then(res => {
        if(res.flag) {
          console.log(res)
          this.plaArray = res.data
          this.$refs.tabs.fetchLine(res.data[0].tpId)
          this.plaIdS = res.data[0].tpId
          this.upload()
        }
      })
    },
    hideWindow(val) {
      this.visible = val
    },
    hideReport(val) {
      this.visibleR = val
    },
    handlerDialog(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        this.listInfo = info
      } else {
        this.listInfo = {
          flag: true,
          tpId: this.plaIdS
        }
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
    // 更新列表
    upload(val = { tpId: this.plaIdS }) {
      const obj = this.$refs.tabs.qFilter()
      obj.tpId = this.plaIdS
      this.$refs.list.uploadPr(obj)
    },
    uploadPage(val) {
      const obj = this.$refs.tabs.qFilter()
      obj.tpId = this.plaIdS
      this.$refs.list.fetchData(obj)
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
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
