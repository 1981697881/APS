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
    <el-table :height="height"   :data="list.records" border size="mini" :highlight-current-row="true" >
      <el-table-column prop="date" label="序号" type="index" sortable></el-table-column>
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
            v-if="t.colspan!=undefined?t.colspan:false"
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
import { mapGetters } from "vuex";
import { salesList ,delivery} from "@/api/basic/index";
import List from "@/components/List";

export default {
  components: {
    List
  },
  props: {
    // 是否自定义高度 默认100%
    height: {
      type: String,
      default: "100%"
    },
    //是否自适应宽度，不自适应宽度默认为120px
    selfAdaption: {
      type: Boolean,
      default: false
    },
  },
  computed: {
    ...mapGetters(["node"])
  },
  data() {
    return {
      loading: false,
      list: [],
      columns: null
    };
  },
  created() {
    // 初始化列表
    let aData = new Date()
    let mouthLength = (new Date(aData.getFullYear(),(aData.getMonth() + 1),0)).getDate()
    this.columns =[
      { text: '', name: '',default: false},
      { text: '姓名', name: '' },
      { text: '工号', name: '' },
      { text: '子部门', name: '' },

    ]
    for (let i = 1; i <= mouthLength; i++) {
        let obj = { text: i, name: i }
        this.columns.push(obj)
    }
    this.columns.push( { text: '总工时', name: '' },
      { text: '加班/小时', name: '', colspan: true, data: [{
          text: '平时', name: '',
        },{
          text: '双休', name: '',
        },{
          text: '国定', name: '',
        }]
      },
      { text: '年假/H', name: '' },
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
      { text: '剩余年假/H', name: '' },
      { text: '备注', name: '' })

  },
  methods: {
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
    Delivery(val){
      delivery(val).then(res => {
        if(res.flag){
          this.$store.dispatch("list/setClickData", '');
          this.fetchData();
        }
      })
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row)
    },
    fetchData(fid, type) {
      this.loading = true
      const data = {
      /*  fid: fid,
        type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      };
      salesList(data).then(res => {
        this.loading = false
        this.list = res.data
      })
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
