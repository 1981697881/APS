<template>
  <div class="list-main box-shadow">
    <!--<list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      type
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />-->
    <el-table :height="height" :data="list" border size="mini" @cell-dblclick="celldblclick" @cell-click="cellclick"  :cell-style="tableCellStyle" :span-method="objectSpanMethod" >
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        v-if="t.default!=undefined?t.default:true"
        :width="t.width?t.width:(selfAdaption?'':'120px')"
      >
          <el-table-column
            v-if="t.data.length > 0"
            v-for="(a,b) in t.data"
            :prop="a.name"
            :key="b"
            :label="a.text"
            align="center"
            width="120">
        </el-table-column>
      </el-table-column>
    </el-table>
    <div class="text-center pages" v-if="list.total && list.total!=0">
      <el-pagination
        @size-change="handleSize"
        @current-change="handleCurrent"
        :current-page="list.current"
        :page-sizes="[50, 100, 250, 500]"
        :page-size="list.size"
        :page-count="list.pages?list.pages:0"
        layout="total, sizes, prev, pager, next, jumper"
        :total="list.total?list.total:0"
      ></el-pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { getSalaryList } from "@/api/attendance/index"
import List from "@/components/List"
export default {
  components: {
    List
  },
  props: {
    // 是否自定义高度 默认100%
    height: {
      type: String,
      default: '100%'
    },
    //是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      dayLength: 0,
      loading: false,
      list: [],
      columns: []
    };
  },
  created() {
  },
  methods: {
    tableCellStyle(row, rowIndex, column) {
      if (this.row === row.row) {
        let col1 = row.column.property
        let col2 = this.column.property
        if(col1 == col2 && (col1 != undefined && col2 != undefined)){
          return 'background-color:#ccc;'
        }else {
          return 'background-color:#fff;'
        }
      }
    },
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      console.log()
      if(Number(columnIndex) > Number(this.dayLength + 3)){
        return {
          rowspan: 4,
          colspan: 1
        };
      }else{
        if ((columnIndex === 0 || columnIndex === 1)) {
          if (rowIndex % 4 === 0) {
            return {
              rowspan: 4,
              colspan: 1
            };
          } else {
            return {
              rowspan: 0,
              colspan: 0
            };
          }
        }
      }

    },
     RetnWF2(year, month, nowday) {//JS判断的if elseif方法
      let wstr = ""
      const date = new Date(year,month-1,nowday)
      const day = date.getDay()
      if (day==0){wstr='日'}
      else if(day==1){wstr='一'}
      else if(day==2){wstr='二'}
      else if(day==3){wstr='三'}
      else if(day==4){wstr='四'}
      else if(day==5){wstr='五'}
      else if(day==6){wstr='六'}
      return wstr
    },
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData()
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    celldblclick(row, column, cell, event) {
      console.log(column)
      this.$emit('showDialog', [row, column.property.match(/\d+/g)[0]])
    },
    cellclick(row, column, cell, event) {
      this.row = row
      this.column = column
      console.log(column)
      this.$store.dispatch("list/setClickData", [row, column.property.match(/\d+/g)[0]])
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    doHandleMonth(month) {
      var m = month;
      if(month.toString().length == 1) {
        m = "0" + month;
      }
      return m;
    },
    fetchData(val) {
      this.columns = []
      // 初始化列表
      const aData = new Date(val.month.split('-')[0], val.month.split('-')[1], 0)
      console.log(aData)
      const mouthLength = aData.getDate()
      this.dayLength = mouthLength
      this.columns = [
        { text: '', name: '', default: false},
        { text: '工号', name: 'jobNum' },
        { text: '姓名', name: 'name' },
        { text: '日期', name: 'noteDate' },
        { text: '日期', name: '', colspan: true, data: [{text: '星期', name: 'time'}]
        },
      ]
      for (let i = 1; i <= mouthLength; i++) {
        const week = this.RetnWF2(val.month.split('-')[0], val.month.split('-')[1], i)
        const obj = { text: i + '', name: '', colspan: true, data: [{ width: '250px', text: week + '', name: 'day' + i }] }
        this.columns.push(obj)
      }
      this.columns.push(/* { text: '', name: '', default: false},
        { text: '', name: '', default: false},
        { text: '', name: '', default: false},*/
        { text: '总工时', name: 'totalTime' },
        { text: '平时', name: 'normalOverWTime' },
        { text: '双休', name: 'weekendOverWTime' },
        { text: '法定', name: 'statutoryOverWTime' },
        { text: '抵扣年假/H', name: 'annualLeaveDeduction' },
        { text: '本月使用年假/H', name: 'useAnnualLeave' },
        { text: '病假/H', name: 'sickLeave' },
        { text: '事假/H', name: 'personalLeave' },
        { text: '调休/H', name: 'rest' },
        { text: '丧假/H', name: 'bereavementLeave' },
        { text: '产假/H', name: 'maternityLeave' },
        { text: '公假/H', name: 'publicHoliday' },
        { text: '婚假/H', name: 'weddingLeave' },
        { text: '陪产假/H', name: 'paternityLeave' },
        { text: '哺乳假/H', name: 'breastfeedingLeave' },
        { text: '工伤假/H', name: 'workInjuryLeave' },
        { text: '本月新增调休/H', name: 'addRest' },
        { text: '上月剩余调休/H', name: 'remainingRestOfLastMonth' },
        { text: '本月剩余调休/H', name: 'restOfTheMonth' },
        { text: '上月剩余年假/H', name: 'remainingAnnualLeaveLastMonth' },
        { text: '本月剩余年假/H', name: 'annualLeaveRemainingThisMonth' },
        { text: '餐补', name: 'mealSupplement;' },
        { text: '出差补贴', name: 'travelAllowance' },

      )
      this.loading = true
      getSalaryList(val).then(res => {
        this.loading = false
        const data = res.data
        const arr = []
        data.forEach((item, index)=> {
          for(let i = 0;i < 4;i++){
            let obj = {}
            eval("obj.jobNum='" + item.jobNum + "'")
            let nMonth = new Date(item.detail[0].startTime).getMonth()+1
            eval("obj.noteDate='" + (new Date(item.detail[0].startTime).getFullYear()+"-"+this.doHandleMonth(nMonth)) + "'")
            eval("obj.name='" + item.name + "'")
            if(i == 0) {
              eval("obj.time='上班时间'")
            }else if(i == 1){
              eval("obj.time='下班时间'")
            }else if(i == 2){
              eval("obj.time='正班时长'")
            }else{
              eval("obj.time='加班时长'")
            }
            item.detail.forEach((item1, index1)=> {
              if(i == 0) {
                eval("obj.day" + new Date(item1.startTime).getDate() + "='" + (new Date(item1.startTime).getHours() + ':' + new Date(item1.startTime).getMinutes()) + "'")
              }else if(i == 1){
                eval("obj.day" + new Date(item1.startTime).getDate() + "='" + (new Date(item1.endTime).getHours() + ':' + new Date(item1.endTime).getMinutes()) + "'")
              }else if(i == 2){
                eval("obj.day" + new Date(item1.startTime).getDate() + "='" + item1.normalNum + "'")
              }else{
                eval("obj.day" + new Date(item1.startTime).getDate() + "='" + item1.overtimeNum + "'")
              }
            })
            arr.push(obj)
          }
        })
        console.log(arr)
        this.list = arr
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
