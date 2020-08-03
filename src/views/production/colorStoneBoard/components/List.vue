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
import { mapGetters } from "vuex";
import { salesList ,delivery} from "@/api/basic/index";
import List from "@/components/List";

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
        { text: "设备", name: "plName" },
        { text: '旧料号', name: 'color' },
        { text: "数量", name: "productionQuantity" },
        { text: "状态", name: "allocatedStatus" },
      ]
    };
  },
  methods: {
    fetchData(data) {
    this.list = { records: data }
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh/3);
}
</style>
