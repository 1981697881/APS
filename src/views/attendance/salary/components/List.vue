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
    <el-table :height="height"   :data="list" border size="mini" :highlight-current-row="true" :span-method="objectSpanMethod" >
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
      loading: false,
      list: {},
      columns: []
    };
  },
  created() {
  },
  methods: {
    objectSpanMethod({ row, column, rowIndex, columnIndex }) {
      if (columnIndex === 0 || columnIndex === 1) {
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
    },
     RetnWF2(year, month, nowday) {//JS判断的if elseif方法
      let wstr = ""
      const date = new Date(year,month,nowday)
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
    Delivery(val) {
      delivery(val).then(res => {
        if(res.flag){
          this.$store.dispatch('list/setClickData', '');
          this.fetchData()
        }
      })
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row)
    },
    fetchData(val) {
      this.columns = []
      // 初始化列表
      const aData = new Date(val.month.split('-')[0], val.month.split('-')[1], 0)
      const mouthLength = aData.getDate()
      this.columns = [
        { text: '', name: '', default: false},
        { text: '工号', name: 'jobNum' },
        { text: '姓名', name: 'name' },
        { text: '日期', name: '', colspan: true, data: [{text: '星期', name: 'time'}]
        },
      ]
      for (let i = 1; i <= mouthLength; i++) {
        const week = this.RetnWF2(val.month.split('-')[0], val.month.split('-')[1], i)
        const obj = { text: i + '', name: '', colspan: true, data: [{ width: '250px', text: week + '', name: 'day' + i }] }
        this.columns.push(obj)
      }
      this.columns.push( { text: '', name: '', default: false},
        { text: '', name: '', default: false},
        { text: '', name: '', default: false},
        { text: '总工时', name: '' },
        { text: '平时', name: '' },
        { text: '双休', name: '' },
        { text: '法定', name: '' },
        { text: '抵扣年假/H', name: '' },
        { text: '本月使用年假/H', name: '' },
        { text: '病假/H', name: '' },
        { text: '事假/H', name: '' },
        { text: '调休/H', name: '' },
        { text: '丧假/H', name: '' },
        { text: '产假/H', name: '' },
        { text: '公假/H', name: '' },
        { text: '婚假/H', name: '' },
        { text: '陪产假/H', name: '' },
        { text: '哺乳假/H', name: '' },
        { text: '工伤假/H', name: '' },
        { text: '本月新增调休/H', name: '' },
        { text: '上月剩余调休/H', name: '' },
        { text: '本月剩余调休/H', name: '' },
        { text: '上月剩余年假/H', name: '' },
        { text: '本月剩余年假/H', name: '' },
        { text: '餐补', name: '' },
        { text: '出差补贴', name: '' })
      this.loading = true
      console.log(this.columns)
      getSalaryList(val).then(res => {
        this.loading = false
        const data = res.data
        const arr = []
        data.forEach((item, index)=> {
          for(let i = 0;i < 4;i++){
            let obj = {}
            eval("obj.jobNum='" + item.jobNum + "'")
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
              console.log()
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
