<template>
  <div class="list-header">
    <el-form v-model="search" :size="'mini'" :label-width="'80px'">
      <el-row :gutter="10">
        <el-col :span="6">
          <el-form-item :label="'关键字'">
            <el-input v-model="search.keyword" />
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-button :size="'mini'" type="primary" icon="el-icon-search" @click="query">查询</el-button>
        </el-col>
       <!-- <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="handleAdd">新增</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus">修改</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" @click="Delivery">删除</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus">审核</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >反审核</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >禁用</el-button>
        </el-col>
        <el-col :span="2" >
          <el-button :size="'mini'" type="primary" icon="el-icon-plus" >启用</el-button>
        </el-col>-->
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
              this.$emit('delList',{
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
      handleAdd(){
          this.$emit('showDialog')

    },
  }
};
</script>

<style>
</style>
