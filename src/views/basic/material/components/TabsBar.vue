<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'70px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'U9料号'">
            <el-input v-model="search.goodCode" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" />
          </el-form-item>
        </el-col>
        <el-col :span="6" style="display: inline-block">
          <el-form-item :label="'日期'">
            <el-date-picker
              style="width: auto"
              v-model="value"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-search" @click="handleAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="del">删除</el-button
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handleAlter">信息维护</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >禁用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >启用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort" @click="handleSync" >同步</el-button>-->
          <el-button v-for="(t,i) in btnList" :key="i" v-if="t.category == 'default'" :size="'mini'" type="primary" :icon="t.cuicon" @click="onFun(t.path)">{{t.menuName}}</el-button>
          <el-upload
            name="order"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            v-for="(t,i) in btnList" :key="i"
            v-if="t.category == 'import'"
            accept="xlsx,xls"
            ref="upload"
            :headers="headers"
            :show-file-list="false"
            action="web/excel/import/goodsMMStock"
            class="upload-demo"
            multiple
            :auto-upload="false"
            :on-change="handleUpload"
            :limit="3"
          >
            <el-button size="mini" type="primary" icon="el-icon-upload2" >导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { getByUserAndPrId } from '@/api/system/index'
import {getToken} from '@/utils/auth'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      isUpload: null,
      headers: {
        'authorization': getToken('apsrx'),
      },
      btnList: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
            picker.$emit('pick', [start, end]);
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date();
            const start = new Date();
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
            picker.$emit('pick', [start, end]);
          }
        }]
      },
      options: [{
        value: '选项1',
        label: '成品'
      }, {
        value: '选项2',
        label: '半成品'
      }],
      value: '',
      search: {
        oldCode: null,
        goodCode: null
      }
    };
  },
  mounted() {
    let path = this.$route.meta.id
    getByUserAndPrId(path).then(res => {
      this.btnList = res.data
      this.$forceUpdate();
    });
  },
  methods: {
    onFun(method){
      this[method]()
    },
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
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.goodCode != null && this.search.goodCode != '' ? obj.goodCode = this.search.goodCode : null
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      this.value != null && this.value != undefined ? obj.syncTimeEnd = this.value[1] : null
      this.value != null && this.value != undefined ? obj.syncTimeStart = this.value[0] : null
      return obj
    },
    del() {
      if (this.clickData.gid) {
        this.$emit('delList',{
          gid:this.clickData.gid,
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    upload() {
      this.search.goodCode = null
      this.search.oldCode = null
      this.value = []
      this.$emit("uploadList")
    },
    handleAlter() {
      if (this.clickData.gid) {
        this.$emit('showDialog', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    handleSync() {
      this.$emit('syncDialog')
    },
    handleAdd(){
      this.$emit('showDialog')

    },
    disable() {
      if (this.clickData.gid) {
        this.$message({
          message: "抱歉，功能尚未完善！",
          type: "warning"
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    enable() {
      if (this.clickData.gid) {
        this.$message({
          message: "抱歉，功能尚未完善！",
          type: "warning"
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    print() {
      if (this.clickData.gid) {
        this.$emit('printDialog', this.clickData)
       /* PrintFour(this.selections)
        LODOP.PREVIEW()*/
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
  .upload-demo{
    float: right;
  }
</style>
