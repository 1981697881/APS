<template>
  <div class="app-list">
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showRerun="handlerRerun" @exportData="exportData" @queryBtn="query" @uploadList="upload" @theDelivery="delivery"/>
      </div>
      <list ref="list"  @showDialog="handlerDialog"/>
    </div>

    <el-dialog
      :visible.sync="visible"
      title="打卡信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="考勤信息"
      v-if="visible2"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info-o @hideDialog="hideHoliday" @uploadList="upload" :listInfo="listInfo"></info-o>

    </el-dialog>
    <el-dialog
      :visible.sync="visible3"
      title="重算信息"
      v-if="visible3"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <rerun @hideDialog="hideRerun" @uploadList="upload" :listInfo="listInfo"></rerun>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info, InfoO, Rerun } from "./form";
import { getSalaryList } from "@/api/attendance/index"

export default {
  components: {
    TabsBar,
    List,
    InfoO,
    Rerun,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      visible3: null,
      listInfo: null,
    };
  },
  mounted() {
    console.log(this.$refs.tabs.qFilter())
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    delivery(obj){
      if(obj){
        this.$refs.list.Delivery(obj.oid)
        this.$refs.list.fetchData()
      }
    },
    hideWindow(val) {
      this.visible = val
    },
    hideHoliday(val) {
      this.visible2 = val
    },
    hideRerun(val) {
      this.visible3 = val
    },
    handlerRerun() {
      this.visible3 = true
    },
    handlerDialog(obj){
      console.log(obj)
      console.log(obj[0]['day'+obj[1]])
      if(obj.length > 0) {
        const listBlank = obj[0]
        const listInfo = {}
        let dayNum = listBlank['noteDate'].split('-')
        if(obj[1] == -1){
         /* let day = listBlank['noteDate'] + "-01"
          eval("listInfo.jobNum='" + listBlank['jobNum'] + "'")
          eval("listInfo.date='" + day + "'")*/
          this.listInfo = obj[0]
          this.visible2 = true
        }else{
          if(obj[0]['day'+obj[1]] != undefined || obj[0]['day'+obj[1]] != null){
            let day = listBlank['noteDate'] + "-" + this.doHandleMonth(obj[1])
            eval("listInfo.jobNum='" + listBlank['jobNum'] + "'")
            eval("listInfo.name='" + listBlank['name'] + "'")
            eval("listInfo.deptName='" + listBlank['deptName'] + "'")
            eval("listInfo.date='" + day + "'")
            this.listInfo = listInfo
            this.visible = true
          } else {
            this.$message({
              message: "当前选中无数据！",
              type: "warning"
            });
          }
        }
       /* if(Number(obj[1]) > Number(new Date(dayNum[0],dayNum[1],0).getDate())){
        }*/
      } else {
        this.$message({
          message: "当前选中无数据！",
          type: "warning"
        });
      }
      console.log(obj[1])
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    // 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload(val){
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
