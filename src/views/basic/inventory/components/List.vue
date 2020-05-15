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
import { mapGetters } from 'vuex';
import { getInventory } from '@/api/basic/index';
import List from '@/components/List';

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
      list: {},
      columns: [
        { text: 'invId', name: 'invId', default: false },
        { text: '旧料号', name: 'oldCode' },
        { text: '编码', name: 'goodCode' },
        { text: '名称', name: 'goodName' },
        { text: '批号', name: 'lotNo' },
        { text: '类别', name: '' },
        { text: '规格', name: 'spec' },
        { text: '安全数量', name: '' },
        { text: '计量单位', name: '' },
        { text: '即时库存', name: 'evenNum' },
        { text: 'U9库存', name: 'num' },
      /*  { text: '仓库', name: 'whName' },
        { text: '仓位', name: 'positionName' },*/
        { text: '合格状态', name: 'status' },
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
      this.$emit('showDialog', obj.row)
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
    },
    fetchData(val, data = {
      pageNum: this.list.current || 1,
      pageSize: this.list.size || 50
    }) {
      this.loading = true;
      getInventory(data, val).then(res => {
        this.loading = false
        this.list = res.data
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh - 300px);
}
</style>
