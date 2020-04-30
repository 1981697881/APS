<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-upload" @click="handlerUpload">上传</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handlerAdd">仓库编辑</el-button>
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
      <el-form :model="form2" :rules="rules" ref="form2">
        <el-row :gutter="20" type="flex" justify="center">
          <el-col :span="12">
            <el-form-item :label="'仓库'" prop="tpId">
              <el-select v-model="form.tpId" class="width-full" placeholder="仓库" @change="selectChange">
                <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in pArray" :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'区域'" prop="plId">
              <el-select v-model="form.plId" class="width-full" placeholder="区域" :disabled="disPl">
                <el-option :label="t.positionName" :value="t.piId" v-for="(t,i) in rArray"  :key="i"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center">
        <el-upload
          style="float: left"
          name="order"
          :on-success="uploadSuccess"
          :on-error="uploadError"
          accept="xlsx,xls"
          ref="upload"
          :data="fileData"
          :headers="headers"
          :show-file-list="false"
          action="excel/import/position"
          class="upload-demo"
          multiple
          :auto-upload="false"
          :on-change="handleUpload"
          :limit="3"
        >
          <el-button size="mini" type="primary" >点击上传</el-button>
          <el-button style="margin-left: 10px;display: none" size="mini" type="success"  @click="submitUpload">上传到服务器</el-button>
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
      options: [{
        value: '选项1',
        label: '黄金糕'
      }, {
        value: '选项2',
        label: '双皮奶'
      }, {
        value: '选项3',
        label: '蚵仔煎'
      }, {
        value: '选项4',
        label: '龙须面'
      }, {
        value: '选项5',
        label: '北京烤鸭'
      }],
      value: '',
      isUpload: null,
      pArray: [],
      rArray: [],
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
    this.fetchFormat(-1)
  },
  methods: {
    // 切换类别
    selectChange(val) {
      this.disPl = false
      this.form.plId = null
      this.rArray = []
      this.fetchLine(val)
    },
    handleUpload(file, fileList){
      if(file.status=="ready"){
        this.isUpload = true
        this.visible = true
      }
    },
    handlerUpload() {
      this.visible = true
    },
    submitUpload() {
      this.$refs.upload.submit()
      this.visible = false
    },
    uploadError(res) {
      this.$message({
        message: res.msg,
        type: "warning"
      });
      this.visible = false
      this.$emit('uploadList')
    },
    uploadSuccess(res) {
      if(res.flag){
        this.$message({
          message: res.msg,
          type: "success"
        });
        this.visible = false
        this.$emit('uploadList')
      }else{
        this.$message({
          message: res.msg,
          type: "warning"
        });
      }
    },
    // 关键字查询
    query(){
        this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null || this.search.keyword != undefined ? obj.keyword = this.search.keyword : null
      return obj
    },
    handlerAdd() {
      this.$emit("showDialog")
    },
    // 下载文件
    download(res) {
      if (!res.data) {
        return
      }
      let url = window.URL.createObjectURL(new Blob([res.data]))
      let link = document.createElement('a')
      link.style.display = 'none'
      link.href = url
      link.setAttribute('download', res.headers['content-disposition'].split('filename=')[1])
      document.body.appendChild(link)
      link.click()
    },
    exportData() {
      /*exportAdjust(this.qFilter()).then(res => {
        this.download(res)
      })*/
      this.$message({
        message: "抱歉，功能尚未完善！",
        type: "warning"
      });
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
