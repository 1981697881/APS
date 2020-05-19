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
import {getDeliveryOrderBoardList} from '@/api/warehouse/index'
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
        { text: '', name: '',default: false },
        { text: '出货日期', name: 'expectedShipTime' },
        { text: '销售部门', name: '' },
        { text: '销售业务员', name: '' },
        { text: '单据编号', name: 'shipNo' },
        { text: '料品名称', name: 'goodName' },
        { text: '料号', name: 'goodCode' },
        { text: '旧料号', name: 'oldCode' },
        { text: '规格', name: 'spec' },
        { text: '出货数量', name: 'qty' }

      ]
    };
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData();
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.fetchData();
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    dblclick(obj) {
      //this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getDeliveryOrderBoardList(data, val).then(res => {
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
