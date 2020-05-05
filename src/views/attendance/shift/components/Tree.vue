<template>
  <div>
    <el-table class="list-main" :data="list" border size="mini" :highlight-current-row="true" @row-dblclick="dblclick"  @row-click="rowClick">
      <el-table-column
        v-for="(t,i) in columns"
        :key="i"
        align="center"
        :prop="t.name"
        :label="t.text"
        v-if="t.default!=undefined?t.default:true"
        :width="t.width?t.width:''"
      ></el-table-column>
    </el-table>
  </div>
</template>
<script>
    import { mapGetters } from "vuex";
    import {getShiftList} from "@/api/attendance/index";
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
                visible: false,
                list: {},
                fid: null,
                type: null,
                checkDate:null,
                columns: [
                    { text: "班次代码", name: "oow_id" },
                    { text: "班次名称", name: "oow_name" },
                ]
            };
        },
        methods: {
            dblclick(obj) {
                this.$emit('showDialog',obj)
            },
            //监听单击某一行
            rowClick(obj) {
                this.checkDate=obj;
                this.$emit('showTree',obj)
                this.$store.dispatch("list/setClickData", obj);
            },
            //删除
            delDate(val) {
                delFrame(val).then(res => {
                    if(res.flag){
                        this.$emit('uploadList',obj)
                    }
                });

            },
            fetchData(fid, type) {
                this.loading = true;
              getShiftList().then(res => {
                this.loading = false
                this.list = {records: res.data }
              });
            }
        }
    };
</script>
