<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'40px'" >
      <el-row :gutter="24">
        <el-button-group style="float:right;padding-right: 15px;">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleDialog">插入</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-circle-close" @click="over">结束</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-tickets" @click="report">汇报</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="confirmPrint" >打印</el-button>
          <!--<el-popover
            placement="bottom"
            width="200"
            :size="'mini'"
            v-model="visible">
            <p>请选择需要打印的内容</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="primary" @click="confirmPrint">打印单据</el-button>
              <el-button type="success" size="mini" @click="visible = false">打印标签</el-button>
            </div>
            <el-button :size="'mini'" type="primary" icon="el-icon-printer" slot="reference"  >打印</el-button>
          </el-popover>-->
        </el-button-group>
      </el-row>
      <el-row :gutter="24"  style="padding-top: 15px;">
        <el-col :span="6" style="display: inline-block">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              style="width: auto"
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
          <el-form-item :label="'色号'">
            <el-input v-model="search.oldCode" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'项目名称'" :label-width="'70px'">
            <el-input v-model="search.soName" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'排产单号'" :label-width="'70px'">
            <el-input v-model="search.taskNum" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'生产状态'" :label-width="'70px'">
            <el-select v-model="search.allocatedStatus" placeholder="请选择" @change="selectChange">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex"
import { schedulingStop } from "@/api/production/index";
import { PrintSchedule } from '@/tools/doPrint'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
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
      options: [{
        value: '计划中',
        label: '计划中'
      }, {
        value: '已暂停',
        label: '已暂停'
      }, {
        value: '已结束',
        label: '已结束'
      }, {
        value: '已完工',
        label: '已完工'
      }],
      visible: false,
      search: {
        allocatedStatus: '计划中',
        oldCode: null,
        taskNum: null,
        soName: null,
      }
    };
  },

  methods: {
    selectChange(val) {
      this.$emit('uploadList')
    },
    delivery() {
      if (this.selections[0].taskId) {
        this.$confirm('是否删除(' + this.selections[0].productionDate + '/' + this.selections[0].plName + '/' + this.selections[0].color + ')，删除后将无法恢复?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit('theDelivery',{
            taskId: this.selections[0].taskId,
          })
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
        });
      }
    },
    confirmPrint() {
      if (this.selections.length > 0) {
        PrintSchedule(this.selections)
        LODOP.PREVIEW()
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    over() {
      if (this.selections[0].taskId) {
        this.$confirm('是否结束(' + this.selections[0].productionDate + '/' + this.selections[0].plName + '/' + this.selections[0].color + ')，结束后将完成生产?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          schedulingStop(this.selections[0].taskId).then(res => {
            if (res.flag) {
              this.$emit('uploadList')
            }
          })
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
        });
      }
    },
    upload() {
      this.search.allocatedStatus = null
      this.search.oldCode = null
      this.search.soName = null
      this.search.taskNum = null
      this.value = []
      this.$emit('uploadList')
    },
    report() {
      if (this.selections[0].taskId) {
        if (this.selections[0].allocatedStatus == '生产完毕') {
          this.selections[0].isF = 0
          this.selections[0].isOver = 1
          this.$emit('reportInfo', this.selections[0])
        } else {
          this.selections[0].isF = 0
          this.selections[0].isOver = 0
          this.$emit('reportInfo', this.selections[0])
        }
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
      this.search.allocatedStatus != null && this.search.allocatedStatus != '' ? obj.allocatedStatus = this.search.allocatedStatus : null
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      this.search.soName != null && this.search.soName != '' ? obj.soName = this.search.soName : null
      this.search.taskNum != null && this.search.taskNum != '' ? obj.taskNum = this.search.taskNum : null
      this.value != null && this.value != undefined ? obj.productionDateEnd = this.value[1] : null
      this.value != null && this.value != undefined ? obj.productionDateStart = this.value[0] : null
      return obj
    },
    // 关键字查询
    query() {
      this.$emit('uploadList')
    },
    handleDialog() {
      this.$emit('showDialog')
    }
  }
};
</script>

