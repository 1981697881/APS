<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      style="height: 300px"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
      @row-click="rowClick"
    />
   <div slot="footer" style="text-align:center;margin-top: 50px">
       <el-button type="primary" @click.native="confirm('form')">再次确认</el-button>
     </div>
 </div>
</template>

<script>
import { getUnSchedulingList } from "@/api/production/index"
import { notarizeAgain} from "@/api/aftermarket/index"
import List from "@/components/List"
import { mapGetters } from 'vuex'
export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['clickData'])
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
       { text: '订单日期', name: 'create_date', sort: true },
       { text: '产品名称', name: 'good_name'  },
       { text: '色号', name: 'old_code' },
       { text: '订单数量', name: 'num' },
       { text: '料号', name: 'good_code' },
       { text: '订单号', name: 'order_num', sort: true },
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
         this.list = res.data
       }
     })
   },
   confirm() {
     if (this.clickData.so_id) {
       notarizeAgain({soId: this.clickData.so_id}).then(res => {
         if(res.flag) {
           this.$emit('hideDialog', false)
           this.$emit('uploadList')
         }
       })
     } else {
       this.$message({
         message: "无选中行",
         type: "warning"
       });
     }
   },
 }
};
</script>

<style>
</style>
