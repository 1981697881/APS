<template>
  <div>
    <list
      class="list-main box-shadow"
      :columns="columns"
      :loading="loading"
      :list="list"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex"
import { productBoard } from "@/api/production/index"
import List from "@/components/List"

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
        { text: "", name: "",default:false },
        { text: "设备", name: "" },
        { text: '旧料号', name: '' },
        { text: "数量", name: "" },
        { text: "状态", name: "" },
      ]
    };
  },
  methods: {
    fetchData(val) {
      this.loading = true
      this.list = val
      this.loading = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh/3);
}
</style>
