<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
       show-summary
      @handle-size="handleSize"
      @handle-current="handleCurrent"
      @dblclick="dblclick"
       @row-click="rowClick"
    />

  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getStorageBinList} from '@/api/warehouse/index'
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
        { text: '', name: '',default: false },
        { text: '区域位置', name: 'grandpaPiCode' },
        { text: '库位号', name: 'positionCode' },
        { text: 'U9料号', name: 'goodCode' },
        { text: '物料名称', name: 'goodName' },
        { text: '旧料号', name: 'oldCode' },
        { text: '批号', name: 'lotNo', default: true },
        { text: '规格', name: 'spec' },
        { text: '数量', name: 'evenNum' },
        { text: '合格状态', name: 'status' },
        { text: '备注', name: 'remark', default: true },
        { text: '入库日期', name: 'createTime', default: true },
      ]
    };
  },
  methods: {
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList')
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList')
    },
    dblclick(obj) {
      // this.$emit('showDialog',obj.row)
    },
    onUploadHead(val){
      for(let i in this.columns) {
        if(this.columns[i].name == 'lotNo' || this.columns[i].name == 'createTime'|| this.columns[i].name == 'remark') {
          if(val){
            this.columns[i].default = false
          } else {
            this.columns[i].default = true
          }
        }
      }
    },
    uploadPr(val) {
      this.fetchData(val, {
        pageNum: 1,
        pageSize: this.list.size || 50
      })
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getStorageBinList(data, val).then(res => {
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
