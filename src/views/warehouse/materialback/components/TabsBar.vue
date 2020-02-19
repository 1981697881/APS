<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="24">
      <el-button-group style="float:right">
        <el-button style="float: right" :size="'mini'" type="primary" >批量领用</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >反审核</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >审核</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >删除</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" @click="handleAdd">新增</el-button>
        <el-button style="float: right" :size="'mini'" type="primary" >刷新</el-button>
      </el-button-group>
      </el-row>
      <el-row :gutter="24" style="padding-top: 10px;">
        <el-col :span="3">
          <el-form-item :label="'日期'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'退料单号'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'仓管员'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'供应商'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'审核人'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'审核时间'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
      </el-row>

    </el-form>
  </div>
</template>
<script>
import { mapGetters } from "vuex";
export default {
    components: {},
    computed: {
        ...mapGetters(["node","clickData","selections"])
    },
  data() {
    return {
      search: {
          keyword: null
      }
    };
  },

  methods:{
      Delivery(){
          if (this.clickData.oid) {
              this.$emit('theDelivery',{
                  oid:this.clickData.oid,
              })
          } else {
              this.$message({
                  message: "无选中行",
                  type: "warning"
              });
          }
      },
      //关键字查询
      query(){
          if((typeof this.search.keyword != null) && (this.search.keyword !='')){

          }
      },
      handleAudit(){
        if (this.clickData.oid) {
            this.$emit('showDialog',{
                oid:this.clickData.oid,
                orderId:this.clickData.orderId,
                createTime:this.clickData.createTime
            })
        } else {
            this.$message({
                message: "无选中行",
                type: "warning"
            });
        }

    },
    handleAdd() {
      this.$emit('showDialog')
    },
  }
};
</script>

<style>
</style>
