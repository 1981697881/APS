<template>
  <div class="list-header">
    <el-form  :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="7">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              class="input-class"
              unlink-panels
              range-separator="至"
              value-format="yyyy-MM-dd"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'关键字'">
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
          <el-row :gutter="20" >
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
              <el-form-item :label="'客户名称'" >
                <el-input v-model="form.customerName"></el-input>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item :label="'客户编码'" >
                <el-input v-model="form.customeCode"></el-input>
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
import { mapGetters } from 'vuex'
import { salesListSync, exportSales, notarizeList} from "@/api/aftermarket/index"
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      visible: null,
      form: {
        docNo: '',
        customeCode: '',
        customerName: '',
        itemCode: '',
        itemName: '',
        orgCode: '',
        businessDateStart: '',
        businessDateEnd: '',
        value: [],
      },
      value: '',
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
        keyword: null
      }
    }
  },
  methods: {
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
      exportSales(this.qFilter()).then(res => {
        this.download(res)
      })
    },
    changeDate(val) {
      this.form.businessDateEnd = val[1]
      this.form.businessDateStart = val[0]
    },
    notarize() {
      if (this.clickData.soId) {
        notarizeList({soId: this.clickData.soId}).then(res => {
          if(res.flag) {
            this.upload()
          }
        })
        /*this.$emit('showDialog', this.clickData)*/
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
      this.search.keyword != null && this.search.keyword != '' ? obj.docNo = this.search.keyword : null
      this.value[1] != null && this.value[1] != undefined ? obj.businessDateEnd = this.value[1] : null
      this.value[0] != null && this.value[0] != undefined ? obj.businessDateStart = this.value[0] : null
      return obj
    },
    // 关键字查询
    query() {
      this.$emit('uploadList', this.qFilter())
    },
    confirm(form) {
      this.$refs[form].validate((valid) => {
        // 判断必填项
        if (valid) {
          if(this.form.value.length > 0) {
            delete this.form.value
            salesListSync(this.form).then(res => {
              this.visible = false
              this.upload()
            })
          }else{
            this.$message({
              message: "请选择时间",
              type: "warning"
            });
          }
        } else {
          return false
        }
      })
    },
    upload() {
      this.$emit('uploadList')
      this.search.keyword = ''
      this.value = ''
    },
    handleSync() {
      this.visible = true
    },
  }
};
</script>

<style>
</style>
