<template>
  <div>
    <el-card class="box-card box-card-component">
      <div slot="header" class="clearfix" style="text-align: center">
        <span>美瓷胶包装线色系统计表</span>
      </div>
      <list
        class="list-main box-shadow"
        :columns="columns"
        :loading="loading"
        :list="list"
        across
        acrosstitle="美瓷胶包装线色系统计表"
        selfAdaption
        @handle-size="handleSize"
        @handle-current="handleCurrent"
        @dblclick="dblclick"
        @row-click="rowClick"
      />
    </el-card>
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
          { text: "oid", name: "oid",default:false },
          { text: "项目", name: "" },
        ]
      };
    },
    methods: {
      //监听每页显示几条
      handleSize(val) {
        this.list.size = val
        this.fetchData(this.node.data.fid,this.node.data.type);
      },
      //监听当前页
      handleCurrent(val) {
        this.list.current = val;
        this.fetchData(this.node.data.fid,this.node.data.type);
      },
      dblclick(obj) {
        this.$emit('showDialog',obj.row)
      },
      Delivery(val){
        delivery(val).then(res => {
          this.$emit('uploadList')
        });
      },
      //监听单击某一行
      rowClick(obj) {
        this.$store.dispatch("list/setClickData", obj.row);
      },
      fetchData(fid, type) {
        //this.loading = true;
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
    height: calc((100vh - 250px)/3);
  }
</style>
<style lang="scss" >
  .box-card-component{
    .el-card__header {
      padding-top: 10px;
      padding-bottom: 10px;
    }
    .el-card__body{
      padding: 0px!important;
    }
  }
</style>
