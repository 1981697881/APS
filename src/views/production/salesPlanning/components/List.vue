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
        { text: '订单日期', name: 'createTime', sort: true, width: '100px' },
        { text: '厂务预计出货日期', name: 'factoryEstimatedDate', width: '100px' },
        { text: '产品名称', name: 'goodName', width: '250px'  },
        { text: '色号', name: 'color', width: '250px' },
        { text: '订单数量', name: 'num' },
        { text: '生产完成', name: 'prodOKNum' },
        { text: '入库', name: 'inStockNum' },
        { text: '项目名称', name: 'soName', width: '300px' },
        { text: '料号', name: 'goodCode', width: '150px' },
        { text: '订单号', name: 'orderNum', width: '150px', sort: true },
        { text: '核准状态', name: 'auditStatus' },
        { text: '大区', name: 'departmentName' },
        { text: '业务员', name: 'seller' },
        { text: '助理', name: 'createBy' },
        { text: '公司名称', name: 'customerName', width: '250px' },
        { text: '制造单位', name: '' },
        { text: '供应商', name: '' },
        { text: '预计出货日期', name: 'planDate', width: '100px' },
        { text: '最近同步时间', name: 'syncTime', width: '150px' },
      ]
    };
  },
  methods: {
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList')
    },
    dblclick(obj) {//this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row)
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
              record[i].detail[a].createBy = record[i].createBy
              record[i].detail[a].departmentName = record[i].departmentName
              record[i].detail[a].soName = record[i].soName
              record[i].detail[a].createTime = record[i].createTime
              record[i].detail[a].auditStatus = record[i].auditStatus
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
