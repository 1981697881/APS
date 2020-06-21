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
        { text: '销售部门', name: '' },
        { text: '业务员', name: '' },
        { text: '客户名称', name: '' },
        { text: '项目名称', name: '' },
          { text: '订单日期', name: '' },
          { text: '预计出货日期', name: '' },
          { text: '厂务预计出货日期', name: '' },
          { text: '产品名称', name: '' },
          { text: '色 号', name: '' },
          { text: '订单数量', name: '' },
          { text: '产品最终价', name: '' },
          { text: '价税合计', name: '' },
          { text: '料品状态', name: '' },
          { text: '料号', name: '' },
          { text: '订单号', name: '' },
          { text: '已出货数量', name: '' },
          { text: '已运输', name: '' },
          { text: '待运输数量', name: '' },
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
      /*this.loading = true;
      const data = {
      /!*  fid: fid,
        type: type,*!/
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      };
        getMaterialList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });*/
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 250px);
}
</style>
