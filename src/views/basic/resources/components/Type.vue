<template>
  <div>
    <list
      style="height: calc(100vh - 160px);"
      class="list-main"
      :columns="columns"
      :loading="loading"
      :list="list"
      index
      selfAdaption
      @row-click="rowClick"
    />
  </div>
</template>

<script>
  import {mapGetters} from "vuex";
  import {getResourcesList} from "@/api/basic/index";
  import List from "@/components/List";
  export default {
    components: {
      List
    },
    computed: {
      ...mapGetters(["node"])
    },
    props: {
      //是否自适应宽度，不自适应宽度默认为120px
      selfAdaption: {
        type: Boolean,
        default: true
      },
    },
    data() {
      return {
        loading: false,
        columns: [
          {text: "tpId", name: "tpId", default:false},
          {text: "资源类别", name: "tpName"},
          {text: "category", name: "category", default:false},
        ],
        list: {},
      }
    },
    created() {

    },
    mounted() {

    },
    methods: {
      //监听单击某一行
      rowClick(obj) {
        this.$emit('queryList', obj.row.tpId)
        this.$store.dispatch("list/setClickData", obj.row)
      },
      fetchData() {
        this.loading = true;
        const data = {
          pageNum: this.list.current || 1,
          pageSize: this.list.size || 1000
        };
        getResourcesList(data).then(res => {
          this.loading = false
          delete res.data.total
          this.list = res.data
          console.log(res)
        });
      }
    }
  };
</script>

