<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'50px'">
      <el-row :gutter="12">
        <el-col :span="4">
          <el-form-item :label="'部门'">
            <el-select v-model="deptIds" class="width-full"  placeholder="请选择部门">
              <el-option :label="t.deptName" :value="t.deptId" v-for="(t,i) in pArray" :key="i"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'月份'">
            <el-date-picker
              style="width: auto"
              v-model="value"
              type="month"
              value-format="yyyy-MM"
              placeholder="选择月">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;">
          <el-upload
            name="order"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            accept="xlsx,xls"
            ref="upload"
            :headers="headers"
            :show-file-list="false"
            action="web/excel/import/punchRecord"
            class="upload-demo"
            multiple
            :auto-upload="false"
            :on-change="handleUpload"
            :limit="1"
          >
            <el-button size="mini" type="primary" icon="el-icon-upload2" >导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { getFrameList } from "@/api/basic/index";
import {getToken} from '@/utils/auth'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      headers: {
        'authorization': getToken('apsrx'),
      },
      isUpload: null,
      pArray: [],
      value: null,
      deptIds: null,
      search: {
        keyword: null
      }
    };
  },
  created: function() {
    this.value = (new Date().getFullYear() + '-' + this.doHandleMonth((new Date().getMonth() + 1))) // 当前日期
  },
  mounted() {
    this.fetchFormat();
  },
  methods: {
    submitUpload() {
      this.$refs.upload.submit()
    },
    uploadError(res) {
      this.$message({
        message: '上传失败',
        type: "warning"
      });
      this.$emit('uploadList')
    },
    uploadSuccess(res) {
      if(res.flag){
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.$emit('uploadList')
      }else{
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    handleUpload(file, fileList){
      if(file.status=="ready"){
        this.submitUpload()
      }
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.deptIds != null && this.deptIds != undefined ? obj.deptIds = this.deptIds : null
      this.value != null && this.value != undefined ? obj.month = this.value : null
      return obj
    },
    // 关键字查询
    query() {
     /* this.deptIds = null
      this.value = (new Date().getFullYear() + '-' + (new Date().getMonth() + 1)) // 当前日期 // 当前日期*/
      this.$emit('uploadList', this.qFilter())
    },
    fetchFormat() {
      const data = {
        pageNum: 1,
        pageSize: 1000
      };
      getFrameList(data).then(res => {
        this.pArray = res.data.records
      });
    },
    handleAudit(){
      if (this.clickData.oid) {
        this.$emit('showDialog',{
          oid:this.clickData.oid,
          orderId:this.clickData.orderId,
          createTime:this.clickData.createTime
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
