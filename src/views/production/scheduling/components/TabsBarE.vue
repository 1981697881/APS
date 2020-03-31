<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'" style="padding-top: 15px;">
      <el-row :gutter="24">
        <el-col :span="8">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
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
          <!--<el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="report">汇报</el-button>-->
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
                value: [],
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
      created: function() {
        this.value[0] = this.getDay('', 0).date
        this.value[1] = this.getDay('', 2).date
      },
      mounted: function() {
        this.$emit('firstLoad', this.value)
      },
        methods: {
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
          getODate() {
            return this.value
          },
          // 查询前后三天日期
          getDay(date, day){
            var today = new Date();
            var targetday_milliseconds=today.getTime() + 1000*60*60*24*day
            today.setTime(targetday_milliseconds) //注意，这行是关键代码
            var tYear = today.getFullYear()
            var tMonth = today.getMonth()
            var tDate = today.getDate()
            var getDay = today.getDay()
            tMonth = this.doHandleMonth(tMonth + 1)
            tDate = this.doHandleMonth(tDate)
            var weeks = new Array("星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六");
            var week = weeks[getDay]
            return {
              day: tDate,
              week: week,
              date: tYear + "-" + tMonth + "-" + tDate
            }
          },
          doHandleMonth(month) {
            var m = month;
            if(month.toString().length == 1) {
              m = "0" + month;
            }
            return m;
          },
          // 查询条件过滤
          qFilter() {
            let obj = {}
            this.search.keyword != null || this.search.keyword != undefined ? obj.query = this.search.keyword : null
            this.value[1] != null || this.value[1] != undefined ? obj.productionDateEnd = this.value[1] : null
            this.value[0] != null || this.value[0] != undefined ? obj.productionDateStart = this.value[0] : null
            return obj
          },
            // 关键字查询
          query() {
            if((typeof this.search.keyword != null) && (this.search.keyword !='')){
              this.$emit('uploadList')
            }
          },
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
          handleDialog(){
            this.$emit('showDialog')
          }
        }
    };
</script>

<style>
</style>
