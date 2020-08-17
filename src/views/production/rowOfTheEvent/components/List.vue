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
import {getSaleTaskOrderList} from '@/api/production/index'
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
        { text: '', name: '', default: false },
        { text: '色号/旧料号', name: 'oldCode', width: '180px' },
        { text: '计划数量', name: 'allocatedNum' },
        { text: '排程日期', name: 'productionDate' },
        { text: '订单数量', name: 'num' },
        { text: '生产设备', name: 'plName' },
        { text: '产品分类', name: 'productType' },
        { text: '项目名称', name: 'soName', width: '150px' },
        { text: '生产状态', name: 'status' },
        { text: '生产类型', name: 'productionType' },
        { text: '订单日期', name: 'orderDate' },
        { text: '订单号', name: 'orderNum' , width: '150px' },
        { text: '排产单号', name: 'taskNum', width: '150px' },
        { text: '备注', name: 'remark', width: '150px' },
      ]
    };
  },

  methods: {
      //监听每页显示几条
      handleSize(val) {
          this.list.size = val
        this.$emit('uploadList')
      },
      //监听当前页
      handleCurrent(val) {
          this.list.current = val;
        this.$emit('uploadList')
      },
    dblclick(obj) {
      //this.$emit('showDialog',obj.row)
    },
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true
      getSaleTaskOrderList(data, val).then(res => {
        this.loading = false
        this.list = res.data
      })
    },
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
