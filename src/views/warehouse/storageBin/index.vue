<template>
  <div class="app-list">
    <!--<Tree class="list-tree" @handler-node="handlerNode" />-->
    <div class="list-containerOther">
      <div>
        <tabs-bar @uploadList="upload" @queryBtn="query"/>
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
    this.$refs.list.fetchData()
  },
  methods: {
    // 更新列表
    upload() {
      this.$refs.list.fetchData()
    },
    // 查询
    query(val) {
      this.$refs.list.uploadPr(val)
    },
  }
};
</script>

<style lang="scss" scoped>
</style>
