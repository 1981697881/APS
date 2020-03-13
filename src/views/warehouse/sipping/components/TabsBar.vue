<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="24" style="padding-top: 10px;">
        <el-col :span="9">
          <el-form-item :label="'日期'">
            <el-date-picker
              v-model="value"
              type="datetimerange"
              :picker-options="pickerOptions"
              range-separator="至"
              value-format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              align="right">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="3">
          <el-form-item :label="'单据号码'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col> <el-col :span="3">
          <el-form-item :label="'未发完订单'">
            <el-checkbox v-model="checked"></el-checkbox>
          </el-form-item>
        </el-col>

        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
        <el-button-group style="float:right">
          <el-button style="float: right" :size="'mini'" type="primary" @click="handleAdd">确定出库</el-button>
          <el-button style="float: right" :size="'mini'" type="primary" >刷新</el-button>
        </el-button-group>
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
      },
      value: null,
      checked: false
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
