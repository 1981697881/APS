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
       /* { text: '批号', name: 'lotNo' },*/
        { text: '规格', name: 'spec' },
        { text: '安全数量', name: 'safetyStockQty' },
        { text: '计量单位', name: 'inventoryUomGroup' },
        { text: '即时库存', name: 'evenNum' },
        { text: 'U9库存', name: 'num' },
        { text: '差异数', name: 'diffNum' },
      /*  { text: '仓库', name: 'whName' },
        { text: '仓位', name: 'positionName' },*/
        { text: '合格状态', name: 'eligibility' },
        { text: '最近同步时间', name: 'syncTime', width: '150px' },
      ]
    };
  },
  methods: {
    //监听每页显示几条
    handleSize(val) {
      this.list.size = val
      this.$emit('uploadList');
    },
    //监听当前页
    handleCurrent(val) {
      this.list.current = val;
      this.$emit('uploadList');
    },
    dblclick(obj) {
      this.$emit('showDialog', obj.row)
    },
    //监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
    },
    uploadPr(val) {
      this.fetchData(val,{
        pageNum: 1,
        pageSize: this.list.size || 50
      })
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
  height: calc(100vh - 250px);
}
</style>
