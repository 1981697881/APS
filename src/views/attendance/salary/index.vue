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
      <info @hideDialog="hideWindow" @uploadList="upload" :listInfo="listInfo"></info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";
import { Info } from "./form";
import { getSalaryList } from "@/api/attendance/index"

export default {
  components: {
    TabsBar,
    List,
    Info
  },
  data() {
    return {
      visible: null,
      listInfo: null,
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
      console.log(obj)
      if(obj.length > 0) {
        const listBlank = obj[0]
        const listInfo = {}
        for(const i in listBlank) {
          if(i.match(/\d+/g) != null){
            if(i.match(/\d+/g)[0] == obj[1]){
              let day = listBlank['noteDate']+"-"+this.doHandleMonth(obj[1])
              eval("listInfo.jobNum='" + listBlank['jobNum'] + "'")
              eval("listInfo.date='" + day + "'")
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
      this.visible = true
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
