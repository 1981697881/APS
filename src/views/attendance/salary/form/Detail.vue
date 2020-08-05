<template>
  <div>
    <el-form v-model="form" label-width="100px" :size="'mini'">
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'oid'" style="display: none">
            <el-input v-model="form.oid"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'上班时间'">
            <el-input v-model="form.orderId"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'下班时间'">
            <el-input v-model="form.createTime"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="12">
          <el-form-item :label="'正班时长'">
            <el-input v-model="form.name"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item :label="'加班时长'">
            <el-input v-model="form.code"></el-input>
          </el-form-item>
        </el-col>
      </el-row>
   </el-form>
   <div slot="footer" style="text-align:center;padding-top: 15px">
       <el-button type="primary" @click.native="audit">保存</el-button>
     </div>
 </div>
</template>

<script>
import { saleInfo,auditOrder,Dismissed} from "@/api/basic/index";

export default {
  props: {
    listInfo: {
      type: Object,
      default: null
    },
  },
  data() {
    return {
      num1: 1,
      visible: false,
      form: {
        oid: null,
        orderId: null,
        createTime: null,
        name: null, // 客户名称
        code: null, // 客户编号
      },
      loading: false,
      obj:{},
      type: null,
    };
  },
 created() {
 },
 mounted() {
    if (this.listInfo) {
      this.fetchData(this.form.oid);
    }
 },
 methods: {
    audit() {
      let list=this.list,array=[]
      if (list.length > 0) {
        for (const i in list) {
          var jbj = {}
          jbj.gid = list[i].gid
          jbj.oid = this.form.oid
          jbj.actualNum = list[i].actualNum
          array.push(jbj)
        }
        auditOrder(array).then(res => {
          this.$emit('hideDialog', false)
          this.$emit('uploadList')
       });
     } else {
             return this.$message({
                 message: "无退货商品",
                 type: "warning"
             })
         }
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
