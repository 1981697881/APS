<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar ref="tabs" @uploadList="upload" @queryBtn="query" @exportData="exportData"/>
      </div>
      <list ref="list"/>
    </div>
  </div>
</template>

<script>
import { TabsBar, List } from "./components";

export default {
  components: {
    TabsBar,
    List,
  },
  data() {
    return {
      visible: null,
      visible2: null,
      gid: null,
        orderId: null,
        createTime: null,
      treeId: null, // null
      floorId: null
    };
  },
    mounted() {
        this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
  methods: {
    exportData() {
      this.$refs.list.ExportData()
    },
    // 查询
    query() {
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    },
    // 查询
    uploadPage(val) {
      this.$refs.list.fetchData(this.$refs.tabs.qFilter())
    },
    //更新列表
    upload(){
      this.$refs.list.uploadPr(this.$refs.tabs.qFilter())
    }
  }
};
</script>

<style lang="scss" scoped>
</style>
