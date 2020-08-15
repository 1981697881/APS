<template>
  <div>
    <list
       class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      @dblclick="dblclick"
       @row-click="rowClick"
    />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
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
      columns: []
    };
  },
  methods: {

    uploadPr(val) {
      this.fetchData(val.columns, val.array)
    },
    dblclick(obj) {
      // this.$emit('showDialog',obj.row)
    },
    // 监听单击某一行
    rowClick(obj) {
      this.$store.dispatch('list/setClickData', obj.row);
    },

    fetchData(val) {
      this.loading = true
      this.columns = val.columns
      this.list = { records: val.array }
      this.loading = false
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh /3);
}
</style>
