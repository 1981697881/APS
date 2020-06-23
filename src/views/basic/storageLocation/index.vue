<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @showDialog="handlerDialog" @showInfo="handlerInfo"  @uploadList="upload" @delList="delivery" @queryBtn="query"/>
      </div>
      <list ref="list" @showInfo="handlerInfo" @uploadList="upload"/>
    </div>
    <el-dialog
      :visible.sync="visible"
      title="仓库信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <info @hideDialog="hideWindow"  @uploadList="upload" ></info>

    </el-dialog>
    <el-dialog
      :visible.sync="visible2"
      title="库位信息"
      v-if="visible2"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <detail-info @hideDialog="hideInfoWindow"  @uploadList="upload" :listInfo="listInfo"></detail-info>

    </el-dialog>
  </div>
</template>

<script>
import { TabsBar, List } from './components'
import { delPosition} from '@/api/basic/index'
import { Info, DetailInfo } from './form'
export default {
  components: {
    TabsBar,
    List,
    DetailInfo,
    Info
  },
  data() {
    return {
      visible: null,
      visible2: null,
      listInfo: null
    };
  },
  mounted() {
    this.$refs.list.fetchData(this.$refs.tabs.qFilter())
  },
  methods: {
    delivery(obj) {
      if(obj) {
        delPosition(obj).then(res => {
          if(res.flag) {
            this.$refs.list.fetchData(this.$refs.tabs.qFilter())
          }
        });
      }
    },
    hideWindow(val) {
      this.visible = val
    },
    hideInfoWindow(val) {
      this.visible2 = val
    },
    handlerDialog(obj) {
      this.visible = true
    },
    handlerInfo(obj) {
      this.listInfo = null
      if(obj) {
        const info = JSON.parse(JSON.stringify(obj))
        info.worn = obj.grandpaPiId
        this.listInfo = info
      }
      this.visible2 = true
    },
    // 查询
    query() {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    // 更新列表
    upload(){
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
