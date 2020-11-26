<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'">
      <el-row :gutter="10">
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
          <el-form-item :label="'单号'">
            <el-input v-model="search.shipNo" placeholder="单号" />
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" placeholder="旧料号" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click.native="upload">刷新</el-button>
        </el-button-group>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
import {getMType} from "@/api/basic/index";
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
        oldCode: null,
        shipNo: null,
      }
    };
  },
  mounted() {

  },
  methods: {
    // 关键字查询
    query() {
      this.$emit('queryBtn', this.qFilter())
    },
    upload() {
      this.search.oldCode = ''
      this.search.shipNo = ''
      this.value = []
      this.$emit('uploadList')
    },
    // 查询条件过滤
    qFilter() {
      let obj = {}
      this.search.oldCode != null && this.search.oldCode != '' ? obj.oldCode = this.search.oldCode : null
      this.search.shipNo != null && this.search.shipNo != '' ? obj.shipNo = this.search.shipNo : null
      this.value != null && this.value != undefined ? obj.endDate = this.value[1] : null
      this.value != null && this.value != undefined ? obj.startDate = this.value[0] : null
      return obj
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
