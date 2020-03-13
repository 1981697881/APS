<template>
  <div>
    <el-form :model="form" :rules="rules" ref="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'" style="display: none">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
       <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true" >
         <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
     <el-table-column
       v-for="(t,i) in columns"
       :key="i"
       :prop="t.name"
       :label="t.text"
       :width="t.width?t.width:(selfAdaption?'':'120px')"
       v-if="t.default!=undefined?t.default:true"
     ></el-table-column>
   </el-table>

     </el-row>
   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="save">打印</el-button>
     </div>
 </div>
</template>

<script>
import { saleInfo,auditOrder,Dismissed} from "@/api/indent/sales";
import List from "@/components/List";

export default {
   components: {
       List
   },
 props: {
   oid: {
     type: Number,
     default: null
   },
   selfAdaption: {
     type: Boolean,
     default:true
   },
 },
 data() {
   return {
     form: {
         oid: null,
         orderId: null,
         createTime: null,
       name: null, // 客户名称
       code: null, // 客户编号
     },
       loading: false,
       list: [],
       type: null,
       columns: [
           { text: 'gid', name: 'gid', default: false },
           { text: '拣货单号', name: '' },
           { text: '订单号', name: '' },
           { text: '物料编码', name: '' },
           { text: '物料名称', name: '' },
           { text: '旧料号', name: '' },
         { text: '色号', name: '' },
         { text: '厂务预计出货日期', name: '' },
         { text: '客户', name: '' },
         { text: '业务员', name: '' },
         { text: '订货数量', name: '' },
         { text: '发货数量', name: '' },
         { text: '拣货仓位', name: '' }
       ],
   };
 },
 created() {

 },
 mounted() {
     this.form.oid=this.oid
   if (this.form.oid) {
     this.fetchData(this.form.oid);
   }
 },
 methods: {
     saveNum(){
         this.visible = false
        this.obj["actualNum"]=this.num1
         this.num1=1
     },
   save() {
     this.$refs[form].validate((valid) => {
       //判断必填项
       if (valid) {
         if (typeof (this.form.rid) != undefined && this.form.rid != null) {
           alterUsers(this.form).then(res => {
             this.$emit('hideDialog', false)
             this.$emit('uploadList')
           });
         } else {
           addUsers(this.form).then(res => {
             this.$emit('hideDialog', false)
             this.$emit('uploadList')
           });
         }


       } else {
         return false;
       }
     })
   },

   fetchData(val) {
       saleInfo(val).then(res => {
       this.list = res.data;
     });
   },
 }
};
</script>

<style>
</style>
