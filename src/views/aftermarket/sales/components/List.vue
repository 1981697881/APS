<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
       :selfAdaption="false"
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getSalesList } from "@/api/aftermarket/index"
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
        { text: 'soId', name: 'soId', default: false},
        { text: '大区', name: '' },
        { text: '业务员', name: 'seller' },
        { text: '助理', name: '' },
        { text: '公司名称', name: 'customerName' },
        { text: '项目名称', name: 'soName' },
        { text: '订单日期', name: '' },
        { text: '预计出货日期', name: 'planDate' },
        { text: '厂务预计出货日期', name: 'factoryEstimatedDate' },
        { text: '产品名称', name: 'goodName' },
        { text: '色号', name: 'color' },
        { text: '订单数量', name: 'num' },
        { text: '产品最终价', name: '' },
        { text: '价税合计', name: '' },
        { text: '料号', name: 'goodCode' },
        { text: '订单号', name: 'orderNum' },
        { text: '生产完成', name: '' },
        { text: '入库', name: '' },
        { text: '已出货数量', name: '' },
        { text: '待运输数量', name: '' },
        { text: '已运输', name: '' },
        { text: '订单未发数量', name: '' },
        { text: '订单未发金额', name: '' },
        { text: 'OK数量', name: '' },
        { text: 'OK金额', name: '' },
        { text: '未好金额', name: '' },
        { text: '未好数量', name: '' },
        { text: '外包OK数量', name: '' },
        { text: '外包OK金额', name: '' },
        { text: '外包未好数量', name: '' },
        { text: '外包未好金额', name: '' },
        { text: '制造单位', name: '' },
        { text: '供应商', name: '' },
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
      getSalesList(data, val).then(res => {
        this.loading = false;
        if(res.flag && res.data != null) {
          this.list = res.data;
          let record = res.data.records
          let obj = []
          for(const i in record) {
            for(const a in record[i].detail) {
              record[i].detail[a].customerCode = record[i].customerCode
              record[i].detail[a].customerName = record[i].customerName
              record[i].detail[a].orderNum = record[i].orderNum
              record[i].detail[a].orgCode = record[i].orgCode
              record[i].detail[a].seller = record[i].seller
              record[i].detail[a].soId = record[i].soId
              record[i].detail[a].factoryEstimatedDate = record[i].factoryEstimatedDate
              record[i].detail[a].soName = record[i].soName
              obj.push(record[i].detail[a])
            }
          }
          this.list = {
            current: res.data.current,
            pages: res.data.pages,
            size: res.data.size,
            total: res.data.total,
            records: obj
          }
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
