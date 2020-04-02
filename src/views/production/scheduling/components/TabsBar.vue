<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'40px'" >
      <el-row :gutter="24">
        <el-button-group style="float:right;padding-right: 15px;">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleDialog">插入</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-tickets" @click="report">汇报</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" >打印</el-button>
        </el-button-group>
      </el-row>
      <el-row :gutter="24"  style="padding-top: 15px;">
        <el-col :span="7" style="display: inline-block">
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
        <el-col :span="3">
          <el-form-item :label="'色号'">
            <el-input v-model="search.oldCode" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'项目名称'" :label-width="'70px'">
            <el-input v-model="search.soName" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'单号'">
            <el-input v-model="search.taskNum" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'生产状态'" :label-width="'70px'">
            <el-input v-model="search.allocatedStatus" placeholder="输入关键字"/>
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
import { mapGetters } from "vuex";
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
      search: {
        allocatedStatus: null,
        oldCode: null,
        taskNum: null,
        soName: null,
      }
    };
  },

  methods:{
    delivery() {
      if (this.clickData.taskId) {
        this.$emit('theDelivery',{
          taskId: this.clickData.taskId,
        })
      } else {
        this.$message({
          message: "无选中行",
          type: "warning"
        });
      }
    },
    upload() {
      this.$emit('uploadList')
      this.search.allocatedStatus = null
      this.search.oldCode = null
      this.search.soName = null
      this.search.taskNum = null
      this.value = []
    },
    report() {
      if (this.clickData.taskId) {
        this.$emit('reportInfo', this.clickData)
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
      this.search.allocatedStatus == null && this.search.allocatedStatus == '' ? obj.allocatedStatus = this.search.allocatedStatus : null
      this.search.oldCode == null && this.search.oldCode == '' ? obj.oldCode = this.search.oldCode : null
      this.search.soName == null && this.search.soName == '' ? obj.soName = this.search.soName : null
      this.search.taskNum == null && this.search.taskNum == '' ? obj.taskNum = this.search.taskNum : null
      this.value[1] != null && this.value[1] != undefined ? obj.productionDateEnd = this.value[1] : null
      this.value[0] != null && this.value[0] != undefined ? obj.productionDateStart = this.value[0] : null
      return obj
    },
    //关键字查询
    query() {
      if((typeof this.search.keyword != null) && (this.search.keyword !='')) {
        this.$emit('uploadList')
      }
    },
    handleDialog(){
      this.$emit('showDialog')
    }
  }
};
</script>

