<template>
  <div>
    <list
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
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import {getFrameList,delFrame} from '@/api/basic/index'
import List from '@/components/List'

export default {
  components: {
    List
  },
  computed: {
    ...mapGetters(['node'])
  },
  data() {
    return {
      loading: false,
      visible: false,
      list: {},
      fid: null,
      type: null,
      checkDate:null,
      columns: [
        { text: 'rid', name: 'rid' },
        { text: '部门', name: '' },
        { text: '子部门', name: '' },
        { text: '职员', name: '' },
        { text: '上班时间', name: '' },
        { text: '下班时间', name: '' },
        { text: '出勤类型', name: '' },
        { text: '上班时间', name: '' },
        { text: '下班时间', name: '' },
        { text: '出勤类型', name: '' },
      ]
    };
  },
  methods: {
    handlerForm() {},
    // 监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.fetchData();
    },
    // 监听当前页
    handleCurrent(val) {
      this.list.current = val
      this.fetchData()
    },
    dblclick(obj) {
      this.$emit('showDialog', obj)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.checkDate = obj
      this.$emit('showTree', obj)
      this.$store.dispatch('list/setClickData', obj)
    },
    // 删除
    delDate(val) {
      delFrame(val).then(res => {
        if (res.flag) {
          this.$emit('uploadList', val)
        }
      })
    },
    fetchData(fid, type) {
      // this.loading = true;
      const data = {
      /*  fid: fid,
       type: type,*/
        pageNum: this.list.current || 1,
        pageSize: this.list.size || 50
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
