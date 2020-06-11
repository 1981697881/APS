<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getStorageSchedulingList } from "@/api/production/index"
import List from "@/components/List"
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: 'invId', name: 'invId', default: false },
        { text: '旧料号', name: 'oldCode' },
        { text: '编码', name: 'goodCode' },
        { text: '名称', name: 'goodName' },
        { text: '规格', name: 'spec' },
        { text: '最高安全数量', name: 'maxStock' },
        { text: '最低安全数量', name: 'minStock' },
        { text: '计划生产数量', name: 'diffNum' },
        { text: '计量单位', name: 'inventoryUomGroup' },
        { text: '即时库存', name: 'evenNum' },
      ]
    };
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData();
    },
    dblclick(obj) {//this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row)
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getStorageSchedulingList(data, val).then(res => {
        this.loading = false;
        if (res.flag && res.data != null) {
          this.list = res.data
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
