<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'"  style="padding-top: 15px;">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
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
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" placeholder="输入关键字"/>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right;padding-right: 15px;">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleDialog">插入</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="report">汇报</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >打印</el-button>
        </el-button-group>
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
          keyword: null
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
    //关键字查询
    query(){
      if((typeof this.search.keyword != null) && (this.search.keyword !='')){
      }
    },
    handleDialog(){
      this.$emit('showDialog')
    }
  }
};
</script>

<style>
</style>
