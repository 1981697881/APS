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
import { logisticsEfficiencyReport } from '@/api/warehouse/index'
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
        { text: '', name: '', default: false },
        { text: '项目', name: '' },
        { text: '3.1', name: '' },
        { text: '3.2', name: '' },
        { text: '3.3', name: '' },
        { text: '3.4', name: '' },
        { text: '3.5', name: '' },
        { text: '3.6', name: '' },
        { text: '3.7', name: '' },
      ]
    };
  },
  methods: {
    dblclick(obj) {
      // this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch("list/setClickData", obj.row);
    },
    fetchData( val ) {
      this.loading = true;
      logisticsEfficiencyReport(val).then(res => {
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
