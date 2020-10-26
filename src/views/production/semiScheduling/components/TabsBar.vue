<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'60px'" >
      <el-row :gutter="24">
        <el-button-group style="float:right;">
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleDialog">插入</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort" @click="handleMove">挪单</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-up" @click="handleSplit">拆单</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-sort-down" @click="handleSpell">拼单</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-refresh" @click="upload">刷新</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-circle-close" @click="over">结束</el-button>
           <el-button :size="'mini'" type="primary" icon="el-icon-delete" @click="delivery">删除</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-tickets" @click="report">汇报</el-button>
          <el-upload
            name="order"
            :on-success="uploadSuccess"
            :on-error="uploadError"
            accept="xlsx,xls"
            ref="upload"
            :headers="headers"
            :show-file-list="false"
            action="web/excel/import/semiTaskScheduling"
            class="upload-demo"
            multiple
            :auto-upload="false"
            :on-change="handleUpload"
            :limit="3"
          >
            <el-button size="mini" type="primary" icon="el-icon-upload2" >导入</el-button>
            <el-button style="margin-left: 10px;display: none" size="mini" type="success" @click="submitUpload">上传到服务器</el-button>
          </el-upload>
          <el-button :size="'mini'" type="primary" icon="el-icon-download" @click="exportData">导出</el-button>
          <el-button :size="'mini'" type="primary" icon="el-icon-printer" @click="confirmPrint">打印</el-button>
        </el-button-group>
      </el-row>
      <el-row :gutter="24" style="padding-top: 15px;">
        <el-col :span="6">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="daterange"
              align="right"
              style="width: auto"
              value-format="yyyy-MM-dd"
              unlink-panels
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <el-form-item :label="'生产设备'" :label-width="'70px'">
            <el-select v-model="search.plId" class="width-full" placeholder="生产设备" @change="selectLine">
              <el-option :label="t.plName" :value="t.plId" v-for="(t,i) in rArray"  :key="i"></el-option>
            </el-select>
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
        <el-col :span="4">
          <el-form-item :label="'旧料号'">
            <el-input v-model="search.oldCode" placeholder="输入关键字"/>
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
  import { mapGetters } from 'vuex'
  import { PrintSemi } from '@/tools/doPrint'
  import { schedulingStop, exportSemiSchedulin } from '@/api/production/index'
  import { addOperationLog } from '@/api/system/index'
  import { getSemiFinishedProducts} from '@/api/basic/index'
  import {getToken} from '@/utils/auth'
  export default {
    components: {},
    computed: {
      ...mapGetters(['node','clickData','selections'])
    },
    data() {
      return {
        value: [],
        headers: {
          'authorization': getToken('apsrx'),
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
        rArray: [],
        search: {
          plId: null,
          oldCode: null,
          allocatedStatus: '计划中',
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
      fetchLine(val) {
        this.search.plId = null
        getSemiFinishedProducts(val).then(res => {
          if(res.flag) {
            this.rArray = res.data
          }
        })
      },
      selectLine(val) {
        this.$emit('uploadList')
      },
      selectChange(val) {
        this.$emit('uploadList')
      },
      submitUpload() {
        this.$refs.upload.submit()
      },
      uploadError(res) {
        this.$message({
          message: res.msg,
          type: 'warning'
        });
        this.$emit('uploadList')
      },
      uploadSuccess(res) {
        if(res.flag){
          this.$message({
            message: res.msg,
            type: 'success'
          });
          this.$emit('uploadList')
        }else{
          this.$message({
            message: res.msg,
            type: 'warning'
          });
        }
      },
      handleUpload(file, fileList){
        if(file.status=='ready'){
          this.submitUpload()
        }

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
        this.$emit('exportData')
        let qFilter = this.qFilter()
        addOperationLog({message: '导出主业半成品生产计划,导出条件日期:'+qFilter.productionDateStart+'-'+ qFilter.productionDateEnd +'设备:'+qFilter.plId+'生产状态:'+qFilter.allocatedStatus+'旧料号:'+qFilter.oldCode}).then(res => {
        })
      },
      report() {
        const clickData = this.clickData
        if(clickData.length > 0) {
          const listBlank = clickData[0]
          const listInfo = {}
          for(const i in listBlank) {
            if(i.match(/\d+/g) != null) {
              if(i.match(/\d+/g)[0] == clickData[1]) {
                eval("listInfo." + i.replace(/\d+/g,'') + "='" + listBlank[i] + '')
              }
            }
          }
          listInfo.isF = 1
          if (listInfo.allocatedStatus == '生产完毕') {
            listInfo.isOver = 1
          } else {
            listInfo.isOver = 0
          }
          this.$emit('reportInfo', listInfo)
        } else {
          this.$message({
            message: '当前选中无数据！',
            type: 'warning'
          });
        }
      },
      handleMove() {
        const clickData = this.clickData
        if(clickData.length > 0) {
          const listBlank = clickData[0]
          const listInfo = {}
          for(const i in listBlank) {
            if(i.match(/\d+/g) != null) {
              if(i.match(/\d+/g)[0] == clickData[1]) {
                eval("listInfo." + i.replace(/\d+/g,'') + "='" + listBlank[i] + "'")
              }
            }
          }
          console.log(listInfo)
          this.$emit('handleMove', listInfo)
        } else {
          this.$message({
            message: '当前选中无数据！',
            type: 'warning'
          });
        }
      },
      handleSplit() {
        if (this.selections.length == 1) {
          this.$emit('handleSplit', this.selections[0])
        } else {
          this.$message({
            message: '无选中行或选中数量大于1',
            type: 'warning'
          });
        }
      },
      handleSpell() {
        if (this.selections.length > 0) {
          this.$emit('handleSpell', this.selections)
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
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
        var weeks = new Array('星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六');
        var week = weeks[getDay]
        return {
          day: tDate,
          week: week,
          date: tYear + '-' + tMonth + '-' + tDate
        }
      },
      doHandleMonth(month) {
        var m = month;
        if(month.toString().length == 1) {
          m = '0' + month;
        }
        return m;
      },
      confirmPrint() {
        if (this.selections.length > 0) {
          PrintSemi(this.selections)
          LODOP.PREVIEW()
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          });
        }
      },
      // 查询条件过滤
      qFilter() {
        let obj = {}
        this.search.oldCode != null && this.search.oldCode != undefined ? obj.oldCode = this.search.oldCode : null
        this.search.plId != null && this.search.plId != undefined ? obj.plId = this.search.plId : null
        this.search.allocatedStatus != null && this.search.allocatedStatus != undefined ? obj.allocatedStatus = this.search.allocatedStatus : null
        this.value != null && this.value != undefined ? obj.productionDateEnd = this.value[1] : null
        this.value != null && this.value != undefined ? obj.productionDateStart = this.value[0] : null
        return obj
      },
      // 关键字查询
      query() {
        this.$emit('uploadList')
      },
      delivery() {
        const clickData = this.clickData
        if(clickData.length > 0) {
          const listBlank = clickData[0]
          const listInfo = {}
          for(const i in listBlank) {
            if(i.match(/\d+/g) != null) {
              if(i.match(/\d+/g)[0] == clickData[1]) {
                eval("listInfo." + i.replace(/\d+/g,'') + "='" + listBlank[i] + "'")
              }
            }
          }
          listInfo.isF = 1
          console.log(listInfo)
          this.$confirm('是否删除(' + listInfo.productionDate + '/' + listBlank.plName + '/' + listInfo.oldCode + ')，删除后将无法恢复?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            this.$emit('theDelivery',{
              taskId: listInfo.taskId,
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            });
          });
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          });
        }
      },
      over() {
        const clickData = this.clickData
        if(clickData.length > 0) {
          const listBlank = clickData[0]
          const listInfo = {}
          for(const i in listBlank) {
            if(i.match(/\d+/g) != null) {
              if(i.match(/\d+/g)[0] == clickData[1]) {
                eval("listInfo." + i.replace(/\d+/g,'') + "='" + listBlank[i] + "'")
              }
            }
          }
          listInfo.isF = 1
          this.$confirm('是否结束(' + listInfo.productionDate + '/' + listBlank.plName + '/' + listInfo.oldCode + ')，结束后将完成生产?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            schedulingStop(listInfo.taskId, {interfaceType: '主业半成品线计划' }).then(res => {
              if (res.flag) {
                this.$emit('uploadList')
              }
            })
          }).catch(() => {
            this.$message({
              type: 'info',
              message: '已取消结束'
            });
          });
        } else {
          this.$message({
            message: '无选中行',
            type: 'warning'
          });
        }
      },
      upload() {
        this.search.oldCode = null
        this.search.plId = null
        this.search.allocatedStatus = '计划中'
        this.$emit('uploadList')
      },
      handleDialog(){
        this.$emit('showDialog')
      }
    }
  };
</script>

<style>
  .upload-demo{
    float: right;
  }
</style>
