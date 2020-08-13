<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { putBoardReport} from '@/api/warehouse/index'
import List from '@/components/List'

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
      list: {},
      columns: [
        { text: '', name: '',default:false },
        { text: '收货日期', name: 'putDate' },
        { text: '计划批次', name: 'planBatch' },
        { text: '计划完成批次', name: 'planFinishBatch' },
        { text: '末到货批次', name: 'goodsAfloatBatch' },
        { text: '其它日期到货批次', name: 'otherDateFinishBatch' },
        { text: '到货重量（kg)', name: 'putWeight' },
        { text: '累积完成批次', name: 'accumulateFinishBatch' },
        { text: '即时率', name: 'instantRate' },
      ]
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
      //this.$emit('showDialog',obj.row)
    },
      //监听单击某一行
      rowClick(obj) {
          this.$store.dispatch("list/setClickData", obj.row);
      },
    uploadPr(val) {
      this.fetchData(val)
    },
    fetchData(val) {
      this.loading = true;
      putBoardReport(val).then(res => {
        this.loading = false;
        this.list = {records: res.data};
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
