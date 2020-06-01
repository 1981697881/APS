<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'70px'">
      <el-row :gutter="10">
        <el-col :span="3">
          <el-form-item :label="'U9料号'">
            <el-input v-model="search.goodCode" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" />
          </el-form-item>
        </el-col>
        <el-col :span="7" style="display: inline-block">
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
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="del">删除</el-button>-->
          <el-button :size="'mini'" type="primary" icon="el-icon-edit" @click="handleAlter">信息维护</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="print">打印</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-error" @click="disable" >禁用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-success" @click="enable" >启用</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort" @click="handleSync" >同步</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh"    @click="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import { PrintFour } from '@/tools/doPrint'
export default {
  components: {},
  computed: {
    ...mapGetters(["node","clickData","selections"])
  },
  data() {
    return {
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
  mounted(){

  },
  methods: {
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.goodCode != null && this.search.goodCode != '' ? obj.goodCode = this.search.goodCode : null
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      this.value[1] != null && this.value[1] != undefined ? obj.syncTimeEnd = this.value[1] : null
      this.value[0] != null && this.value[0] != undefined ? obj.syncTimeStart = this.value[0] : null
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
</style>
