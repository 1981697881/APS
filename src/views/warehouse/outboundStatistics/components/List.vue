<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getOutboundStatisticsList } from '@/api/warehouse/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      list: {},
      columns: [
        { text: 'gid', name: 'gid',default:false },
        { text: '出库单号', name: '' },
        { text: '日期', name: 'createTime' },
        { text: 'U9料号', name: 'goodCode' },
        { text: '色号', name: 'oldCode' },
        { text: '规格', name: '' },
        { text: '批号', name: '' },
        { text: '数量', name: 'num' },
        { text: '库位', name: '' },
        { text: '操作员', name: 'username' },
      ]
    };
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData();
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.fetchData();
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      /*  fid: fid,
        type: type,*/
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      getOutboundStatisticsList(data, val).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang='scss' scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
