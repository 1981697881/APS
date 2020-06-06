<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      style="height: 300px"
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
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="confirm('form')">确认</el-button>
     </div>
 </div>
</template>

<script>
import { getUnSchedulingList} from "@/api/production/index"
import List from "@/components/List"
export default {
  components: {
    List
  },
 props: {
   soId: {
     type: Number,
     default: null
   },
 },
 data() {
   return {
     loading: false,
     list: {},
     columns: [
       { text: '订单日期', name: 'create_time', sort: true, width: '100px' },
       { text: '产品名称', name: 'good_name', width: '150px'  },
       { text: '色号', name: 'old_code', width: '150px' },
       { text: '订单数量', name: 'num' },
       { text: '料号', name: 'good_code', width: '150px' },
       { text: '订单号', name: 'order_num', width: '150px', sort: true },
     ]
   }
 },
 mounted() {
    this.fetchData()
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
   dblclick(obj) {
     //this.$emit('showDialog',obj.row)
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
     getUnSchedulingList(data, val).then(res => {
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
   },
   confirm(form) {
     this.$refs[form].validate((valid) => {
       // 判断必填项
       if (valid) {
         notarizeList(this.form).then(res => {
           this.$emit('hideDialog', false)
           this.$emit('uploadList')
         })
       } else {
         return false
       }
     })

   },
 }
};
</script>

<style>
</style>
