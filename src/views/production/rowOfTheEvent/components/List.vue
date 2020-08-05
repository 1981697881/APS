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
import {materialMonthlyReport} from '@/api/warehouse/index'
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
        { text: '', name: '',default:false },
        { text: '日期', name: '' },
        { text: '色号/旧料号', name: 'color', width: '180px' },
        { text: '排程数量', name: 'odPrNum' },
        { text: '计划数量', name: 'allocatedNum' },
        { text: '计划日期', name: 'productionDate', width: '150px' },
        { text: '生产设备', name: 'plName' },
        { text: '产品分类', name: 'productType' },
        { text: '项目名称', name: 'soName' , width: '150px' },
        { text: '生产状态', name: 'allocatedStatus' },
        { text: '生产类型', name: 'productionType', width: '100px' },
        { text: '备注', name: 'remark' },
        { text: '订单号', name: 'soNum' , width: '150px' },
        { text: '排产单号', name: 'taskNum', width: '150px' },
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
      this.fetchData(val)
    },
    fetchData(val) {
      this.loading = true;
        materialMonthlyReport(val).then(res => {
        this.loading = false;
        console.log(res)
        this.list = {records: res.data};
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
