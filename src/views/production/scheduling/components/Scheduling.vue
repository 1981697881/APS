<template>
  <div>
    <!-- <list
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
    <el-table :data="list" border :height="'250px'" stripe size="mini" :highlight-current-row="true">
      <el-table-column prop="date" label="序号" align="center" type="index" sortable></el-table-column>
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        :prop="t.name"
        align="center"
        :label="t.text"
        :width="t.width?t.width:'120px'"
        v-if="t.default!=undefined?t.default:true"
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
  </div>
</template>
<script>
  import {mapGetters} from "vuex";
  import {getSemiList} from "@/api/production/index";
  import List from "@/components/List";

  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    data() {
      return {
        loading: false,
        list: [],
        columns: []
      };
    },
    methods: {
      //监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.fetchData();
      },
      //监听当前页
      handleCurrent(val) {
        this.list.current = val;
        this.fetchData();
      },
      dblclick(obj) {
        this.$emit('showDialog', obj.row)
      },
      Delivery(val) {
        delivery(val).then(res => {
          this.$emit('uploadList')
        });
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      datedifference(sDate1, sDate2) {    //sDate1和sDate2是2006-12-18格式
        var dateSpan,
          tempDate,
          iDays;
        sDate1 = Date.parse(sDate1);
        sDate2 = Date.parse(sDate2);
        dateSpan = sDate2 - sDate1;
        dateSpan = Math.abs(dateSpan);
        iDays = Math.floor(dateSpan / (24 * 3600 * 1000));
        return iDays
      },
      fetchData(val) {
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
        };
        getSemiList(data, val).then(res => {
          if (res.flag) {
            const data = res.data
            this.columns = [
              {text: '', name: 'gid', default: false},
              {text: '计划日期', name: '', colspan: true, data: [{text: '生产设备', name: 'plName'}]}
            ]
            var array
            const columns = this.columns
            var count = 0
            var onArr = {};
            for (const i in data) {
              count++
              columns.push({text: i + '', name: i + '', colspan: true, data: [{text: '旧料号', name: 'color' + count}, {text: '数量', name: 'allocatedNum' + count},{text: '生产状态', name: 'allocatedStatus' + count},{text: '任务警示', name: '' + count}]})
              data[i][0].time = i
              array = data[i]
              var obj = {}
              array.forEach((item1, index) => {
                if(i == item1.time){
                  eval("obj.color" + count + "='" + item1.color + "'")
                  eval("obj.allocatedNum" + count + "='" + item1.allocatedNum + "'")
                  eval("obj.allocatedStatus" + count + "='" + item1.allocatedStatus + "'")
                  eval("obj.plName ='" + item1.plName + "'")
                }
              })
              Object.assign(onArr, obj);
              console.log(onArr)
            }
            console.log(this.columns)
            this.loading = false
            this.list = new Array(onArr)
          }
        });
      }
    }
  };
</script>

<style lang="scss" scoped>
  .list-main {
    height: calc((100vh - 330px));
  }
</style>
