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
  import { mapGetters } from "vuex";
  import { getSchedulingList } from "@/api/production/index";
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
                    { text: "订单单号", name: "" },
                    { text: "客户名称", name: "" },
                    { text: "金额", name: "" },
                    { text: "下单时间", name: "" },
                    { text: "审核状态", name: "" },
                    { text: "发货状态", name: "" },
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
    height: calc((100vh - 330px));
  }
</style>
