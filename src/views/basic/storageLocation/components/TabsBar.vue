<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="4">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" placeholder="库位编码"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'仓库'" prop="plaIdS">
            <el-select v-model="parent"  placeholder="请选择" @change="selectWorn">
              <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in plaArray" :key="i">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handlerAdd">新增</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAlter">修改</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="Delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-upload" @click="handlerUpload">上传</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerDetail">仓库编辑</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="上传"
      v-if="visible"
      :width="'30%'"
      destroy-on-close
      append-to-body
    >
      <el-form :model="form" :rules="rules" ref="form">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'仓库'" prop="type">
              <el-select v-model="form.type" class="width-full" placeholder="仓库" @change="selectChange">
                <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in pArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'区域'" prop="prId">
              <el-select v-model="form.prId" class="width-full" placeholder="区域" :disabled="disPl">
                <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in rArray"  :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-upload
          name="position"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          accept="xlsx,xls"
          ref="upload"
          :data="fileData"
          :headers="headers"
          :show-file-list="false"
          action="excel/import/position"
          class="upload-demo"
          :auto-upload="false"
          :on-change="handleUpload"
          :limit="1"
        >
          <el-button slot="trigger" type="primary" >选择文件</el-button>
          <el-button style="margin-left: 10px;" type="success"  @click="submitUpload" v-loading.fullscreen.lock="fullscreenLoading">上传文件</el-button>
        </el-upload>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import { PrintStorage } from '@/tools/doPrint'
import {getWarehouseList} from "@/api/basic/index";
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
      form: {
        prId: null,
        type: null
      },
      rules: {
        type: [
          {required: true, message: '请选择仓库', trigger: 'change'},
        ],
        prId: [
          {required: true, message: '请选择区域', trigger: 'change'},
        ],
      },
      fullscreenLoading: false,
      isUpload: null,
      pArray: [],
      rArray: [],
      parent: null,
      plaArray: [],
      disPl: true,
      visible: null,
      fileData: {
        prId: null,
        type: null,
      },
      search: {
        keyword: null
      }
    };
  },
  mounted() {
    this.fetchWare(-1)
  },
  methods: {
    // 切换类别
    selectChange(val) {
      this.disPl = false
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)
    },
    // 切换仓库
    selectWorn(val) {
      this.$emit('queryBtn', this.qFilter())
    },
    handleUpload(file, fileList) {
      if (file.status=="ready") {
        this.isUpload = true
        this.visible = true
      }
    },
    handlerUpload() {
      this.fetchFormat(-1)
      this.form = {
        prId: null,
        type: null
      }
      this.visible = true
    },
    submitUpload() {
      this.fileData.type = 3
      this.fileData.prId = this.form.prId
      if(this.isUpload){
        this.fullscreenLoading = true
        this.$refs.upload.submit()
      } else {
        this.$message({
          message: '请选择文件',
          type: "warning"
        });
      }

    },
    uploadError(res) {
      this.$message({
        message: '导入失败',
        type: "warning"
      });
      this.fullscreenLoading = false
      this.visible = false
      this.$emit('uploadList')
    },
    uploadSuccess(res) {
      if(res.flag) {
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.visible = false
        this.fullscreenLoading = false
        this.$emit('uploadList')
      } else {
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
      this.parent = null
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null && this.search.keyword != '' ? obj.piCode = this.search.keyword : null
      this.parent != null && this.parent != undefined ? obj.parent = this.parent : null
      return obj
    },
    handlerDetail() {
      this.$emit("showDialog")
    },
    handlerAdd() {
      this.$emit("showInfo")
    },
    print() {
      if (this.selections.length>0) {
        PrintStorage(this.selections)
        LODOP.PREVIEW()
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    handlerAlter() {
      if (this.clickData.piId) {
        this.$emit('showInfo', this.clickData)
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    Delivery() {
      if (this.clickData.piId) {
        this.$confirm('是否删除(' + this.clickData.piCode + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('delList', this.clickData.piId)
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        })
      }
    },
    fetchWare(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.plaArray = res.data
        }
      })
    },
    fetchFormat(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.pArray = res.data
        }
      })
    },
    fetchLine(val) {
      getWarehouseList(val).then(res => {
        if(res.flag) {
          this.rArray = res.data
        }
      })
    },
  }
};
</script>

<style>
</style>
