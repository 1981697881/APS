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
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleSync">U9同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="notarize">确认</el-button>
        </el-button-group>
      </el-row>
    </el-form>
    <el-dialog
      :visible.sync="visible"
      title="确认信息"
      v-if="visible"
      :width="'50%'"
      destroy-on-close
    >
        <el-form :model="form" ref="form" label-width="60px" :size="'mini'">
          <el-row :gutter="20">
            <el-col :span="12">
              <el-form-item :label="'单号'" >
                <el-input v-model="form.docNo"></el-input>
              </el-form-item>
            </el-col>
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
import { salesListSync } from "@/api/aftermarket/index"
export default {
  components: {},
  computed: {
    ...mapGetters(['node','clickData','selections'])
  },
  data() {
    return {
      visible: null,
      form: {
        docNo: null,
        businessDateStart: null,
        businessDateEnd: null,
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
        keyword: null
      }
    }
  },
  methods: {
    changeDate(val) {
      this.form.businessDateEnd = val[1]
      this.form.businessDateStart = val[0]
    },
    notarize() {
      if (this.clickData.soId) {
        this.$emit('showDialog', this.clickData)
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
      this.search.keyword != null || this.search.keyword != undefined ? obj.docNo = this.search.keyword : null
      return obj
    },
    // 关键字查询
    query(){
      if((typeof this.search.keyword != null) && (this.search.keyword !='')) {
        this.$emit('uploadList', this.qFilter())
      }
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
    },
    handleSync() {
      this.visible = true
    },
  }
};
</script>

<style>
</style>
