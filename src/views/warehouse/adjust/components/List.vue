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
import {getAdjustList} from '@/api/warehouse/index'
import List from '@/components/List'

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
        { text: 'invId', name: 'invId',default: false },
        { text: 'uid', name: 'uid',default: false },
        { text: '日期', name: 'adjustTime' },
        { text: '库位号', name: '' },
        { text: 'U9料号', name: '' },
        { text: '旧料号', name: '' },
        { text: '批号', name: '' },
        { text: '数量', name: 'pastNum' },
        { text: '调后U9料号', name: '' },
        { text: '调后旧料号', name: '' },
        { text: '调后批号', name: '' },
        { text: '调后数量', name: 'adjNum' },
        { text: '操作员', name: '' },

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
      //this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
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
      this.loading = true;
      getAdjustList(data, val).then(res => {
        this.loading = false;
        this.list = res.data;
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
