<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'订单单号'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-right: 10px">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="handleSync">U9同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-check" @click="notarize">确认</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
        </el-button-group>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="确认信息"
      v-if="visible"
      v-dialogDrag
      :width="'50%'"
      destroy-on-close
    >
      <el-form :model="form" ref="form" label-width="120px" :size="'mini'">
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'单号'" >
              <el-input v-model="form.docNo"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'组织编码'" >
              <el-input v-model="form.orgCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'物料名'" >
              <el-input v-model="form.itemName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'物料编码'" >
              <el-input v-model="form.itemCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="12">
            <el-form-item :label="'供应商名称'" >
              <el-input v-model="form.supplierName"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="12">
            <el-form-item :label="'供应商编码'" >
              <el-input v-model="form.supplierCode"></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row :gutter="20">
          <el-col :span="24" >
            <el-form-item :label="'日期'" >
              <el-date-picker
                v-model="form.value"
                type="daterange"
                align="right"
                unlink-panels
                range-separator="至"
                value-format="yyyy-MM-dd"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                @change="changeDate"
                :picker-options="pickerOptions">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" style="text-align:center;padding-top: 15px">
        <el-button type="primary" @click.native="confirm('form')">确认</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {syncShipInfo, exportRecipients} from "@/api/warehouse/index";
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
      visible: null,
      form: {
        docNo: '',
        supplierCode: '',
        supplierName: '',
        itemCode: '',
        itemName: '',
        orgCode: '',
        businessDateStart: '',
        businessDateEnd: '',
        value: [],
      },
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
      search: {
        keyword: null,
        type:null
      }
    };
  },
  mounted() {

  },
  methods: {
    changeDate(val) {
      this.form.businessDateEnd = val[1]
      this.form.businessDateStart = val[0]
    },
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
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
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
      this.value = ''
    },
    notarize() {
      if (this.clickData.soId) {
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
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.keyword != null && this.search.keyword != '' ? obj.color = this.search.keyword : null
      return obj
    },
    exportData() {
       exportRecipients(this.qFilter()).then(res => {
         this.download(res)
       })
    },
    confirm(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
      /*    if(this.form.value.length > 0) {*/
            delete this.form.value
            syncShipInfo(this.form).then(res => {
              this.visible = false
              this.upload()
            })
         /* }else{
            this.$message({
              message: "请选择时间",
              type: "warning"
            });
          }*/
        } else {
          return false
        }
      })
    },
    handleSync() {
      this.visible = true
    },
    handleAlter() {
      if (this.clickData.gid) {
        this.$emit('showDialog',{
          gid: this.clickData.gid,
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
