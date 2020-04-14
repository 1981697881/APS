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
import { salesList ,delivery} from "@/api/indent/sales";
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
        { text: "设备", name: "" },
        { text: '旧料号', name: '' },
        { text: "数量", name: "" },
        { text: "状态", name: "" },
      ]
    };
  },
  methods: {
    fetchData(fid, type) {
     // this.loading = true;
      const data = {
      /*  fid: fid,
        type: type,*/
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 50
      };
       /* salesList(data).then(res => {
        this.loading = false;
        this.list = res.data;
      });*/
    }
  }
};
</script>

<style lang="scss" scoped>
.list-main {
  height: calc(100vh/3);
}
</style>
