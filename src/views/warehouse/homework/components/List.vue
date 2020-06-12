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
import { delMaterial,getMaterialList} from '@/api/basic/index'
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
        { text: '收货日期', name: '' },
        { text: '计划批次', name: '' },
        { text: '计划完成批次', name: '' },
        { text: '末到货批次', name: '' },
        { text: '其它日期到货批次', name: '' },
        { text: '到货重量（kg)', name: '' },
        { text: '累积完成批次', name: '' },
        { text: '即时率', name: '' },
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
    fetchData(fid, type) {
      this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      };
        getMaterialList(data).then(res => {
        this.loading = false;
        this.list = res.data;
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
